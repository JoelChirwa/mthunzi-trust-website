import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Handshake,
  Globe,
  ArrowRight,
} from "lucide-react";
import Contact from "../components/sections/Contact";
import { useSettings } from "../context/SettingsContext";

const ContactPage = () => {
  const { settings } = useSettings();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      {/* Cinematic Hero */}
      <section className="relative min-h-[30vh] md:min-h-[60vh] flex items-start overflow-hidden bg-blue-900">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1516387933669-1816a7262756?w=1600&auto=format&fit=crop&q=80"
            alt="Contact Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 pt-32 md:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <span className="flex items-center gap-3 text-primary-yellow font-black uppercase tracking-[0.4em] text-[10px] md:text-sm mb-6">
              <div className="w-8 md:w-10 h-1 bg-primary-yellow rounded" />
              Connect with us
            </span>
            <h1 className="text-4xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter uppercase">
              Get in <span className="text-primary-green">Touch.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
              Have questions, ideas, or want to partner with us? We're here to
              listen and collaborate for a better Malawi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section (Form + Info) */}
      <Contact showHeader={false} />

      {/* Global Presence / Support */}
      <section className="py-20 md:py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 text-center lg:text-left w-full">
              <h2 className="text-3xl md:text-6xl font-black mb-10 md:mb-8 uppercase tracking-tighter leading-tight">
                Our <span className="text-primary-yellow">Operations</span>{" "}
                <br className="hidden md:block" />
                Are Always Open
              </h2>
              <div className="space-y-6 md:space-y-8 flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-yellow" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-primary-yellow mb-1">
                      Working Hours
                    </h4>
                    <p className="text-white font-bold">
                      {settings?.workingHours || "Mon - Fri: 8 AM - 5 PM"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary-green" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-primary-green mb-1">
                      Focal Point
                    </h4>
                    <p className="text-white font-bold">
                      Youth Adaptation Network
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative w-full">
              <div className="bg-white/5 backdrop-blur-xl p-8 lg:p-12 rounded-3xl lg:rounded-[3.5rem] border border-white/10">
                <h3 className="text-2xl lg:text-3xl font-black mb-6 uppercase tracking-tighter">
                  Fast Response
                </h3>
                <p className="text-white/60 mb-8 lg:mb-10 leading-relaxed text-sm lg:text-base">
                  We aim to respond to all inquiries within 24-48 hours. For
                  urgent partnership matters, please include "URGENT" in your
                  email subject line or contact our coordinators directly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left border-t border-white/5 pt-8">
                  <div>
                    <p className="text-primary-yellow font-black uppercase tracking-widest text-[10px] mb-2">
                      Headquarters
                    </p>
                    <p className="font-black text-lg">
                      {settings?.phone || "+265 996 654 088"}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-green font-black uppercase tracking-widest text-[10px] mb-2">
                      General Mail
                    </p>
                    <p className="font-black text-sm lg:text-lg break-all">
                      {settings?.email || "info@mthunzi.org"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-green/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-[2.5rem] lg:rounded-[4rem] p-8 lg:p-20 relative overflow-hidden text-center lg:text-left">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                  Stay Connected with <br />
                  <span className="text-primary-green">Our Progress.</span>
                </h2>
                <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
                  Subscribe to our Monthly Discovery report to get the latest
                  updates on our community impact projects across Malawi.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      })
                    }
                    className="px-10 py-5 bg-primary-green text-blue-950 font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white transition-all shadow-xl shadow-primary-green/20"
                  >
                    Join Community
                  </button>
                  <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 text-white/40">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                      Newsletter Section in Footer
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block w-72 h-72 bg-white/5 rounded-[3rem] rotate-12 flex items-center justify-center border border-white/10 p-10 transform translate-x-10 translate-y-10">
                <div className="w-full h-full bg-primary-green rounded-[2rem] flex items-center justify-center text-blue-900 shadow-2xl">
                  <Mail className="w-20 h-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
