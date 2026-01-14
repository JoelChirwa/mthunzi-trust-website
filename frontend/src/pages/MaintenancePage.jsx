import React from "react";
import { motion } from "framer-motion";
import { Hammer, Cog, MessageCircle, Mail, Phone } from "lucide-react";
import logoImg from "../assets/images/logo.jpg";

const MaintenancePage = ({ settings }) => {
  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-green via-primary-yellow to-primary-green/50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-yellow/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl relative z-10 text-center"
      >
        <div className="flex justify-center mb-8">
          <div className="p-1 bg-blue-900 rounded-full">
            <img
              src={logoImg}
              alt="Mthunzi Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-primary-green/10 text-primary-green px-4 py-2 rounded-full mb-6">
          <Hammer className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Under Maintenance
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-blue-900 uppercase tracking-tighter mb-6">
          We're polishing things up!
        </h1>

        <p className="text-gray-500 font-medium leading-relaxed mb-10 max-w-md mx-auto">
          {settings?.organizationName || "Mthunzi Trust"} is currently
          undergoing scheduled maintenance to improve your experience. We'll be
          back online shortly!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center">
            <Mail className="w-6 h-6 text-primary-green mb-3" />
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">
              Email Us
            </p>
            <p className="text-sm font-bold text-blue-900">
              {settings?.email || "info@mthunzi.org"}
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center">
            <Phone className="w-6 h-6 text-primary-green mb-3" />
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">
              Call Us
            </p>
            <p className="text-sm font-bold text-blue-900">
              {settings?.phone || "+265 996 654 088"}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Follow our updates
          </p>
          <div className="flex gap-4">
            {settings?.facebook && (
              <a
                href={settings.facebook}
                className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center hover:bg-primary-green transition-colors"
              >
                <Cog className="w-5 h-5" />
              </a>
            )}
            <div className="flex items-center gap-2 text-primary-green animate-pulse">
              <Cog className="w-4 h-4 spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Working on it...
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;
