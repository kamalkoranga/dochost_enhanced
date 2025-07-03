import { useEffect, useState } from "react";
import UploadModal from "../components/UploadModal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import subscriptionService from "../appwrite/subscriptions";
import authService from "../appwrite/appwrite";
import toast from "react-hot-toast";


const DashboardLayout = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePlan, setActivePlan] = useState('Cloud Plan');
  const [currentUser, setCurrentUser] = useState(null);

  // check if user's subscription is active
  // if not, call the revertToFreePlan method from subscriptionService
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          console.error("No user is currently logged in.");
          return;
        }
        // console.log("Current User:", user);
        setCurrentUser(user);
        checkSubscription(user.$id);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();

    const checkSubscription = async (userId) => {
      const timeLimit = await subscriptionService.getTimeLimit(userId);
      const document = await subscriptionService.getDocumentByUserID(userId);
      if (timeLimit && document.plan !== "free" && timeLimit < new Date()) {
        console.log("Subscription expired, reverting to free plan.");
        await subscriptionService.revertToFreePlan(userId);
        setRefreshFiles(prev => prev + 1); // Refresh files after reverting
        setActivePlan("Cloud Plan"); // Update active plan to free
        toast.success("Your plan has been reverted to the free Cloud Plan.", {duration: 4000});
      }
    };
  }, []);

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
          <Outlet context={{ refreshFiles, setRefreshFiles, viewMode, activePlan, setActivePlan }}/>
        </main>

      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setRefreshFiles={setRefreshFiles} />
    </div>
  );
}

export default DashboardLayout;