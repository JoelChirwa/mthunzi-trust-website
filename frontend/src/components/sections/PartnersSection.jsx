import React from "react";
import { motion } from "framer-motion";
import { getApiUrl } from "../../utils/api";

const PartnersSection = () => {
  const [partners, setPartners] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  React.useEffect(() => {
    fetchPartners();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPartners = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/partners"));
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPartners = partners.length;
  // Duplicate for smooth infinite-feeling carousel
  const duplicatedPartners =
    totalPartners > 0
      ? [...partners, ...partners, ...partners, ...partners]
      : [];

  const nextSlide = React.useCallback(() => {
    if (totalPartners === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalPartners);
  }, [totalPartners]);

  const prevSlide = React.useCallback(() => {
    if (totalPartners === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalPartners) % totalPartners);
  }, [totalPartners]);

  React.useEffect(() => {
    if (isPaused || totalPartners === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, totalPartners]);

  if (isLoading) {
    return (
      <section className="py-20 bg-green-500 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60 font-medium animate-pulse">
            Connecting Partners...
          </p>
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-green-500 to-green-600 overflow-hidden relative">
      {/* Bottom decorative dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-200" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex-1 h-1 bg-white/30 rounded max-w-xs" />
          <h2 className="text-4xl font-bold text-white whitespace-nowrap uppercase tracking-wider">
            Our Partners
          </h2>
          <div className="flex-1 h-1 bg-white/30 rounded max-w-xs" />
        </div>

        {/* Description */}
        <p className="text-white text-lg leading-relaxed mb-16 max-w-4xl mx-auto text-center opacity-90 font-medium">
          We are deeply grateful for the trust and partnership of organizations
          who share our vision. Through meaningful collaboration, our partners
          strengthen our capacity to advocate, empower, and drive sustainable
          change in communities across Malawi.
        </p>

        {/* Carousel Outer Container */}
        <div
          className="relative group px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Functional Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Previous partners"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Next partners"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Gradient Side Fades */}
          <div className="absolute left-10 top-0 bottom-0 w-32 bg-gradient-to-r from-green-500 via-green-500/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-10 top-0 bottom-0 w-32 bg-gradient-to-l from-green-600 via-green-600/80 to-transparent z-20 pointer-events-none" />

          {/* Smooth Scrolling Track */}
          <div className="overflow-hidden py-4">
            <motion.div
              className="flex gap-4 md:gap-8"
              animate={{
                x: `calc(-${
                  currentIndex * (100 / (windowWidth < 768 ? 2 : 4))
                }%)`,
              }}
              transition={{
                type: "spring",
                stiffness: 60, // Smooth glide feel
                damping: 20,
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.a
                  key={`${partner._id}-${index}`}
                  href={partner.url || "#"}
                  target={partner.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  className="flex-shrink-0 w-[calc(50%-0.5rem)] md:w-80 h-32 md:h-48 bg-white rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 flex items-center justify-center p-4 md:p-8 shadow-sm hover:shadow-2xl"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-all duration-300"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
