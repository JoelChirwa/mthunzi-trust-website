import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  Target,
  Coffee,
  GraduationCap,
  ArrowRight,
  Mail,
  Search,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import SEO from "../components/SEO";

const CareersPage = () => {
  const [openPositions, setOpenPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs`
      );
      const data = await response.json();
      setOpenPositions(data.filter((job) => job.status === "Open"));
    } catch (error) {
      console.error("Error fetching jobs:", error);
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
      <SEO
        title="Careers & Volunteering"
        description="Join the movement at Mthunzi Trust. Explore career and volunteering opportunities to build a better Malawi through sustainable development."
        keywords="careers Malawi, NGO jobs Malawi, volunteering Malawi, work at Mthunzi Trust"
        url="/careers"
      />
      {/* Cinematic Hero */}
      <section className="relative min-h-[40vh] md:min-h-[70vh] flex items-start overflow-hidden bg-blue-900">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80"
            alt="Careers Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/60 to-transparent z-10" />
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
              Join the Movement
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter uppercase grayscale-[30%] brightness-[120%]">
              Grow with <span className="text-primary-green">Us.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
              Build your career while building a better Malawi. We're looking
              for passionate individuals to join our mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
              Open <span className="text-primary-green">Positions</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Explore our current opportunities and find the role that fits your
              skills and passion.
            </p>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[4rem] border border-gray-100 shadow-xl">
                <Loader2 className="w-16 h-16 text-primary-green animate-spin mb-4" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
                  Hunting for roles...
                </p>
              </div>
            ) : openPositions.length > 0 ? (
              openPositions.map((job, i) => (
                <Link key={i} to={`/careers/${job.slug}`} className="block">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white p-8 md:p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border border-gray-100 flex flex-col md:flex-row items-center gap-8"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:bg-blue-900 group-hover:text-white transition-all`}
                    >
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-2xl font-black text-blue-900 mb-2 uppercase tracking-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-400 text-sm font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs group-hover:bg-primary-green transition-all shadow-xl flex items-center gap-3">
                      View Job <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[4rem] border-2 border-dashed border-gray-200">
                <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-blue-900 mb-2">
                  No Open Roles Right Now
                </h3>
                <p className="text-gray-400">
                  But we are always looking for fresh talent! Send us your CV.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CareersPage;
