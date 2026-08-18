import os
import smtplib
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from search_routes import search_blueprint
from library_routes import library_blueprint
from email.message import EmailMessage
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env'), override=True)

app = Flask(__name__)
limiter = Limiter(get_remote_address, app=app, default_limits=[])
required_env = ["SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"]
missing = [k for k in required_env if not os.getenv(k)]
if missing:
    raise RuntimeError(f"Missing required environment variables: {', '.join(missing)}")

# Load SMTP credentials and contact email from environment variables
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
CONTACT_EMAIL = os.getenv("CONTACT_EMAIL")

# Configure CORS - allow requests from the frontend
# In production, update the origins to your actual domain
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.register_blueprint(search_blueprint)
app.register_blueprint(library_blueprint)

@app.route("/api/contact", methods=["POST"])
@limiter.limit("5 per hour")
def contact():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid request body."}), 400

    name    = data.get("name")
    email   = data.get("email")
    message = data.get("message")
    if not all([name, email, message]):
        return jsonify({"error": "All fields are required."}), 400
    if len(message) > 2000 or len(name) > 200 or len(email) > 254:
        return jsonify({"error": "Input exceeds maximum length."}), 400

    try:
        msg = EmailMessage()
        msg["Subject"] = f"New message from {name}"
        msg["From"]    = SMTP_USER
        msg["To"]      = CONTACT_EMAIL
        msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")

        with smtplib.SMTP("smtp.office365.com", 587) as smtp:
            smtp.starttls()
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.send_message(msg)

        return jsonify({"success": True})

    except Exception as e:
        app.logger.error("Contact email failed: %s", e)
        return jsonify({"error": "Failed to send message. Please try again later."}), 500

@app.route("/api/health")
def health():
    return jsonify({
        "status": "healthy",
        "service": "flask-backend"
    })


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
