import authService from "../appwrite/appwrite";

const getTotalStorage = async (userId) => {
  try {
    const userDocument = await authService.getUserDocument(userId);
    if (userDocument) {
      return userDocument.userBytes || 0; // Return total storage in bytes
    }
  } catch (error) {
    console.error("Error fetching user storage:", error);
  }
}

export default getTotalStorage;