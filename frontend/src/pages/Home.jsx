import React from "react";
import { motion } from "framer-motion";

import Hero from "../components/sections/Hero";
import MthunziMission from "../components/sections/MthunziMission";
import FocusAreas from "../components/sections/FocusAreas";
import HowWeWork from "../components/sections/HowWeWork";
import ImpactPreview from "../components/sections/ImpactPreview";
import BlogSection from "../components/sections/BlogSection";
import PartnersSection from "../components/sections/PartnersSection";

import SEO from "../components/SEO";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SEO
        title="Home"
        description="Mthunzi Trust - The Umbrella of Hope. Empowering youth and communities in Malawi through sustainable development, education, and health initiatives."
        keywords="Mthunzi Trust, Malawi, NGO, youth empowerment, sustainable development, education, charity"
      />
      <Hero />
      <MthunziMission />
      <FocusAreas />
      <HowWeWork />
      <ImpactPreview />
      <BlogSection />
      <PartnersSection />
    </motion.div>
  );
};

export default HomePage;
