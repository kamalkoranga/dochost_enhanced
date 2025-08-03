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

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(this.bucketId, fileId);
      // console.log('Deleted file:', fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error:", error);
    }
  }

  async downloadFile(fileId) {
    const downloadLink = this.storage.getFileDownload(this.bucketId, fileId);
    return downloadLink;
  }

  async getFilesSize(userId) {
    try {
      const files = await this.getFiles(userId);
      let totalSize = 0;
      for (const file of files) {
        totalSize += file.sizeOriginal; // Assuming 'sizeOriginal' is the property that holds the original file size
      }
      return totalSize;
    } catch (error) {
      console.log("Appwrite service :: getFilesSize :: error:", error);
      return -1; // Return -1 to indicate an error
    }
  }
}

const fileService = new FileService();

export default fileService;