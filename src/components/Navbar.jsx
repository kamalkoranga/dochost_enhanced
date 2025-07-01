import { useEffect, useState } from "react";
import { Cloud, Search, Plus, Grid, List, Settings, User, ChevronDown, LogOut, UserCircle, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/appwrite";

const Navbar = ({ viewMode, setViewMode, setIsModalOpen, isSidebarOpen, setIsSidebarOpen }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };

  const handleLogout = async () => {
    setShowUserDropdown(false);
    try {
      await authService.logout();
      navigate('/signin');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo and Search */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <Link to="/" className="text-lg sm:text-2xl font-bold text-gray-900 cursor-pointer">
              <span className="hidden sm:inline">DocHost</span>
              <span className="sm:hidden">DocHost</span>
            </Link>
          </div>
          
          {/* Search Bar - Responsive Width */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-xs lg:max-w-sm xl:max-w-md">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search files"
              className="bg-transparent outline-none flex-1 text-gray-700 text-sm min-w-0"
            />
          </div>
        </div>
        
        {/* Right Section - Actions and User */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 flex-shrink-0">
          {/* Upload Button - Responsive */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-1 sm:space-x-2 cursor-pointer text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
          
          {/* View Mode Toggles - Hide text on smaller screens */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 sm:p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 sm:p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="List View"
            >
              <List className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          
          {/* Settings - Hide on very small screens */}
          <button 
            className="hidden sm:block p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition"
            title="Settings"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-1 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </button>
            
            {showUserDropdown && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowUserDropdown(false)}
                ></div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  {currentUser && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                  )}
                  
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
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition cursor-pointer"
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
      
      {/* Mobile Search Bar - Shows on small screens */}
      <div className="md:hidden mt-3">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search files and folders"
            className="bg-transparent outline-none flex-1 text-gray-700 text-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;