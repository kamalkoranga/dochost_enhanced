import { Account, Client, Databases, ID, Permission, Role } from "appwrite";

class AuthService {
  client = new Client();
  databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
  account;
  database;

  constructor() {
    this.client
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
  }

  async createUserDocument(userId) {
    try {
      const document = await this.database.createDocument(this.databaseId, this.collectionId, ID.unique(), {
        userId,
      }, [
        // only any and guest permission
        Permission.read(Role.any(userId)),
        Permission.write(Role.any(userId))
      ]);
      return document;
    } catch (error) {
      console.log("Appwrite service :: createUserDocument :: error:", error);
      return null;
    }
  }

  async getUserDocument(userId) {
    try {
      const allDocuments = await this.database.listDocuments(this.databaseId, this.collectionId);
      const userDocument = allDocuments.documents.find(doc => doc.userId === userId);
      return userDocument || null;
    } catch (error) {
      console.log("Appwrite service :: getUserDocument :: error:", error);
      return null;
    }
  }


  async createAccount({email, password, name}) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // create a document in the database to store total size of user storage
        const result = await this.createUserDocument(userAccount.$id);
        // console.log(result)

        // call another method like directly login the user
        return this.login({email, password});
      } else {
        throw new Error("Account creation failed");
        // return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error:", error);
      // Handle specific error cases if needed
      if (error.code === 409) {
        throw new Error("Email already in use");
      } else if (error.code === 400) {
        throw new Error("Invalid input data");
      }
      throw new Error("Failed to create account: " + (error.message || "An error occurred"));
    }
  }

  async login({email, password}) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.log("Appwrite service :: login :: error:", error);
      // Handle specific error cases if needed
      if (error.code === 401) {
        throw new Error("Invalid email or password");
      }
      throw new Error("Failed to login: " + (error.message || "An error occurred"));
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code !== 401) {
        console.log("Appwrite service :: getCurrentUser :: error:", error);
      }
      // If user is not authenticated (guests role), return null
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession('current');
    } catch (error) {
      console.log("Appwrite service :: logout :: error:", error);
    }
  }
}

const authService = new AuthService();

export default authService;