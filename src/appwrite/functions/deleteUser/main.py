import json
from appwrite.client import Client
from appwrite.services.users import Users
import os

def main(context):
    if context.req.method == "OPTIONS":
        return {
            "statusCode": 200,
            "body": "",
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            }
        }
    try:
        # Get userId from request
        payload = json.loads(context.req.body_raw)
        user_id = payload.get("userId")

        if not user_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing userId"}),
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS"
                }
            }

        # Set up Appwrite Admin Client
        client = Client()
        client.set_endpoint(os.environ['APPWRITE_ENDPOINT']) \
              .set_project(os.environ['APPWRITE_PROJECT_ID']) \
              .set_key(os.environ['APPWRITE_API_KEY'])

        users = Users(client)

        # Delete user
        users.delete(user_id)
        return {
            "statusCode": 200,
            "body": json.dumps({"success": True, "message": f"User {user_id} deleted."}),
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            }
        }
        
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            }
        }