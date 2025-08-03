import { Star, ChevronRight, MoreVertical, StarOff, Download, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import FileCard from "../components/FileCard";
import getFileIcon from "../utils/fileIcons";
import fileService from "../appwrite/files";
import { useOutletContext } from "react-router-dom";
import { formatFileSize, formatDate } from "../utils/formatData";
import toast from "react-hot-toast";


const Dashboard = () => {
  const { refreshFiles, setRefreshFiles, viewMode } = useOutletContext();
  const [files, setFiles] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, file: null });
  const contextMenuRef = useRef(null);

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

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu({ visible: false, x: 0, y: 0, file: null });
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setContextMenu({ visible: false, x: 0, y: 0, file: null });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleContextMenu = (e, file) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      file: file
    });
  };

  const handleToggleStar = async (file) => {
    // TODO: Implement star/unstar functionality
    // console.log('Toggle star for:', file.name);
    setContextMenu({ visible: false, x: 0, y: 0, file: null });
  };

  const onDelete = async (file) => {
    await fileService.deleteFile(file.$id);
    setRefreshFiles((prev) => prev + 1);
    toast.success("File deleted successfully!");
  };

  const onDownload = async (file) => {
    const downloadLink = await fileService.downloadFile(file.$id);
    window.open(downloadLink, '_blank');
    toast.success("File downloaded successfully!");
  };

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <span>My Files</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">All Files</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Files</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{files.length} items</span>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <FileCard key={file.$id} file={file} onDelete={onDelete} onToggleStar={handleToggleStar} onDownload={onDownload} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Mobile-friendly table wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[200px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 hidden sm:table-cell">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 hidden md:table-cell">Modified</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr 
                    key={file.$id} 
                    className={`select-none border-b border-gray-100 hover:bg-gray-100 hover:shadow transition cursor-pointer ${index === files.length - 1 ? 'border-b-0' : ''}`}
                    onContextMenu={(e) => handleContextMenu(e, file)}
                  >
                    <td className="py-3 px-4 max-w-[200px] sm:max-w-none">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.mimeType)}
                        <div className="min-w-0 flex-1">
                          <span className="font-medium text-gray-900 block truncate">{file.name}</span>
                          {/* Show size and date on mobile under the name */}
                          <div className="sm:hidden text-xs text-gray-500 mt-1">
                            {formatFileSize(file.sizeOriginal)} • {formatDate(file.$createdAt)}
                          </div>
                        </div>
                        {file.starred && <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 hidden sm:table-cell">{formatFileSize(file.sizeOriginal)}</td>
                    <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{formatDate(file.$createdAt)}</td>
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
        </div>
      )}

      {/* Context Menu */}
      {contextMenu.visible && (
        <div 
          ref={contextMenuRef}
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[150px]"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
          }}
        >
          <button
            onClick={() => handleToggleStar(contextMenu.file)}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
          >
            {contextMenu.file?.starred ? (
              <>
                <StarOff className="w-4 h-4" />
                Unstar
              </>
            ) : (
              <>
                <Star className="w-4 h-4" />
                Star
              </>
            )}
          </button>
          <button
            onClick={() => {
              onDownload(contextMenu.file);
              setContextMenu({ visible: false, x: 0, y: 0, file: null });
            }}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={() => {
              onDelete(contextMenu.file);
              setContextMenu({ visible: false, x: 0, y: 0, file: null });
            }}
            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </main>
  );
}

export default Dashboard;