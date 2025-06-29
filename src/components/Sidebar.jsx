import { Home, Clock, Share2, Trash2, Star } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <nav className="p-4 space-y-2">
        <button className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg w-full text-left cursor-pointer">
          <Home className="w-5 h-5" />
          <span>My Files</span>
        </button>
        <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition w-full text-left cursor-pointer">
          <Clock className="w-5 h-5" />
          <span>Recent</span>
        </button>
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
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Storage</span>
            <span className="text-sm font-medium text-gray-900">2.1 GB of 15 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '14%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;