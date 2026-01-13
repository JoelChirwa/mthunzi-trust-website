import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Bell, Search, Settings as SettingsIcon, User } from "lucide-react";
import { motion } from "framer-motion";

const AdminLayout = ({ children, title }) => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div>
            <h1 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
              {title || "Dashboard"}
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
              Welcome back, Joel
            </p>
          </div>

          <div className="flex items-center gap-8">
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-4 w-4 h-4 text-gray-400 group-focus-within:text-primary-green transition-colors" />
              <input
                type="text"
                placeholder="Search everything..."
                className="pl-12 pr-6 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-medium w-64 transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400 hover:bg-white hover:text-blue-900 hover:shadow-xl transition-all border border-transparent hover:border-gray-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              <div className="w-px h-8 bg-gray-100 mx-2" />

              <div className="flex items-center gap-4 pl-2 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-blue-900 group-hover:text-primary-green transition-colors uppercase leading-none">
                    Admin Profile
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-green mt-1">
                    Online
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-900 flex items-center justify-center text-white border-4 border-white shadow-xl">
                  <User className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-10 flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>

        {/* System Status Footer */}
        <footer className="px-10 py-6 bg-white border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            © 2024 Mthunzi Trust • Cloud Infrastructure Active
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              API Connected
            </span>
            <div className="w-px h-4 bg-gray-100" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
              v1.0.4 r-stable
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
