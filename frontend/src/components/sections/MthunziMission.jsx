import React from "react";
import { motion } from "framer-motion";
import importedImage from "../../assets/images/about.webp";
import { useSettings } from "../../context/SettingsContext";

const MthunziMission = () => {
  const { settings } = useSettings();
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, staggerChildren: 0.2 },
                },
              }}
            >
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-3xl md:text-5xl font-black text-blue-900 mb-6 leading-tight uppercase tracking-tighter"
              >
                {settings?.organizationName || "Mthunzi Trust"} is a registered
                <span className="text-primary-green"> Youth-Led </span>
                Non-Profit Organisation
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-gray-500 text-base md:text-xl mb-10 leading-relaxed font-medium"
              >
                Our work is in line with Sustainable Development Goals, Malawi
                Agenda 2030 and Malawi Vision 2063.
              </motion.p>
              <motion.button
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection)
                    contactSection.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center bg-blue-900 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-5 rounded-2xl transition-all hover:bg-primary-green hover:shadow-2xl hover:shadow-primary-green/20 hover:-translate-y-1 shadow-xl shadow-blue-900/10"
              >
                Join Our Mission <span className="inline-block ml-3">→</span>
              </motion.button>
            </motion.div>
          </div>
          {/* Right: Image */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <img
                src={importedImage}
                alt="About Mthunzi Trust"
                className="rounded-[3rem] shadow-2xl w-full h-[300px] md:h-[500px] object-cover"
              />
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-green rounded-full -z-10 opacity-20 blur-xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-400 rounded-full -z-10 opacity-20 blur-xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MthunziMission;
