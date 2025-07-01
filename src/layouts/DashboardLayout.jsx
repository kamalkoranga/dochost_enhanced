import { useState } from "react";
import UploadModal from "../components/UploadModal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        setIsModalOpen={setIsModalOpen}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex">
        <Sidebar 
          refreshFiles={refreshFiles} 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Outlet is used to render nested routes, if any */}
        <main className="flex-1 lg:ml-0">
          <Outlet context={{ refreshFiles, setRefreshFiles, viewMode }}/>
        </main>

      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setRefreshFiles={setRefreshFiles} />
    </div>
  );
}

export default DashboardLayout;