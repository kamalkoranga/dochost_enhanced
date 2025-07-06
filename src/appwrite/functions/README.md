# Appwrite Functions
# ==================

## 1. User Delete Function
- This function is designed to delete a user account from the Appwrite database. It is triggered by an HTTP request and requires the user ID to be passed in the request body.
- It is implemented in Python and uses the Appwrite SDK to interact with the database.
- It is deployed manually to the Appwrite Functions service.
    - The function code is located in the `deleteUser/main.py` file.
    - To update the function, make changes to the `deleteUser/main.py` file and then run the following command in the terminal:
      ```bash
      tar -czvf deleteUser.tar.gz deleteUser/main.py deleteUser/requirements.txt
      ```
    - Then upload the `deleteUser.tar.gz` file to the Appwrite Functions service.
> It also requires APPWRITE_API_KEY to be set in the environment variables of the function.