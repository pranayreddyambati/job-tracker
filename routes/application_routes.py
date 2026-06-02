from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.db import ( applications_collection, activities_collection )
from bson import ObjectId
from datetime import datetime, timezone
from collections import defaultdict
import csv
import io
from collections import Counter

application_bp = Blueprint("applications", __name__)

@application_bp.route("/applications", methods=["POST"])
@jwt_required()
def create_application():

    current_user = get_jwt_identity()

    data = request.get_json()

    application = {
        "user_email": current_user,
        "company": data.get("company"),
        "role": data.get("role"),
        "status": data.get("status", "Applied"),
        "location": data.get("location"),
        "salary": data.get("salary"),

        "createdAt": datetime.now(timezone.utc),
        "updatedAt": datetime.now(timezone.utc)
    }

    result = applications_collection.insert_one(application)

    activities_collection.insert_one({
        "user_email": current_user,
        "type": "created",
        "company": data.get("company"),
        "message":
            f"Applied to {data.get('company')}",
        "createdAt": datetime.now(timezone.utc)
    })

    return jsonify({
        "message": "Application created",
        "id": str(result.inserted_id)
    }), 201

@application_bp.route("/applications", methods=["GET"])
@jwt_required()
def get_applications():

    current_user = get_jwt_identity()

    applications = []

    cursor = applications_collection.find(
        {
            "user_email": current_user
        }
    ).sort("_id", -1)

    for app in cursor:
        app["_id"] = str(app["_id"])

        if app.get("createdAt"):
            app["createdAt"] = (
                app["createdAt"].isoformat()
            )

        if app.get("updatedAt"):
            app["updatedAt"] = (
                app["updatedAt"].isoformat()
            )

        applications.append(app)

    return jsonify(applications)

@application_bp.route("/applications/<id>", methods=["GET"])
@jwt_required()
def get_application(id):

    current_user = get_jwt_identity()

    application = applications_collection.find_one({
        "_id": ObjectId(id),
        "user_email": current_user
    })

    if not application:
        return jsonify({"message": "Application not found"}), 404
    
    application["_id"] = str(
        application["_id"]
    )

    if application.get("createdAt"):
        application["createdAt"] = (
            application["createdAt"].isoformat()
        )

    if application.get("updatedAt"):
        application["updatedAt"] = (
            application["updatedAt"].isoformat()
        )

    return jsonify(application)

@application_bp.route("/applications/<id>", methods=["PUT"])
@jwt_required()
def update_application(id):

    current_user = get_jwt_identity()

    data = request.get_json()

    data["updatedAt"] = datetime.now(timezone.utc)

    result = applications_collection.update_one(
        {
            "_id": ObjectId(id),
            "user_email": current_user
        },
        {
            "$set": data
        }
    )

    if result.matched_count == 0:
        return jsonify({"message": "Application not found"}), 404

    activities_collection.insert_one({
        "user_email": current_user,
        "type": "updated",
        "company": data.get("company", ""),
        "message": "Application details updated",
        "createdAt": datetime.now(timezone.utc)
    })

    return jsonify({
        "message": "Application updated"
    })

@application_bp.route("/applications/<id>", methods=["DELETE"])
@jwt_required()
def delete_application(id):

    current_user = get_jwt_identity()

    result = applications_collection.delete_one({
        "_id": ObjectId(id),
        "user_email": current_user
    })

    if result.deleted_count == 0:
        return jsonify({"message": "Application not found"}), 404

    return jsonify({
        "message": "Application deleted"
    })

@application_bp.route("/applications/<id>/status", methods=["PATCH"])
@jwt_required()
def update_status(id):

    current_user = get_jwt_identity()
    data = request.get_json()

    if not data or "status" not in data:
        return jsonify({
            "message": "Status is required"
        }), 400

    application = applications_collection.find_one(
        {
            "_id": ObjectId(id),
            "user_email": current_user
        }
    )

    if not application:
        return jsonify({
            "message": "Application not found"
        }), 404

    old_status = application.get("status")

    result = applications_collection.update_one(
        {
            "_id": ObjectId(id),
            "user_email": current_user
        },
        {
            "$set": {
                "status": data["status"],
                "updatedAt": datetime.now(timezone.utc)
            }
        }
    )

    activities_collection.insert_one({
        "user_email": current_user,
        "type": "status_change",
        "company": application["company"],
        "oldStatus": old_status,
        "newStatus": data["status"],
        "message":
            f"{application['company']} moved "
            f"from {old_status} "
            f"to {data['status']}",
        "createdAt": datetime.now(timezone.utc)
    })

    return jsonify({
        "message": "Status updated"
    }), 200


