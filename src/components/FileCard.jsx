import { MoreVertical, Star, Trash2, StarOff, Download } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import getFileIcon from "../utils/fileIcons";
import { formatFileSize, formatDate } from "../utils/formatData";

const FileCard = ({ file, onDelete, onToggleStar, onDownload }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMoreClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    onDelete?.(file);
  };

  const handleToggleStar = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    onToggleStar?.(file);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    // console.log("Downloading file:", file);
    onDownload?.(file);
  };

  return (
    <div 
      key={file.id}
      
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition cursor-pointer group relative"
    >
      <div className="flex items-center justify-between mb-3">
        {getFileIcon(file.mimeType)}
        <div className={`transition relative ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} ref={dropdownRef}>
          <button 
            className="p-1 hover:bg-gray-100 rounded"
            onClick={handleMoreClick}
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[150px]">
              <button
                onClick={handleToggleStar}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              >
                {file.starred ? (
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
                onClick={handleDownload}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 text-sm truncate">{file.name}</h3>
        <p className="text-xs text-gray-500">{formatFileSize(file.sizeOriginal)}</p>
        <p className="text-xs text-gray-400">{formatDate(file.$updatedAt)}</p>
      </div>
      
      {file.starred && (
        <Star className="w-4 h-4 text-yellow-400 fill-current mt-2" />
      )}
    </div>
  );
};

export default FileCard;