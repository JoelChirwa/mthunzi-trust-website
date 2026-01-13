import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Target,
  Users,
  Sprout,
  ShieldCheck,
  ChevronRight,
  Loader2,
  GraduationCap,
  Leaf,
  Briefcase,
  HeartPulse,
  Layers,
} from "lucide-react";

const ICON_MAP = {
  GraduationCap,
  Leaf,
  Briefcase,
  HeartPulse,
  Layers,
};

const SingleProgramPage = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [otherPrograms, setOtherPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProgram();
    fetchOtherPrograms();
  }, [slug]);

  const fetchProgram = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
          /\/api$/,
          ""
        )}/api/programs/${slug}`
      );
      const data = await response.json();
      if (response.ok) {
        setProgram(data);
      }
    } catch (error) {
      console.error("Error fetching program:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOtherPrograms = async () => {
    try {
      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
          /\/api$/,
          ""
        )}/api/programs`
      );
      const data = await response.json();
      setOtherPrograms(data.filter((p) => p.slug !== slug).slice(0, 3));
    } catch (error) {
      console.error("Error fetching other programs:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 gap-4">
        <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
        <p className="text-blue-900 font-black uppercase tracking-widest text-xs">
          Loading Program Details...
        </p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
            Initiative Not Found
          </h1>
          <Link
            to="/programs"
            className="text-primary-green font-bold flex items-center gap-2 justify-center uppercase tracking-widest text-sm"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  const Icon = ICON_MAP[program.icon] || Layers;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      {/* Cinematic Hero */}
      <section className="relative h-[75vh] flex items-center overflow-hidden bg-blue-900">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent z-10" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-white/70 hover:text-primary-yellow mb-8 transition-colors font-bold uppercase tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Programs
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`p-3 rounded-xl ${
                  program.color || "bg-blue-600"
                } text-white shadow-xl`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-primary-yellow font-black uppercase tracking-[0.3em] text-[10px]">
                Sustainable Development Goal Alignment
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-0 tracking-tighter uppercase grayscale-[30%] brightness-[110%]">
              {program.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Detailed Description */}
            <div className="lg:w-2/3">
              <div
                className="prose prose-xl prose-blue max-w-none text-gray-600 leading-relaxed space-y-8"
                dangerouslySetInnerHTML={{ __html: program.description }}
              />

              <div className="mt-16 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-full bg-primary-green/10 flex items-center justify-center text-primary-green flex-shrink-0">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-blue-900 mb-2 uppercase tracking-tight">
                    Our Commitment
                  </h4>
                  <p className="text-gray-500">
                    We ensure that 100% of resources allocated to this program
                    directly benefit the local communities in Malawi through
                    transparent and youth-led management.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar / Quick Actions */}
            <aside className="lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                {/* Get Involved Card */}
                <div className="bg-blue-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-6 leading-tight uppercase tracking-tighter">
                      Support this <br />
                      <span className="text-primary-green">Program</span>
                    </h3>
                    <p className="text-white/60 mb-8 leading-relaxed">
                      Your contribution directly funds scholarships, training,
                      and community resources in Malawi.
                    </p>
                    <button className="w-full bg-primary-yellow text-blue-900 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-xl">
                      Donate Now
                    </button>
                    <button className="w-full mt-4 bg-white/10 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all border border-white/10">
                      Partner with us
                    </button>
                  </div>
                  {/* Decorative background circle */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </div>

                {/* Other Programs Navigation */}
                <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100">
                  <h4 className="text-xl font-black text-blue-900 mb-8 uppercase tracking-widest flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary-green rounded-full" />
                    Other Programs
                  </h4>
                  <div className="space-y-6">
                    {otherPrograms.map((other) => {
                      const OtherIcon = ICON_MAP[other.icon] || Layers;
                      return (
                        <Link
                          key={other._id}
                          to={`/programs/${other.slug}`}
                          className="group block"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl ${
                                other.color || "bg-blue-600"
                              } flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                            >
                              <OtherIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <h5 className="font-black text-blue-900 group-hover:text-primary-green transition-colors leading-tight text-sm">
                                {other.title}
                              </h5>
                              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                Learn More
                              </span>
                            </div>
                            <ChevronRight className="w-5 h-5 ml-auto text-gray-300 group-hover:text-primary-green transition-all group-hover:translate-x-1" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SingleProgramPage;
