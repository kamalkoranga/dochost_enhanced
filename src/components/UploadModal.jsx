import { X, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import fileService from "../appwrite/files";
import getTotalStorage from "../utils/getTotalStorage";

const UploadModal = ({ isOpen, onClose, setRefreshFiles }) => {
  if (!isOpen) return null;

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fileService.getCurrentUser();
        if (!user) throw new Error("User not authenticated");
        else setUserId(user.$id);
      } catch (err) {
        console.error("User not authenticated");
      }
    };
    fetchUser();
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!userId || files.length === 0) return;

    const currentSize = await fileService.getFilesSize(userId);
    if (currentSize === -1) {
      alert("Failed to get current file size. Please try again.");
      return;
    }

    setUploading(true);

    // get total allocated storage
    const totalStorage = await getTotalStorage(userId);

    try {
      for (let file of files) {
        // console.log(file.size, "+", currentSize, "=", currentSize + file.size);
        if (currentSize + file.size <= totalStorage) {
          await fileService.uploadFile(file, userId);
        } else {
          alert("File size exceeds limit");
          return;
        }
      }
      // after file upload, refresh the file list
      setRefreshFiles(prev => prev + 1);
      onClose();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
      setFiles([]);
    }
  };

  return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="fixed inset-0 bg-opacity-50 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Upload Files</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
          <p className="text-sm text-gray-500">Maximum file size: 100MB</p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileSelect}
          />
        </div>

        {files.length > 0 && (
          <ul className="mt-4 max-h-32 overflow-y-auto text-sm text-gray-700 space-y-1">
            {files.map((file, idx) => (
              <li key={idx}>• {file.name}</li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex gap-3">
          <button 
            onClick={onClose}
            disabled={uploading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;