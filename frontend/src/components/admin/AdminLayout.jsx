import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import {
  Bell,
  Search,
  Settings as SettingsIcon,
  User,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

const AdminLayout = ({ children, title }) => {
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 min-h-screen relative">
        {/* Top Header */}
        <header className="h-20 lg:h-24 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-50 rounded-xl text-blue-900 border border-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg lg:text-2xl font-black text-blue-900 uppercase tracking-tighter line-clamp-1">
                {title || "Dashboard"}
              </h1>
              <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5 lg:mt-1">
                Welcome back, {user?.firstName || "Admin"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            {/* Search Bar */}
            <div className="hidden xl:flex items-center relative group">
              <Search className="absolute left-4 w-4 h-4 text-gray-400 group-focus-within:text-primary-green transition-colors" />
              <input
                type="text"
                placeholder="Search everything..."
                className="pl-12 pr-6 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-medium w-64 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <button className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-gray-50 rounded-xl lg:rounded-2xl text-gray-400 hover:bg-white hover:text-blue-900 hover:shadow-xl transition-all border border-transparent hover:border-gray-100 relative">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="absolute top-2.5 lg:top-3 right-2.5 lg:right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              <div className="hidden sm:block w-px h-8 bg-gray-100 lg:mx-2" />

              <div className="flex items-center gap-3 lg:gap-4 pl-2 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-xs lg:text-sm font-black text-blue-900 group-hover:text-primary-green transition-colors uppercase leading-none">
                    {user?.fullName || "Joel Chirwa"}
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 mt-1 truncate max-w-[150px]">
                    {user?.primaryEmailAddress?.emailAddress ||
                      "chirwajj@gmail.com"}
                  </p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-blue-900 flex items-center justify-center text-white border-2 lg:border-4 border-white shadow-lg lg:shadow-xl overflow-hidden group-hover:scale-105 transition-transform">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 lg:w-6 lg:h-6" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 lg:p-10 flex-1 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>

        {/* System Status Footer */}
        <footer className="px-4 lg:px-10 py-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center sm:text-left text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest">
            © 2024 Mthunzi Trust • Infrastructure Active
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              API Online
            </span>
            <div className="w-px h-4 bg-gray-100" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
              v1.0.4 stable
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
