"""Content library API routes — SharePoint-backed documents & resources."""

from __future__ import annotations

import logging

from flask import Blueprint, jsonify

from sharepoint_service import (
    LIBRARY_FOLDERS,
    SharePointNotConfigured,
    library_item_to_dict,
    list_folder,
)

library_blueprint = Blueprint("library", __name__)
logger = logging.getLogger(__name__)


@library_blueprint.get("/api/library/<key>")
def get_library(key: str):
    if key not in LIBRARY_FOLDERS:
        return jsonify({"error": f"Unknown library '{key}'."}), 404

    try:
        items = list_folder(key)
    except SharePointNotConfigured as e:
        return jsonify({"error": "SharePoint integration is not configured."}), 503
    except Exception:  # Graph outage, network failure, bad response, etc.
        logger.exception("Failed to reach SharePoint for library key '%s'.", key)
        return jsonify({"error": "Failed to reach SharePoint."}), 502

    return jsonify({"items": [library_item_to_dict(item) for item in items]}), 200
