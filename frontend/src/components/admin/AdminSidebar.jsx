import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image as ImageIcon,
  Users,
  Settings,
  ChevronRight,
  LogOut,
  Layers,
  Globe,
  BarChart3,
  Handshake,
} from "lucide-react";
import logoImg from "../../assets/images/logo.jpg";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = () => {
    signOut(() => navigate("/admin/login"));
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { name: "Blogs", icon: FileText, path: "/admin/blogs" },
    { name: "Programs", icon: Layers, path: "/admin/programs" },
    { name: "Careers", icon: Briefcase, path: "/admin/jobs" },
    { name: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
    { name: "Our Team", icon: Users, path: "/admin/team" },
    { name: "Partners", icon: Handshake, path: "/admin/partners" },
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

      <div className="flex-1 p-4 px-6 space-y-2 mt-4 overflow-y-auto">
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
      </div>

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
