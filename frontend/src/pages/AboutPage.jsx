import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Shield,
  Users,
  Heart,
  Globe,
  Award,
  MapPin,
  Calendar,
  Lightbulb,
  Handshake,
  Scale,
  School,
  Linkedin,
  Mail,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { getApiUrl } from "../utils/api";

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [achievementsLoading, setAchievementsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTeamMembers();
    fetchAchievements();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/team"));

      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAchievements = async () => {
    try {
      setAchievementsLoading(true);
      const response = await fetch(getApiUrl("/achievements"));
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setAchievementsLoading(false);
    }
  };

  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      desc: "We maintain transparency and accountability in all our actions, ensuring trust is the foundation of our work.",
      color: "bg-blue-500",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      desc: "We believe in the power of partnerships with communities, government, and stakeholders to achieve shared goals.",
      color: "bg-primary-green",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "We strive for creative and sustainable solutions to complex community challenges in an ever-changing world.",
      color: "bg-primary-yellow",
    },
    {
      icon: Heart,
      title: "Empowerment",
      desc: "We focus on enabling individuals to make informed and impactful decisions for their lives and communities.",
      color: "bg-red-500",
    },
    {
      icon: Scale,
      title: "Equity",
      desc: "We advocate for fairness and equal access to opportunities for all, regardless of background or status.",
      color: "bg-purple-500",
    },
  ];

  const targetGroups = [
    {
      icon: Globe,
      title: "Rural & Peri-urban Communities",
      content:
        "Reaching underserved areas in Malawi where development intervention is most critical.",
    },
    {
      icon: Users,
      title: "Youth & Women Groups",
      content:
        "Empowering the backbone of our society through specialized programs and resources.",
    },
    {
      icon: School,
      title: "Schools & Faith-based Institutions",
      content:
        "Partnering with established social pillars to foster education and moral guidance.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      {/* Cinematic Hero */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-start overflow-hidden bg-blue-900">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80"
            alt="Mthunzi Trust"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 pt-24 md:pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter">
              The umbrella <br />
              <span className="text-primary-green">of Hope.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-2xl font-light leading-relaxed mb-12">
              Registered Youth-led Non-profit Organization dedicated to holistic
              and sustainable development in Malawi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-12 bg-white relative z-30">
        <div className="container mx-auto px-4">
          <div className="bg-white -mt-24 rounded-3xl md:rounded-[3rem] shadow-2xl p-6 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green">
                <Calendar className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
                  Established
                </p>
                <p className="text-blue-900 font-black text-sm md:text-base">
                  20 January 2021
                </p>
                <p className="text-gray-500 text-[10px] leading-none mt-1">
                  (Registered June 2023)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <MapPin className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
                  Locations
                </p>
                <p className="text-blue-900 font-black text-sm md:text-base">
                  Lilongwe & Blantyre
                </p>
                <p className="text-gray-500 text-[10px] mt-1">Malawi, Africa</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-yellow/10 flex items-center justify-center text-primary-yellow">
                <Award className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
                  Legal Status
                </p>
                <p className="text-blue-900 font-black text-sm md:text-base">
                  Registered Trust
                </p>
                <p className="text-gray-500 text-[10px] mt-1">
                  Youth-led Non-profit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <div className="flex items-center gap-4 text-primary-green">
                <Eye className="w-7 h-7 md:w-8 md:h-8" />
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest">
                  Our Vision
                </h2>
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-black text-blue-900 leading-tight">
                "A thrives Malawi where{" "}
                <span className="text-primary-green">empowered youth lead</span>{" "}
                in sustainable development and environmental protection."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <div className="flex items-center gap-4 text-primary-yellow">
                <Target className="w-7 h-7 md:w-8 md:h-8" />
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest">
                  Our Mission
                </h2>
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-black text-blue-900 leading-tight">
                To{" "}
                <span className="text-primary-yellow">
                  empower youth and communities
                </span>{" "}
                through holistic and sustainable development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
              Our Core <span className="text-primary-green">Values</span>
            </h2>
            <div className="w-20 md:w-24 h-2 bg-primary-green mx-auto rounded-full mb-8" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-blue-900/5 hover:shadow-primary-green/10 transition-all border border-gray-100 flex flex-col items-center text-center col-span-1 last:col-span-2 lg:last:col-span-1"
              >
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${value.color} flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg shadow-current/20`}
                >
                  <value.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-base md:text-xl font-black text-blue-900 mb-3 md:mb-4 uppercase tracking-wider">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed line-clamp-3">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-20 md:py-24 bg-blue-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
              Who We <span className="text-primary-yellow">Target</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
            {targetGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 backdrop-blur-xl p-8 lg:p-10 rounded-3xl lg:rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary-green mx-auto md:mx-0 flex items-center justify-center text-white mb-6 lg:mb-8 shadow-2xl shadow-primary-green/30">
                  <group.icon className="w-8 h-8 lg:w-10 lg:h-10" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-white mb-4 uppercase tracking-tight">
                  {group.title}
                </h3>
                <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                  {group.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-1 bg-primary-yellow rounded" />
              <span className="text-primary-yellow font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                Our Milestones
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
              Achievements &{" "}
              <span className="text-primary-yellow">Recognition</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium">
              Celebrating the impact we've made together in building a better
              future for Malawi
            </p>
          </div>

          {achievementsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 text-primary-yellow animate-spin" />
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
                Loading achievements...
              </p>
            </div>
          ) : achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.slice(0, 6).map((achievement, i) => (
                <motion.div
                  key={achievement._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-lg shadow-blue-900/5 hover:shadow-2xl hover:shadow-primary-yellow/20 transition-all duration-500"
                >
                  {/* Image */}
                  {achievement.images && achievement.images.length > 0 && (
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-900 to-primary-green">
                      <img
                        src={achievement.images[0]}
                        alt={achievement.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8">
                    {/* Category */}
                    <span className="inline-block px-3 py-1 bg-primary-green/10 text-primary-green text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">
                      {achievement.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-black text-blue-900 mb-4 leading-tight group-hover:text-primary-yellow transition-colors">
                      {achievement.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {achievement.description}
                    </p>

                    {/* Learn More Button */}
                    <Link
                      to={`/achievements/${achievement.slug}`}
                      className="inline-flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-widest hover:text-primary-yellow transition-colors group"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Featured Badge */}
                  {achievement.featured && (
                    <div className="absolute top-6 left-6 px-3 py-1.5 bg-blue-900 text-white text-[8px] font-black uppercase rounded-xl shadow-xl flex items-center gap-2">
                      <Award className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                More achievements coming soon
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-1 bg-primary-green rounded" />
              <span className="text-primary-green font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                Our Leadership
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
              Meet our <span className="text-primary-green">Team</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium">
              Dedicated professionals working tirelessly to provide the umbrella
              of hope for the youth of Malawi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
                  Loading the Umbrella of Hope team...
                </p>
              </div>
            ) : teamMembers.length > 0 ? (
              teamMembers.map((member, i) => (
                <motion.div
                  key={member._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative mb-6 rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-blue-900/10">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Social Tooltip */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center hover:bg-primary-yellow transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={
                            member.email.startsWith("mailto:")
                              ? member.email
                              : `mailto:${member.email}`
                          }
                          className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center hover:bg-primary-yellow transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-blue-900 group-hover:text-primary-green transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary-green font-bold uppercase tracking-widest text-xs mt-1">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 font-bold">
                  No team members listed yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
