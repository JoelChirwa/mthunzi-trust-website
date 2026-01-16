import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  TreePine,
  Heart,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const ImpactPreview = () => {
  const navigate = useNavigate();

  const quickStats = [
    {
      icon: Users,
      value: "2,000+",
      label: "Young People Reached",
      color: "text-blue-600",
    },
    {
      icon: TreePine,
      value: "500+",
      label: "Trees Planted",
      color: "text-green-600",
    },
    {
      icon: Heart,
      value: "1,500+",
      label: "Health Beneficiaries",
      color: "text-pink-600",
    },
    {
      icon: TrendingUp,
      value: "300+",
      label: "Entrepreneurs Trained",
      color: "text-purple-600",
    },
  ];

  const highlights = [
    "Planted 100 fruit trees at Chimwasongwe Primary School",
    "Regional SRHR advocacy across 4 Southern African countries",
    "50+ small businesses launched through entrepreneurship training",
    "40% reduction in pollution at Chikuli Trading Center",
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary-green via-primary-blue to-primary-green">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
              Our <span className="text-primary-yellow">Impact</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Delivering measurable results that transform lives and communities
            </p>
          </motion.div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="inline-flex p-3 rounded-full bg-white/20 mb-4">
                  <StatIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl md:text-4xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-semibold text-white/90">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Highlights */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
              Recent Achievements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-white/95 leading-relaxed">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl mx-auto">
              Explore our comprehensive impact report to see the full scope of
              our work and measurable outcomes
            </p>
            <button
              onClick={() => navigate("/impact")}
              className="inline-flex items-center gap-2 bg-primary-yellow text-gray-900 px-8 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-yellow-400 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              View Full Impact Report
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-yellow/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ImpactPreview;
