import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/images/logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll logic to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isTransparentPage =
    [
      "/",
      "/blog",
      "/programs",
      "/gallery",
      "/impact",
      "/about",
      "/contact",
      "/careers",
    ].includes(location.pathname) ||
    location.pathname.startsWith("/blog/") ||
    location.pathname.startsWith("/programs/") ||
    location.pathname.startsWith("/careers/");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-blue-900/90 backdrop-blur-md shadow-lg"
          : isTransparentPage
          ? "bg-transparent"
          : "bg-blue-900"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <nav
          className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <img
                src={logoImg}
                alt="Mthunzi Logo"
                className={`transition-all duration-300 rounded-full object-cover border-2 border-white/50 ${
                  scrolled
                    ? "w-9 h-9 md:w-10 md:h-10"
                    : "w-11 h-11 md:w-12 md:h-12"
                }`}
              />
              <div className="flex flex-col">
                <h1
                  className={`font-poppins font-black text-white tracking-tighter leading-none transition-all duration-300 ${
                    scrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
                  }`}
                >
                  MTHUNZI<span className="text-primary-yellow">.</span>
                </h1>
                <span className="text-[9px] md:text-[10px] text-white/70 uppercase tracking-[0.2em] font-bold">
                  Trust
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm tracking-wider uppercase font-bold transition-all duration-300 relative group ${
                  location.pathname === item.path
                    ? "text-primary-yellow"
                    : "text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary-yellow transition-all duration-300 ${
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-md border border-white/10 transition-all z-[60]"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation - Full Screen Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-blue-950/60 backdrop-blur-sm z-50 lg:hidden"
              />

              {/* Menu Content */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-[85%] max-w-[400px] bg-primary-green shadow-2xl z-50 lg:hidden flex flex-col pt-24"
              >
                <div className="flex-1 px-8 space-y-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={item.name}
                    >
                      <Link
                        to={item.path}
                        className={`block py-6 text-3xl font-black tracking-tighter transition-all ${
                          location.pathname === item.path
                            ? "text-primary-yellow translate-x-2"
                            : "text-white active:text-primary-yellow"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <div className="h-px w-full bg-white/10" />
                    </motion.div>
                  ))}
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-4 text-white/60">
                    <Phone className="w-5 h-5" />
                    <span className="font-bold">+265 996 654 088</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/60">
                    <Mail className="w-5 h-5" />
                    <span className="font-bold">info@mthunzi.org</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
