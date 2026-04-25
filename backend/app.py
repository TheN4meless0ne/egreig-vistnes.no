import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from search_routes import search_blueprint

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

app.register_blueprint(search_blueprint)


@app.route("/api/health")
def health():
    return jsonify({
        "status": "healthy",
        "service": "flask-backend"
    })


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    debug = os.getenv("FLASK_DEBUG", "true").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
