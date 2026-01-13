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

const ContactPage = () => {
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
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-blue-900">
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

        <div className="container mx-auto px-4 relative z-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <span className="flex items-center gap-3 text-primary-yellow font-black uppercase tracking-[0.4em] text-sm mb-6">
              <div className="w-10 h-1 bg-primary-yellow rounded" />
              Connect with us
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter uppercase grayscale-[30%] brightness-[120%]">
              Get in <span className="text-primary-green">Touch.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
              Have questions, ideas, or want to partner with us? We're here to
              listen and collaborate for a better Malawi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section (Form + Info) */}
      <Contact showHeader={false} />

      {/* Global Presence / Support */}
      <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-tight">
                Our <span className="text-primary-yellow">Operations</span>{" "}
                <br />
                Are Always Open
              </h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-yellow" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Working Hours</h4>
                    <p className="text-white/60">
                      Monday - Friday: 8:00 AM - 5:00 PM (CAT)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      In-Country Focal Point
                    </h4>
                    <p className="text-white/60">
                      Youth Adaptation Network - Malawi Chapter
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/10">
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter">
                  Fast Response
                </h3>
                <p className="text-white/60 mb-10 leading-relaxed">
                  We aim to respond to all inquiries within 24-48 hours. For
                  urgent partnership matters, please include "URGENT" in your
                  email subject line.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-primary-yellow font-black uppercase tracking-widest text-[10px] mb-2">
                      Blantyre
                    </p>
                    <p className="font-bold">+265 996 654 088</p>
                  </div>
                  <div>
                    <p className="text-primary-green font-black uppercase tracking-widest text-[10px] mb-2">
                      Lilongwe
                    </p>
                    <p className="font-bold">+265 881 234 567</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-green/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
