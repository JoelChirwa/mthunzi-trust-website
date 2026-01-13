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
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logoImg}
                alt="Mthunzi Logo"
                className={`transition-all duration-300 rounded-full object-cover border-2 border-white/50 ${
                  scrolled ? "w-10 h-10" : "w-12 h-12"
                }`}
              />
              <div className="flex flex-col">
                <h1 className="font-poppins font-black text-xl md:text-2xl text-white tracking-tighter leading-none">
                  MTHUNZI<span className="text-primary-yellow">.</span>
                </h1>
                <span className="text-[10px] text-white/70 uppercase tracking-[0.2em] font-bold">
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
            className="lg:hidden p-2 text-white bg-white/10 rounded-lg backdrop-blur-md border border-white/20"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-primary-green rounded-b-2xl shadow-2xl"
            >
              <div className="py-6 space-y-4 px-4 border-t border-white/10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block py-3 text-lg font-bold tracking-wide transition-colors ${
                      location.pathname === item.path
                        ? "text-primary-yellow"
                        : "text-white hover:text-primary-yellow"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
