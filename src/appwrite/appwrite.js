import { Account, Client, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({email, password, name}) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
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
      console.log("Appwrite service :: getCurrentUser :: error:", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error:", error);
    }
  }
}

const authService = new AuthService();

export default authService;