import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, LogOut, ChevronLeft } from "lucide-react";
import { useClerk } from "@clerk/clerk-react";

const AccessDenied = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut(() => navigate("/"));
  };

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col justify-center items-center p-6 relative overflow-hidden font-poppins">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[#000]/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-red-500/10 rounded-3xl mb-8 border border-red-500/20"
        >
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </motion.div>

        <h1 className="text-white text-3xl font-black uppercase tracking-[-0.05em] leading-none mb-4">
          Access <span className="text-red-500">Denied</span>
        </h1>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-[1px] w-8 bg-white/10" />
          <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em]">
            Unauthorized Identity
          </p>
          <div className="h-[1px] w-8 bg-white/10" />
        </div>

        <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-[300px] mx-auto">
          This account does not have administrative privileges. Authentication
          session has been terminated for security.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleSignOut}
            className="w-full h-14 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Immediately
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest w-full py-4"
          >
            <ChevronLeft className="w-3 h-3" /> Return to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
