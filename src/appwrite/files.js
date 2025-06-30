import { Account, Client, ID, Permission, Role, Storage } from "appwrite";

class FileService {
  client = new Client();
  bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;
  storage;
  account;
  
  constructor() {
    this.client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error:", error);
    }
    return null;
  }

  async uploadFile(file, userId) {
    try {
      const fileUpload = await this.storage.createFile(
        this.bucketId,
        ID.unique(),
        file,
        [
          Permission.read(Role.user(userId)),
          Permission.write(Role.user(userId))
        ]
      )
      // console.log('Uploaded:', fileUpload);
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error:", error);
    }
  }

  async getFiles(userId) {
    const allFiles = await this.storage.listFiles(this.bucketId);
    return allFiles.files.filter(file => file.$permissions.includes(`read("user:${userId}")`));
  }
}

const fileService = new FileService();

export default fileService;