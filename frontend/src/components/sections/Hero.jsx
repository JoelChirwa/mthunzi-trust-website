import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage1 from "../../assets/images/hero.jpg";
import heroImage2 from "../../assets/images/hero2.jpeg";

/**
 * Hero Section Component
 * Features a dynamic slideshow with two sides (slides).
 * Slide 1 focuses on general empowerment.
 * Slide 2 highlights Mthunzi Trust as a Focal Point for Youth Adaptation.
 */
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tagline: "Welcome to The Umbrella of Hope",
      title: "",
      description:
        "We are a youth-led non-profit driving sustainable development, education, environmental protection, and community empowerment in Malawi. Join us in making a difference!",
      bgImage: heroImage1,
      buttons: [{ text: "Learn More", type: "primary" }],
    },
    {
      id: 2,
      tagline: "Global Leadership",
      title: "",
      description: "In-Country Focal Point for Youth Adaptation Network",
      bgImage: heroImage2,
      buttons: [{ text: "Learn More", type: "primary" }],
    },
  ];

  // Increased auto-play interval for a more relaxed feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 30000); // 30 seconds per slide
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 30, ease: "linear" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[currentSlide].bgImage})`,
              }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark Overlays for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-20 relative text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.8,
                },
              },
              exit: {
                opacity: 0,
                y: -20,
                transition: { duration: 0.5, ease: "easeIn" },
              },
            }}
            className="max-w-4xl mx-auto"
          >
            {/* Tagline Animation */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-primary-yellow text-base md:text-lg font-bold uppercase tracking-[0.4em] mb-6 font-montserrat"
            >
              {slides[currentSlide].tagline}
            </motion.h2>

            {/* Main Headline */}
            {slides[currentSlide].title && (
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight drop-shadow-2xl"
              >
                {slides[currentSlide].title}
              </motion.h1>
            )}

            {/* Subtext Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-lg md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-lato leading-relaxed drop-shadow"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* Interactive Call to Action Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              {slides[currentSlide].buttons.map((btn, idx) => (
                <button
                  key={idx}
                  className={`px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl ${
                    btn.type === "primary"
                      ? "bg-primary-yellow text-primary-green hover:bg-yellow-400 hover:shadow-yellow-500/20"
                      : "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20"
                  }`}
                >
                  {btn.text}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop/Tablet Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between px-8 z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full bg-black/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white transition-all pointer-events-auto group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 rounded-full bg-black/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white transition-all pointer-events-auto group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress Bars / Slide Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="group relative h-1.5 focus:outline-none"
          >
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                currentSlide === idx
                  ? "w-12 bg-primary-yellow"
                  : "w-6 bg-white/30 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Bottom Scroll Hint */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
