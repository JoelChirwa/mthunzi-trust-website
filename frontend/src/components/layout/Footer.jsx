import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  ArrowRight,
  Send,
} from "lucide-react";
import logoImg from "../../assets/images/logo.jpg";
import { getApiUrl } from "../../utils/api";

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(getApiUrl("/settings"));

        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: settings?.facebook || "#",
      label: "Facebook",
      color: "hover:bg-[#1877F2]",
    },
    {
      icon: Twitter,
      href: settings?.twitter || "#",
      label: "Twitter",
      color: "hover:bg-[#1DA1F2]",
    },
    {
      icon: Instagram,
      href: settings?.instagram || "#",
      label: "Instagram",
      color: "hover:bg-[#E4405F]",
    },
    {
      icon: Linkedin,
      href: settings?.linkedin || "#",
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2]",
    },
  ];

  return (
    <footer className="bg-blue-950 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-green via-primary-yellow to-primary-green/50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-yellow/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Identity */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="p-1 bg-white rounded-full">
                <img
                  src={logoImg}
                  alt="Mthunzi Logo"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tighter leading-none">
                  {settings?.organizationName?.split(" ")[0] || "MTHUNZI"}{" "}
                  <span className="text-primary-green">
                    {settings?.organizationName?.split(" ")[1] || "TRUST"}
                  </span>
                </h3>
                <p className="text-primary-yellow font-bold uppercase tracking-[0.3em] text-[10px] mt-1 text-wrap lowercase">
                  {settings?.tagline || "The Umbrella of Hope"}
                </p>
              </div>
            </motion.div>

            <p className="text-white/60 leading-relaxed text-sm max-w-sm">
              Empowering youth and communities in Malawi through sustainable
              development, education, and environmental restoration. Together,
              we build a resilient future.
            </p>

            <div className="flex gap-4">
              {socialLinks
                .filter((s) => s.href !== "#" && s.href !== "")
                .map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-10 flex items-center gap-3">
              <span className="w-6 h-1 bg-primary-green rounded-full" />
              Navigation
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-3 text-white/50 hover:text-white transition-all duration-300 text-sm font-bold uppercase tracking-wider"
                  >
                    <ArrowRight className="w-4 h-4 text-primary-green opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-10 flex items-center gap-3">
              <span className="w-6 h-1 bg-primary-yellow rounded-full" />
              Contact
            </h4>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">
                    Office
                  </p>
                  <p className="text-sm font-medium text-white/80 leading-relaxed capitalize">
                    {settings?.address || "Blantyre, Malawi"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Mail className="w-5 h-5 text-primary-yellow" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${settings?.email || "info@mthunzi.org"}`}
                    className="text-sm font-bold hover:text-primary-green transition-colors"
                  >
                    {settings?.email || "info@mthunzi.org"}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Phone className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${settings?.phone}`}
                    className="text-sm font-bold hover:text-primary-green transition-colors"
                  >
                    {settings?.phone || "+265 996 654 088"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-10 flex items-center gap-3">
              <span className="w-6 h-1 bg-white rounded-full" />
              Newsletter
            </h4>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Join our community and stay updated with our latest impact
              stories.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-primary-green focus:bg-white/10 transition-all font-medium"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary-green hover:bg-white hover:text-blue-950 px-4 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                Join our mission today
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Link
              to="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              © {new Date().getFullYear()} Mthunzi Trust. All rights reserved.
            </Link>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-white/30 hover:text-primary-green text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-white/30 hover:text-primary-green text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 py-2 px-6 bg-white/5 border border-white/10 rounded-full">
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
              Made in Malawi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
