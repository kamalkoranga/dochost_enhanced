import { useState } from "react";
import UploadModal from "../components/UploadModal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar viewMode={viewMode} setViewMode={setViewMode} setIsModalOpen={setIsModalOpen} />

      <div className="flex">
        <Sidebar refreshFiles={refreshFiles} />

        {/* Outlet is used to render nested routes, if any */}
        <Outlet context={{ refreshFiles, setRefreshFiles, viewMode }}/>

      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setRefreshFiles={setRefreshFiles} />
    </div>
  );
}

export default DashboardLayout;