@application_bp.route("/analytics", methods=["GET"])
@jwt_required()
def analytics():

    current_user = get_jwt_identity()

    apps = list(
        applications_collection.find(
            {"user_email": current_user}
        )
    )

    return jsonify({
        "totalApplications": len(apps),
        "applied": len([a for a in apps if a.get("status") == "Applied"]),
        "interview": len([a for a in apps if a.get("status") == "Interview"]),
        "offer": len([a for a in apps if a.get("status") == "Offer"]),
        "accepted": len([a for a in apps if a.get("status") == "Accepted"]),
        "rejected": len([a for a in apps if a.get("status") == "Rejected"])
    })


@application_bp.route("/analytics/trend", methods=["GET"])
@jwt_required()
def application_trend():

    current_user = get_jwt_identity()

    apps = list(
        applications_collection.find(
            {
                "user_email": current_user
            }
        )
    )

    monthly_counts = defaultdict(int)

    for app in apps:

        created_at = app.get("createdAt")

        if not created_at:
            continue

        month = created_at.strftime(
            "%b %Y"
        )

        monthly_counts[month] += 1

    sorted_months = sorted(
        monthly_counts.items(),
        key=lambda x: datetime.strptime(
            x[0],
            "%b %Y"
        )
    )

    trend_data = [
        {
            "month": month,
            "applications": count
        }
        for month, count in sorted_months
    ]

    return jsonify(trend_data), 200

@application_bp.route("/activities", methods=["GET"])
@jwt_required()
def get_activities():

    current_user = get_jwt_identity()

    activities = list(
        activities_collection.find(
            {
                "user_email": current_user
            }
        ).sort(
            "createdAt",
            -1
        )
    )

    for activity in activities:

        activity["_id"] = str(
            activity["_id"]
        )

        if activity.get("createdAt"):
            activity["createdAt"] = (
                activity["createdAt"]
                .replace(tzinfo=timezone.utc)
                .isoformat()
            )

    return jsonify(
        activities
    )

@application_bp.route(
    "/activities",
    methods=["DELETE"]
)
@jwt_required()
def clear_activities():

    current_user = get_jwt_identity()

    activities_collection.delete_many(
        {
            "user_email": current_user
        }
    )

    return jsonify({
        "message":
            "Activities cleared"
    }), 200

@application_bp.route("/applications/export/json", methods=["GET"])
@jwt_required()
def export_json():

    current_user = get_jwt_identity()

    applications = list(
        applications_collection.find(
            {
                "user_email": current_user
            }
        )
    )

    for app in applications:
        app["_id"] = str(app["_id"])

    return jsonify(applications)

@application_bp.route("/applications/export/csv", methods=["GET"])
@jwt_required()
def export_csv():

    current_user = get_jwt_identity()

    applications = list(
        applications_collection.find(
            {
                "user_email": current_user
            }
        )
    )

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "Company",
        "Role",
        "Location",
        "Salary",
        "Status"
    ])

    for app in applications:

        writer.writerow([
            app.get("company"),
            app.get("role"),
            app.get("location"),
            app.get("salary"),
            app.get("status")
        ])

    response = make_response(
        output.getvalue()
    )

    response.headers[
        "Content-Disposition"
    ] = (
        "attachment; "
        "filename=applications.csv"
    )

    response.headers[
        "Content-type"
    ] = "text/csv"

    return response

@application_bp.route(
    "/analytics/companies",
    methods=["GET"]
)
@jwt_required()
def top_companies():

    current_user = get_jwt_identity()

    apps = list(
        applications_collection.find(
            {
                "user_email": current_user
            }
        )
    )

    company_counts = Counter(
        app.get("company")
        for app in apps
        if app.get("company")
    )

    top_companies = [
        {
            "company": company,
            "count": count
        }
        for company, count in company_counts.most_common(5)
    ]

    return jsonify(top_companies)