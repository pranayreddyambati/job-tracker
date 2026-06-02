from flask import Flask, jsonify
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required
from flask_cors import CORS

from config import Config
from routes.auth_routes import auth_bp
from routes.application_routes import application_bp
from utils.db import users_collection

app = Flask(__name__)

CORS(app)

app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

jwt = JWTManager(app)

app.register_blueprint(auth_bp)
app.register_blueprint(application_bp)


@app.route("/profile")
@jwt_required()
def profile():

    current_user = get_jwt_identity()

    user = users_collection.find_one(
        {
            "email": current_user
        }
    )

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "firstName": user.get("firstName"),
        "lastName": user.get("lastName"),
        "email": user.get("email")
    })

if __name__ == "__main__":
    app.run(debug=True)