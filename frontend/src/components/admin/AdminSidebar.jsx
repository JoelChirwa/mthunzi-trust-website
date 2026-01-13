import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image as ImageIcon,
  Users,
  Handshake,
  Settings,
  BarChart3,
  ChevronRight,
  LogOut,
  Layers,
  Globe,
} from "lucide-react";
import logoImg from "../../assets/images/logo.jpg";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Blogs", icon: FileText, path: "/admin/blogs" },
    { name: "Programs", icon: Layers, path: "/admin/programs" },
    { name: "Careers", icon: Briefcase, path: "/admin/jobs" },
    { name: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
    { name: "Our Team", icon: Users, path: "/admin/team" },
    { name: "Partners", icon: Handshake, path: "/admin/partners" },
    { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="w-80 bg-blue-950 min-h-screen flex flex-col border-r border-white/5 sticky top-0 overflow-y-auto">
      {/* Brand */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-1 bg-white rounded-full">
            <img
              src={logoImg}
              alt="Mthunzi Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-black tracking-tight text-lg">
              MTHUNZI <span className="text-primary-green">ADMIN</span>
            </h3>
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-none">
              Management Hub
            </p>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="p-6 m-4 bg-white/5 rounded-3xl border border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-green flex items-center justify-center text-white font-black text-xl">
            JC
          </div>
          <div>
            <p className="text-white font-bold text-sm">Joel Chirwa</p>
            <p className="text-white/40 text-xs">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 px-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                isActive
                  ? "bg-primary-green text-white shadow-lg shadow-primary-green/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="active"
                  className="w-1 h-1 bg-white rounded-full"
                />
              )}
              {!isActive && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/5 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-4 p-4 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
        >
          <Globe className="w-5 h-5" />
          Visit Website
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all text-sm font-bold uppercase tracking-wider text-left"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
