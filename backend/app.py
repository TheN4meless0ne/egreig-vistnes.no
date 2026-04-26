import os
import smtplib
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from search_routes import search_blueprint
from email.message import EmailMessage

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

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name    = data.get("name")
    email   = data.get("email")
    message = data.get("message")

    if not all([name, email, message]):
        return jsonify({"error": "All fields are required."}), 400

    try:
        msg = EmailMessage()
        msg["Subject"] = f"New message from {name}"
        msg["From"]    = os.getenv("SMTP_USER")
        msg["To"]      = os.getenv("CONTACT_EMAIL")
        msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(os.getenv("SMTP_USER"), os.getenv("SMTP_PASS"))
            smtp.send_message(msg)

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
