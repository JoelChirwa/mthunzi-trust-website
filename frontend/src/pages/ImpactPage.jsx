import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  TreePine,
  School,
  Heart,
  TrendingUp,
  MapPin,
  Award,
  ExternalLink,
  CheckCircle,
  Globe,
  Lightbulb,
  Sprout,
  Handshake,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../utils/api";

const ImpactPage = () => {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [voices, setVoices] = useState([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
    fetchVoices();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const response = await fetch(getApiUrl("/projects?featured=true"));
      const data = await response.json();
      // Limit to 4 featured projects for the preview
      setFeaturedProjects(data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching featured projects:", error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const fetchVoices = async () => {
    try {
      setIsLoadingVoices(true);
      const response = await fetch(getApiUrl("/voices?featured=true"));
      const data = await response.json();
      setVoices(data.slice(0, 3)); // Limit to 3 for impact page
    } catch (error) {
      console.error("Error fetching voices:", error);
    } finally {
      setIsLoadingVoices(false);
    }
  };

  // Key Impact Metrics - Clear and measurable
  const impactMetrics = [
    {
      icon: Users,
      value: "2,000+",
      label: "Young People Reached",
      subtitle: "Across all programs",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TreePine,
      value: "500+",
      label: "Trees Planted",
      subtitle: "Environmental restoration",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: School,
      value: "25+",
      label: "Schools Partnered",
      subtitle: "Educational outreach",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Heart,
      value: "1,500+",
      label: "Health Beneficiaries",
      subtitle: "SRHR education",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: Lightbulb,
      value: "300+",
      label: "Entrepreneurs Trained",
      subtitle: "Business skills development",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: MapPin,
      value: "5",
      label: "Countries Active",
      subtitle: "Regional impact",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  // Impact Videos (YouTube Embeds)
  const impactVideos = [
    {
      id: "video1",
      title: "Mthunzi awards best Essay Writers",
      youtubeId: "dQw4w9WgXcQ", // Placeholder
    },
    {
      id: "video2",
      title: "Sustainable Agriculture Success",
      youtubeId: "dQw4w9WgXcQ", // Placeholder
    },
    {
      id: "video3",
      title: "Youth Empowerment Stories",
      youtubeId: "dQw4w9WgXcQ", // Placeholder
    },
  ];

  // SDG Alignment
  const sdgGoals = [
    { number: 3, title: "Good Health and Well-being", color: "bg-green-500" },
    { number: 4, title: "Quality Education", color: "bg-red-500" },
    {
      number: 8,
      title: "Decent Work and Economic Growth",
      color: "bg-red-700",
    },
    { number: 13, title: "Climate Action", color: "bg-green-700" },
    { number: 15, title: "Life on Land", color: "bg-lime-600" },
    { number: 17, title: "Partnerships for the Goals", color: "bg-blue-700" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-start overflow-hidden bg-primary-green border-b-4 border-primary-yellow">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80"
            alt="Impact Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-green via-primary-green/60 to-primary-blue/80 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </motion.div>

        {/* Decorative Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none z-20"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 z-30 relative pt-32 md:pt-48 pb-12 md:pb-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none uppercase">
                Our <span className="text-primary-yellow">Impact</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/95 leading-relaxed max-w-2xl font-light mb-8">
                Our impact reflects our commitment to turning donor/partners
                support into lasting change in lives and communities across
                Malawi.
              </p>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-5 h-5 text-primary-yellow" />
                <span className="text-sm md:text-base">
                  Transparent · Accountable · Data-Driven
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our transformative initiatives making a real difference
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {isLoadingProjects ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-primary-green animate-spin" />
                <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                  Fetching Impact Stories...
                </p>
              </div>
            ) : featuredProjects.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-wider text-gray-700">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                          {project.title}
                        </h3>

                        <button
                          onClick={() => navigate(`/impact/${project.slug}`)}
                          className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-black"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 text-center">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => navigate("/impact/projects")}
                    className="inline-flex items-center gap-3 bg-primary-green text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary-green/20 hover:bg-blue-900 transition-all transform hover:-translate-y-1"
                  >
                    See All Projects
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic">
                  No featured projects found at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-green to-primary-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Voices from the Community
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                Hear directly from those whose lives have been transformed
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {isLoadingVoices ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
                <p className="text-white/50 text-sm font-medium uppercase tracking-widest text-center">
                  Loading Community Stories...
                </p>
              </div>
            ) : voices.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {voices.map((voice, index) => (
                  <motion.div
                    key={voice._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 group hover:bg-white/10 transition-all"
                  >
                    <div className="aspect-video relative">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${voice.youtubeId}`}
                        title={voice.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white text-center line-clamp-2">
                        {voice.title}
                      </h3>
                      {voice.speaker && (
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest text-center mt-2 group-hover:text-primary-green transition-colors">
                          Story by {voice.speaker}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-3xl border border-dashed border-white/20">
                <p className="text-white/50 font-medium italic">
                  No community voices shared yet. Support us to reach more
                  lives!
                </p>
              </div>
            )}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate("/impact/voices")}
              className="inline-flex items-center gap-2 bg-white text-primary-green px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-yellow hover:text-gray-900 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              See More Voices
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Aligned with Global Goals
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our work directly contributes to the UN Sustainable Development
                Goals
              </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {sdgGoals.map((goal, index) => (
                <motion.div
                  key={goal.number}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`${goal.color} rounded-xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                >
                  <div className="text-4xl md:text-5xl font-black mb-3">
                    {goal.number}
                  </div>
                  <div className="text-sm md:text-base font-semibold leading-tight">
                    {goal.title}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href="https://sdgs.un.org/goals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-green hover:text-primary-blue transition-colors font-semibold"
              >
                <Globe className="w-5 h-5" />
                Learn more about the SDGs
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics - By The Numbers */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Impact By The Numbers
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Quantifiable results demonstrating our commitment to sustainable
                development
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {impactMetrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`${metric.bgColor} rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-xl`}
                >
                  <div
                    className={`inline-flex p-4 rounded-full ${metric.color} bg-white mb-4`}
                  >
                    <MetricIcon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm md:text-base font-bold text-gray-700 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {metric.subtitle}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-green via-primary-blue to-primary-green">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Be Part of Our Impact Story
            </h2>
            <p className="text-lg md:text-xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your support enables us to expand our programs, reach more
              communities, and create lasting change across Malawi and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="bg-primary-yellow text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Partner With Us
              </button>
              <button
                onClick={() => navigate("/programs")}
                className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all backdrop-blur-sm border-2 border-white/30"
              >
                Explore Our Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ImpactPage;
