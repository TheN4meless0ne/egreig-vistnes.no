"""Microsoft Graph client for the SharePoint-backed content library.

Reads files from top-level folders in the `egreig-vistnes` SharePoint
site's default document library (currently "documents" and "resources"),
using an app-only (client credentials) Graph token. No user needs to be
signed in for the public website to read the library — the app
registration itself holds the permission.

Requires AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET to be
set. If they're missing, list_folder() raises SharePointNotConfigured
rather than the whole backend failing to start, since the contact form
and search routes don't depend on this.
"""

from __future__ import annotations

import os
import time
from dataclasses import asdict, dataclass

import msal
import requests

# AZURE_TENANT_ID / AZURE_CLIENT_ID / AZURE_CLIENT_SECRET / SHAREPOINT_SITE_PATH
# are deliberately read lazily (inside _get_app() / _site_path() below), not
# captured as module-level constants here. app.py imports this module (via
# library_routes) before it calls load_dotenv(), so anything read at import
# time would always see an empty environment and silently latch onto None,
# even once the real .env is loaded a few lines later.

# App-facing library key -> top-level folder name in the site's default drive.
LIBRARY_FOLDERS = {
    "documents": "documents",
    "resources": "resources",
}

GRAPH_BASE = "https://graph.microsoft.com/v1.0"
SCOPE = ["https://graph.microsoft.com/.default"]

# Cache the listing itself for a short while, on top of the token cache, so
# a page load doesn't hit Graph on every single request.
_LISTING_TTL_SECONDS = 60

_msal_app: msal.ConfidentialClientApplication | None = None
_token_cache: dict = {"token": None, "expires_at": 0}
_site_id_cache: dict = {"id": None}
_listing_cache: dict[str, tuple[float, list["LibraryItem"]]] = {}


class SharePointNotConfigured(RuntimeError):
    """Raised when the required Azure/Graph environment variables are missing."""


def _site_path() -> str:
    # Path-based site reference: Graph resolves the site ID from this on
    # every call, so we never have to look one up and hardcode it separately.
    return os.getenv(
        "SHAREPOINT_SITE_PATH",
        "eliasgreigvistnes.sharepoint.com:/sites/egreig-vistnes",
    )


def _get_app() -> msal.ConfidentialClientApplication:
    global _msal_app
    if _msal_app is None:
        tenant_id = os.getenv("AZURE_TENANT_ID")
        client_id = os.getenv("AZURE_CLIENT_ID")
        client_secret = os.getenv("AZURE_CLIENT_SECRET")
        if not all([tenant_id, client_id, client_secret]):
            raise SharePointNotConfigured(
                "SharePoint library is not configured (missing AZURE_TENANT_ID / "
                "AZURE_CLIENT_ID / AZURE_CLIENT_SECRET)."
            )
        _msal_app = msal.ConfidentialClientApplication(
            client_id,
            authority=f"https://login.microsoftonline.com/{tenant_id}",
            client_credential=client_secret,
        )
    return _msal_app


def _get_token() -> str:
    now = time.time()
    if _token_cache["token"] and now < _token_cache["expires_at"] - 60:
        return _token_cache["token"]

    result = _get_app().acquire_token_for_client(scopes=SCOPE)
    if "access_token" not in result:
        raise RuntimeError(
            f"Failed to acquire Graph token: {result.get('error_description', result)}"
        )

    _token_cache["token"] = result["access_token"]
    _token_cache["expires_at"] = now + result.get("expires_in", 3600)
    return _token_cache["token"]


def _graph_get(path: str, params: dict | None = None) -> dict:
    token = _get_token()
    resp = requests.get(
        f"{GRAPH_BASE}{path}",
        headers={"Authorization": f"Bearer {token}"},
        params=params,
        timeout=10,
    )
    if not resp.ok:
        # Graph's response body carries the actual error code/message (e.g.
        # "invalid_request", "itemNotFound", "accessDenied") — surface it
        # instead of the bare status code, or every failure just says
        # "400 Bad Request" with nothing to diagnose from.
        raise RuntimeError(f"Graph request failed ({resp.status_code}): {resp.text}")
    return resp.json()


def _get_site_id() -> str:
    # Graph only allows one colon-addressed (path-based) segment per request
    # URL. Chaining "/sites/{host}:/sites/{name}:/drive/root:/{folder}:/..."
    # in a single call fails with "Resource not found for the segment
    # 'root:'." — the site has to be resolved to its real ID first, then
    # that ID used for every subsequent drive call.
    if _site_id_cache["id"]:
        return _site_id_cache["id"]

    data = _graph_get(f"/sites/{_site_path()}")
    _site_id_cache["id"] = data["id"]
    return _site_id_cache["id"]


@dataclass(frozen=True)
class LibraryItem:
    id: str
    name: str
    title: str
    extension: str
    size: int
    created_at: str
    modified_at: str
    download_url: str | None
    web_url: str


def _parse_item(raw: dict) -> LibraryItem | None:
    if "file" not in raw:
        return None  # skip subfolders, if anyone nests one in later

    name = raw["name"]
    stem, dot, ext = name.rpartition(".")
    extension = ext.lower() if dot else ""

    # The "Title" column on the library, set by hand per file in the
    # SharePoint UI. Falls back to the filename (minus extension) so an
    # un-titled upload still shows something sensible.
    fields = (raw.get("listItem") or {}).get("fields") or {}
    title = fields.get("Title") or (stem or name)

    return LibraryItem(
        id=raw["id"],
        name=name,
        title=title,
        extension=extension,
        size=raw.get("size", 0),
        created_at=raw.get("createdDateTime", ""),
        modified_at=raw.get("lastModifiedDateTime", ""),
        # Pre-authenticated, time-limited direct download link. Don't cache
        # this beyond the listing TTL above — it expires.
        download_url=raw.get("@microsoft.graph.downloadUrl"),
        web_url=raw.get("webUrl", ""),
    )


def list_folder(key: str) -> list[LibraryItem]:
    """List the files in one of LIBRARY_FOLDERS, cached briefly."""
    if key not in LIBRARY_FOLDERS:
        raise KeyError(f"Unknown library '{key}'.")

    cached = _listing_cache.get(key)
    if cached and time.time() < cached[0]:
        return cached[1]

    site_id = _get_site_id()
    folder = LIBRARY_FOLDERS[key]
    data = _graph_get(
        f"/sites/{site_id}/drive/root:/{folder}:/children",
        params={"$expand": "listItem($expand=fields)"},
    )

    items = [item for item in (_parse_item(raw) for raw in data.get("value", [])) if item]
    _listing_cache[key] = (time.time() + _LISTING_TTL_SECONDS, items)
    return items


def library_item_to_dict(item: LibraryItem) -> dict:
    return asdict(item)
