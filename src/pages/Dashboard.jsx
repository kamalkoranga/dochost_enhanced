import {Home, Clock, Star, Share2, Trash2, ChevronRight, MoreVertical } from "lucide-react";
import { useState } from "react";
import { files } from "../data/files";
import UploadModal from "../components/UploadModal";
import FileCard from "../components/FileCard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar viewMode={viewMode} setViewMode={setViewMode} setIsModalOpen={setIsModalOpen} />

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
          <nav className="p-4 space-y-2">
            <button className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg w-full text-left">
              <Home className="w-5 h-5" />
              <span>My Files</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition w-full text-left">
              <Clock className="w-5 h-5" />
              <span>Recent</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition w-full text-left">
              <Star className="w-5 h-5" />
              <span>Starred</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition w-full text-left">
              <Share2 className="w-5 h-5" />
              <span>Shared</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition w-full text-left">
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
                <FileCard key={file.id} file={file} />
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
                    <tr key={file.id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${index === files.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.type)}
                          <span className="font-medium text-gray-900">{file.name}</span>
                          {file.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{file.size}</td>
                      <td className="py-3 px-4 text-gray-600">{file.modified}</td>
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

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Dashboard;