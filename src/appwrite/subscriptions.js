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

  // plan = [free, basic_premium, premium]
  async addSubscription(userId, plan) {
    try {
      const document = await this.getDocumentByUserID(userId);

      const response = await this.database.updateDocument(
        this.databaseId,
        this.collectionId,
        document.$id,
        {
          plan: plan,
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
