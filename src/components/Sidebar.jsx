import { Home, Share2, Trash2, Star, Crown, X, Cloud } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import authService from "../appwrite/appwrite";
import { useEffect, useState } from "react";
import fileService from "../appwrite/files";
import { bytesToMB } from "../utils/formatData";
import getTotalStorage from "../utils/getTotalStorage";
import toast from "react-hot-toast";

const Sidebar = ({ refreshFiles, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const [totalStorage, setTotalStorage] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);
  const [titleMsg, setTitleMsg] = useState("");

  useEffect(() => {
    const fetchUserStorage = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          const userTotalStorage = await getTotalStorage(user.$id);
          if (userTotalStorage) {

            const currentSize = await fileService.getFilesSize(user.$id);
            if (currentSize === -1) {
              console.error("Failed to get current file size.");
              return;
            }

            setUsedStorage(currentSize || 0);
            setTotalStorage(userTotalStorage || 0);
            // console.log("User Document:", userDocument);
          }
        }
      } catch (error) {
        console.log("Sidebar :: fetchUserStorage :: error:", error);
      }

      if (((usedStorage / totalStorage) * 100) > 90 && ((usedStorage / totalStorage) * 100) <= 100) {
        setTitleMsg(`Storage (${((usedStorage / totalStorage) * 100).toFixed(2)}% full)`);
        toast.error(`Storage is almost full (${((usedStorage / totalStorage) * 100).toFixed(2)}%). Please consider upgrading your plan.`);
      } else if (((usedStorage / totalStorage) * 100) > 100) {
        setTitleMsg(`Storage (100% full)`);
        toast.error(`Storage is full. Please consider upgrading your plan.`);
      }
    };
    fetchUserStorage();
  }, [refreshFiles]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 z-50 lg:z-auto
        w-64 bg-white border-r border-gray-200 h-screen
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-between p-4 border-b border-gray-200">
            <Link to="/" className="text-lg sm:text-2xl font-bold text-gray-900 cursor-pointer flex gap-2 items-center">
              <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <span className="sm:hidden">DocHost</span>
            </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link 
            to="/" 
            className={`flex items-center space-x-3 px-3 py-2 ${location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} rounded-lg w-full text-left cursor-pointer`}
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile when link is clicked
          >
            <Home className="w-5 h-5" />
            <span>My Files</span>
          </Link>
          <Link 
            to="/upgrade" 
            className={`flex items-center space-x-3 px-3 py-2 ${location.pathname === '/upgrade' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} rounded-lg transition w-full text-left cursor-pointer`}
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile when link is clicked
          >
            <Crown className="w-5 h-5" />
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

      <div className="p-4 border-t border-gray-200 mt-auto" title={titleMsg}>
        <Link to={"/upgrade"}>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2 flex-wrap">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-sm font-medium text-gray-900">{bytesToMB(usedStorage)} of {bytesToMB(totalStorage)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className={((usedStorage / totalStorage) * 100) <= 90 ? `bg-blue-600 h-2 rounded-full` : 'bg-red-600 h-2 rounded-full'} style={{ width: `${(usedStorage / totalStorage) * 100}%` }}></div>
            </div>
          </div>
        </Link>
      </div>
    </aside>
    </>
  );
}

export default Sidebar;