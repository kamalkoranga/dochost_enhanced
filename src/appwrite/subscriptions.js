import { Client, Databases, ID } from "appwrite";

class SubscriptionService {
  client = new Client();
  database;
  databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

  constructor() {
    this.client
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }

  async getDocumentByUserID(userId) {
    try {
      const allDocuments = await this.database.listDocuments(
        this.databaseId,
        this.collectionId
      );
      const userDocument = allDocuments.documents.find(
        (doc) => doc.userId === userId
      );
      return userDocument || null;
    } catch (error) {
      console.error("Error fetching document by user ID:", error);
      throw error;
    }
  }

  // get time limit for the user subscription
  async getTimeLimit(userId) {
    const document = await this.getDocumentByUserID(userId);
    return document ? new Date(document.timeLimit) : null;
  }

  // revert to free plan after 1 minute
  async revertToFreePlan(userId) {
    try {
      const document = await this.getDocumentByUserID(userId);
      if (!document) {
        throw new Error("No subscription found for user.");
      }

      // Revert to free plan
      const response = await this.database.updateDocument(
        this.databaseId,
        this.collectionId,
        document.$id,
        {
          plan: "free",
          userBytes: 5 * 1024 * 1024, // Reset to 5MB
          timeLimit: new Date().toISOString(), // Reset time limit
        }
      );
      return response;
    } catch (error) {
      console.error("Error reverting to free plan:", error);
      throw error;
    }
  }

  // plan = [free, basic_premium, premium]
  async addSubscription(userId, plan) {
    try {
      const document = await this.getDocumentByUserID(userId);

      // add 1 minute billing cycle
      const timeLimit = new Date();
      timeLimit.setMinutes(timeLimit.getMinutes() + 1);

      let userBytes = document.userBytes || 0;
      if (plan === "free") {
        userBytes = 5 * 1024 * 1024;
      } else if (plan === "basic_premium") {
        userBytes += 5 * 1024 * 1024; // Add 5MB for Basic Premium Cloud
      } else if (plan === "premium") {
        userBytes += 10 * 1024 * 1024; // Add 10MB for Premium Cloud Plan
      }

      console.log("Current time:", new Date().toISOString());
      console.log("Adding subscription:", {
        userId,
        plan,
        userBytes,
        timeLimit: timeLimit.toISOString(),
      });

      const response = await this.database.updateDocument(
        this.databaseId,
        this.collectionId,
        document.$id,
        {
          plan: plan,
          userBytes: userBytes,
          timeLimit: timeLimit.toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  }
}

const subscriptionService = new SubscriptionService();

export default subscriptionService;
