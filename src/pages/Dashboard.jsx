import { Star, ChevronRight, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import UploadModal from "../components/UploadModal";
import FileCard from "../components/FileCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import getFileIcon from "../utils/fileIcons";
import fileService from "../appwrite/files";


const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [refreshFiles, setRefreshFiles] = useState(0);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const user = await fileService.getCurrentUser();
        if (!user) throw new Error("User not authenticated");
        const userFiles = await fileService.getFiles(user.$id);
        // Assuming userFiles is an array of file objects
        setFiles(userFiles);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };
    fetchFiles();
  }, [refreshFiles]);
  
  const onDelete = async (file) => {
    await fileService.deleteFile(file.$id);
    setRefreshFiles((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar viewMode={viewMode} setViewMode={setViewMode} setIsModalOpen={setIsModalOpen} />

      <div className="flex">
        <Sidebar activeTab={"files"} />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>My Files</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">All Files</span>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Files</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{files.length} items</span>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {files.map((file) => (
                <FileCard key={file.$id} file={file} onDelete={onDelete} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Modified</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={file.$id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${index === files.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.mimeType)}
                          <span className="font-medium text-gray-900">{file.name}</span>
                          {file.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{file.sizeOriginal}</td>
                      <td className="py-3 px-4 text-gray-600">{file.$createdAt}</td>
                      <td className="py-3 px-4">
                        <button className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setRefreshFiles={setRefreshFiles} />
    </div>
  );
}

export default Dashboard;