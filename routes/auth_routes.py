from flask import Blueprint, request, jsonify
from utils.db import users_collection
import bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    first_name = (
        data.get("firstName", "")
        .strip()
    )

    last_name = (
        data.get("lastName", "")
        .strip()
    )

    email = (
        data.get("email", "")
        .strip()
        .lower()
    )

    password = data.get(
        "password",
        ""
    )

    # Required fields validation

    if (
        not first_name or
        not last_name or
        not email or
        not password
    ):
        return jsonify({
            "message":
                "All fields are required"
        }), 400

    # Password validation

    if len(password) < 8:
        return jsonify({
            "message":
                "Password must be at least 8 characters long"
        }), 400

    # Email validation

    if "@" not in email:
        return jsonify({
            "message":
                "Invalid email address"
        }), 400

    existing_user = (
        users_collection.find_one(
            {
                "email": email
            }
        )
    )

    if existing_user:
        return jsonify({
            "message":
                "User already exists"
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    users_collection.insert_one({
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({
        "message":
            "User registered successfully"
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    ):
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    token = create_access_token(
        identity=email
    )

    return jsonify({
        "access_token": token
    })