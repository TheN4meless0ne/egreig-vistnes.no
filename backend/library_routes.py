"""Content library API routes — SharePoint-backed documents & resources."""

from __future__ import annotations

from flask import Blueprint, jsonify

from sharepoint_service import (
    LIBRARY_FOLDERS,
    SharePointNotConfigured,
    library_item_to_dict,
    list_folder,
)

library_blueprint = Blueprint("library", __name__)


@library_blueprint.get("/api/library/<key>")
def get_library(key: str):
    if key not in LIBRARY_FOLDERS:
        return jsonify({"error": f"Unknown library '{key}'."}), 404

    try:
        items = list_folder(key)
    except SharePointNotConfigured as e:
        return jsonify({"error": str(e)}), 503
    except Exception as e:  # Graph outage, network failure, bad response, etc.
        return jsonify({"error": "Failed to reach SharePoint.", "detail": str(e)}), 502

    return jsonify({"items": [library_item_to_dict(item) for item in items]}), 200
