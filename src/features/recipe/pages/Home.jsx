import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
    

      {/* Sidebar */}
     <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white lg:rounded-l-3xl shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
