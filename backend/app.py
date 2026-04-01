"""
Flask Backend API
A simple Flask backend service that can be used with the Next.js frontend.
"""

import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS - allow requests from the frontend
# In production, update the origins to your actual domain
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})


@app.route("/")
def home():
    """Root endpoint - health check"""
    return jsonify({
        "status": "ok",
        "message": "Flask API is running"
    })


@app.route("/api/health")
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "flask-backend"
    })


@app.route("/api/hello")
def hello():
    """Example API endpoint"""
    name = request.args.get("name", "World")
    return jsonify({
        "message": f"Hello, {name}!",
        "source": "Flask Backend"
    })


@app.route("/api/data", methods=["GET", "POST"])
def data():
    """Example data endpoint demonstrating GET and POST"""
    if request.method == "POST":
        # Handle POST request
        data = request.get_json()
        return jsonify({
            "status": "received",
            "data": data
        }), 201
    
    # Handle GET request
    return jsonify({
        "items": [
            {"id": 1, "name": "Item 1", "description": "First item"},
            {"id": 2, "name": "Item 2", "description": "Second item"},
            {"id": 3, "name": "Item 3", "description": "Third item"}
        ]
    })


if __name__ == "__main__":
    # Run in development mode
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_DEBUG", "true").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
