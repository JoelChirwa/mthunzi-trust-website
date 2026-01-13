import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronLeft } from "lucide-react";
import { SignIn, useUser } from "@clerk/clerk-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useUser();

  // If already logged in, redirect to admin dashboard
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/admin");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) return null; // or a loading spinner

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col justify-center items-center p-6 relative overflow-hidden font-poppins">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-green/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-yellow/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[#000]/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary-green/10 rounded-3xl mb-8 border border-primary-green/20"
          >
            <ShieldCheck className="w-10 h-10 text-primary-green" />
          </motion.div>
          <h1 className="text-white text-4xl font-black uppercase tracking-[-0.05em] leading-none mb-3">
            ADMIN <span className="text-primary-green">PORTAL</span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-white/10" />
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em]">
              Authorized Personnel Only
            </p>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
        </div>

        {/* Clerk Sign In Component */}
        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full shadow-2xl",
                card: "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl",
                headerTitle: "text-white font-black uppercase tracking-tight",
                headerSubtitle: "text-white/40 font-bold",
                socialButtonsBlockButton:
                  "bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all",
                formButtonPrimary:
                  "bg-primary-green hover:bg-primary-green/80 text-white font-black uppercase tracking-[0.2em] text-[10px] h-12 rounded-xl transition-all",
                formFieldLabel:
                  "text-[10px] font-black uppercase tracking-widest text-white/60",
                formFieldInput:
                  "bg-white/5 border-white/10 text-white rounded-xl h-12",
                footerAction: "hidden",
                identityPreviewText: "text-white",
                identityPreviewEditButtonIcon: "text-primary-green",
              },
            }}
            forceRedirectUrl="/admin"
          />
        </div>

        {/* Footer Links */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <ChevronLeft className="w-4 h-4" /> Return to Public Domain
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
