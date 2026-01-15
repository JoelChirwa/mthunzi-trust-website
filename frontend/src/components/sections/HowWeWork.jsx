import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  Handshake,
  Globe,
  Lightbulb,
  Heart,
  ChevronDown,
  Megaphone,
} from "lucide-react";

const workMethods = [
  {
    icon: Megaphone,
    title: "ADVOCACY",
    desc: "We advocate for youth, women, and Persons With Disabilities(PWDs).",
    color: "bg-blue-500",
  },
  {
    icon: TrendingUp,
    title: "CAPACITY BUILDING",
    desc: "We help develop capacity of the member organizations and the young people that we work with.",
    color: "bg-primary-green",
  },
  {
    icon: Handshake,
    title: "PARTNERSHIP",
    desc: "We collaborate with organizations in and out country to meet our joint objectives.",
    color: "bg-primary-yellow",
  },
  {
    icon: Globe,
    title: "COMMUNITY ENGAGEMENT & ACTION",
    desc: "We engage communities to drive local action and sustainable change.",
    color: "bg-purple-500",
  },
  {
    icon: Heart,
    title: "EMPOWERMENT",
    desc: "We empower individuals and groups to realize their full potential.",
    color: "bg-red-500",
  },
  {
    icon: Lightbulb,
    title: "INNOVATION",
    desc: "We foster innovative solutions to address emerging challenges.",
    color: "bg-teal-500",
  },
];

const HowWeWork = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-primary-green rounded" />
              <span className="text-primary-green font-black uppercase tracking-[0.3em] text-sm">
                Our Methodology
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 uppercase tracking-tighter">
              How We <span className="text-primary-green">Work</span>
            </h2>
          </div>
          <p className="md:max-w-md text-gray-500 font-medium leading-relaxed">
            Our strategic approach is built on inclusive participation and
            community-driven solutions to ensure sustainable impact across
            Malawi.
          </p>
        </div>

        {/* Interaction Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workMethods.map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden bg-white ${
                activeIndex === idx
                  ? "border-primary-green shadow-2xl shadow-primary-green/10"
                  : "border-transparent shadow-sm hover:border-gray-100 hover:shadow-xl"
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full p-8 md:p-10 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white transition-transform duration-500 ${
                      method.color
                    } ${
                      activeIndex === idx
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  >
                    <method.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-blue-900 uppercase tracking-tight leading-tight max-w-[200px] md:max-w-none">
                    {method.title}
                  </h3>
                </div>

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-primary-green text-white rotate-180"
                      : "bg-gray-50 text-gray-400 group-hover:bg-primary-green/10 group-hover:text-primary-green"
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 md:px-10 pb-10">
                      <div className="w-full h-px bg-gray-100 mb-8" />
                      <p className="text-gray-600 text-lg leading-relaxed font-medium pl-2 md:pl-22 relative">
                        <span className="absolute left-0 top-0 text-5xl text-primary-green/10 font-black hidden md:block">
                          “
                        </span>
                        {method.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="w-2 h-2 bg-primary-green rounded-full animate-pulse" />
            Continuous Growth • Holistic Solutions
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
