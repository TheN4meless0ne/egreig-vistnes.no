"""Search API routes."""

from __future__ import annotations

from flask import Blueprint, jsonify, request

from search_service import search_items

search_blueprint = Blueprint("search", __name__)


@search_blueprint.get("/api/search")
def search() -> tuple[object, int]:
    query = request.args.get("q", "")
    limit = request.args.get("limit", default=6, type=int) or 6
    limit = max(1, min(limit, 20))

    items = search_items(query=query, limit=limit)
    return jsonify({"items": items, "query": query}), 200
