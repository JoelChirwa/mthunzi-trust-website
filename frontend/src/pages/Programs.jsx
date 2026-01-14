import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Leaf,
  Briefcase,
  HeartPulse,
  Plus,
  Loader2,
  Target,
  Users,
  Sprout,
  Layers,
} from "lucide-react";
import { getApiUrl } from "../utils/api";

const ICON_MAP = {
  GraduationCap,
  Leaf,
  Briefcase,
  HeartPulse,
  Layers,
};

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/programs"));

      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      {/* Cinematic Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-start overflow-hidden bg-blue-900">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80"
            alt="Programs Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 pt-32 md:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <span className="flex items-center gap-3 text-primary-yellow font-black uppercase tracking-[0.4em] text-sm mb-6">
              <div className="w-10 h-1 bg-primary-yellow rounded" />
              Impact in Action
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter uppercase grayscale-[50%] brightness-[120%]">
              Our <span className="text-primary-green">Programs.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
              We deliver holistic, sustainable development models across four
              core pillars designed to uplift the people of Malawi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Grid - One Per Column */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-16 max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
                <p className="text-blue-900 font-black uppercase tracking-widest text-xs">
                  Loading Initiatives...
                </p>
              </div>
            ) : programs.length > 0 ? (
              programs.map((program, i) => {
                const Icon = ICON_MAP[program.icon] || Layers;
                return (
                  <motion.div
                    key={program._id || i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full border border-gray-100/50 ${
                      i % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image Section */}
                    <div className="md:w-1/2 relative overflow-hidden h-[300px] sm:h-[400px] md:h-auto">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className={`absolute top-8 left-8 w-20 h-20 ${
                          program.color || "bg-blue-600"
                        } rounded-3xl flex items-center justify-center shadow-2xl text-white backdrop-blur-sm`}
                      >
                        <Icon className="w-10 h-10" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                      <span className="text-primary-green font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                        Direct Impact Initiative
                      </span>
                      <h3 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 leading-tight tracking-tighter">
                        {program.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed mb-10 text-lg">
                        {program.shortDesc}
                      </p>
                      <Link
                        to={`/programs/${program.slug}`}
                        className={`inline-flex items-center justify-between gap-4 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-xl group/btn overflow-hidden relative ${
                          i % 2 === 0
                            ? "bg-blue-900 text-white hover:bg-primary-green hover:shadow-primary-green/20"
                            : "bg-primary-green text-white hover:bg-blue-900 hover:shadow-blue-900/20"
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          Explore More{" "}
                          <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-black text-blue-900 uppercase">
                  No programs launched yet.
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Philosophy / How we work */}
      <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-green/5 blur-3xl rounded-full" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">
              How we <span className="text-primary-yellow">Drive Change</span>
            </h2>
            <p className="text-white/60 text-lg">
              Our approach is community-led and youth-driven, ensuring that
              every program remains relevant, sustainable, and impactful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: "Focused Impact",
                desc: "We prioritize interventions that address the most critical needs in rural and peri-urban areas.",
              },
              {
                icon: Users,
                title: "Youth Leadership",
                desc: "All our programs are designed and led by young people who understand the local context intimately.",
              },
              {
                icon: Sprout,
                title: "Sustainability",
                desc: "We don't just solve problems for today; we build systems that endure for generations.",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto border border-white/20">
                  <item.icon className="w-8 h-8 text-primary-yellow" />
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-blue-900 mb-8 uppercase tracking-widest">
            Ready to Partner?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            Join Mthunzi Trust in expanding these programs to reach more
            communities across Malawi.
          </p>
          <button className="bg-primary-green text-white px-12 py-5 rounded-2xl font-black shadow-2xl shadow-primary-green/20 hover:bg-blue-900 transition-all uppercase tracking-widest text-sm">
            Support a Program
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Programs;
