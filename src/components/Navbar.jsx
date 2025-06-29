import { Cloud, Search, Plus, Grid, List, Settings, User,  } from "lucide-react";


const Navbar = ({ viewMode, setViewMode, setIsModalOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">DocHost</h1>
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
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
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

          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;