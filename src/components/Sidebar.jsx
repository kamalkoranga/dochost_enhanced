import { Home, Clock, Share2, Trash2, Star, ArrowBigUpDash } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import appService from "../appwrite/appwrite";
import { useEffect, useState } from "react";
import fileService from "../appwrite/files";

const Sidebar = ({ refreshFiles }) => {
  const location = useLocation();

  const [totalStorage, setTotalStorage] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);

  const bytesToMB = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(decimals)} MB`;
  }

  useEffect(() => {
    const fetchUserStorage = async () => {
      try {
        const user = await appService.getCurrentUser();
        if (user) {
          const userDocument = await appService.getUserDocument(user.$id);
          if (userDocument) {
            // Update the UI with user storage information
            setTotalStorage(userDocument.userBytes || 0);

            const currentSize = await fileService.getFilesSize(user.$id);
            if (currentSize === -1) {
              console.error("Failed to get current file size.");
              return;
            }

            setUsedStorage(currentSize || 0);
            setTotalStorage(userDocument.userBytes || 0);
            // console.log("User Document:", userDocument);
          }
        }
      } catch (error) {
        console.log("Sidebar :: fetchUserStorage :: error:", error);
      }
    };
    fetchUserStorage();
  }, [refreshFiles]);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <nav className="p-4 space-y-2">
        <Link to="/" className={`flex items-center space-x-3 px-3 py-2 ${location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} rounded-lg w-full text-left cursor-pointer`}>
          <Home className="w-5 h-5" />
          <span>My Files</span>
        </Link>
        <Link to="/upgrade" className={`flex items-center space-x-3 px-3 py-2 ${location.pathname === '/upgrade' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} rounded-lg transition w-full text-left cursor-pointer`}>
          <ArrowBigUpDash className="w-5 h-5" />
          <span>Upgrade</span>
        </Link>
        <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition w-full text-left cursor-pointer">
          <Star className="w-5 h-5" />
          <span>Starred</span>
        </button>
        <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition w-full text-left cursor-pointer">
          <Share2 className="w-5 h-5" />
          <span>Shared</span>
        </button>
        <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition w-full text-left cursor-pointer">
          <Trash2 className="w-5 h-5" />
          <span>Trash</span>
        </button>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <Link to={"/upgrade"}>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-sm font-medium text-gray-900">{bytesToMB(usedStorage)} of {bytesToMB(totalStorage)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(usedStorage / totalStorage) * 100}%` }}></div>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;