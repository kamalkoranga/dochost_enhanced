import { useState } from "react";
import { Cloud, Search, Plus, Grid, List, Settings, User, ChevronDown, LogOut, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/appwrite";

const Navbar = ({ viewMode, setViewMode, setIsModalOpen }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setShowUserDropdown(false);
    try {
      await authService.logout();
      navigate('/signin'); // or whatever your login route is
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-blue-600" />
            <Link to="/" className="text-2xl font-bold text-gray-900 cursor-pointer">DocHost</Link>
          </div>
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search files and folders"
              className="bg-transparent outline-none flex-1 text-gray-700"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 transition">
            <Settings className="w-5 h-5" />
          </button>
          
          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-1 p-1 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {showUserDropdown && (
              <>
                {/* Backdrop to close dropdown when clicking outside */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowUserDropdown(false)}
                ></div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                  </div>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition">
                    <UserCircle className="w-4 h-4" />
                    <span className="text-sm">Profile Settings</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Account Settings</span>
                  </button>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;