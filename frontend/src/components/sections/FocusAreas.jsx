import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../utils/api";

const FocusAreas = () => {
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(getApiUrl("/programs"));
      const data = await response.json();
      // Set only first 6 for home page
      setAreas(data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="py-20 md:py-20 sm:py-10 bg-[#155799] relative"
      style={{ clipPath: "polygon(0 5vw, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-start lg:gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, staggerChildren: 0.2 },
              },
            }}
            className="lg:w-1/3 mb-12 lg:mb-0"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-4xl md:text-5xl font-black mb-6 text-yellow-400 uppercase tracking-tighter leading-none"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
            >
              Our <br className="hidden lg:block" /> Programmes
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-white/90 font-medium text-lg leading-relaxed"
            >
              We are organising our activities in{" "}
              {areas.length > 0 ? areas.length : "6"} main programme areas that
              are strongly interconnected.
            </motion.p>
          </motion.div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-10 md:gap-16">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sm:col-span-2 flex justify-center py-20"
                >
                  <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
                </motion.div>
              ) : areas.length > 0 ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sm:col-span-2 grid sm:grid-cols-2 gap-10 md:gap-16"
                >
                  {areas.map((area, idx) => (
                    <motion.div
                      key={area._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                      className="relative group"
                    >
                      <span className="absolute -left-4 -top-6 text-[80px] md:text-[100px] font-black text-white/5 select-none z-0 group-hover:text-primary-green/10 transition-colors">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-black text-lime-300 mb-4 uppercase tracking-tight">
                          {area.title}
                        </h3>
                        <p className="text-white/80 text-base font-medium leading-relaxed">
                          {area.shortDesc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white/60 sm:col-span-2 text-center py-10"
                >
                  No programs currently available.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-12">
          <button
            onClick={() => navigate("/programs")}
            className="w-full md:w-auto bg-primary-green text-white font-black text-[10px] uppercase tracking-[0.2em] px-12 py-5 rounded-2xl shadow-2xl shadow-black/20 hover:bg-lime-500 transition-all flex items-center justify-center gap-3"
          >
            All Programmes
            <span className="inline-block text-lg">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
