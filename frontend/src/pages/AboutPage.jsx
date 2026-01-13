import React, { useEffect } from "react";
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
} from "lucide-react";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const teamMembers = [
    {
      name: "Symon Satiele",
      role: "Program Director",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
      social: { linkedin: "#", mail: "mailto:info@mthunzi.org" },
    },
    {
      name: "Godfrey Jidiga",
      role: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
      social: { linkedin: "#", mail: "mailto:info@mthunzi.org" },
    },
    {
      name: "Phillemon Banda",
      role: "Advocacy Lead",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
      social: { linkedin: "#", mail: "mailto:info@mthunzi.org" },
    },
    {
      name: "Ntchindi Tchongwe",
      role: "Field Coordinator",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=fit&q=60",
      social: { linkedin: "#", mail: "mailto:info@mthunzi.org" },
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
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-blue-900">
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

        <div className="container mx-auto px-4 relative z-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter">
              The umbrella <br />
              <span className="text-primary-green">of Hope.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
              Registered Youth-led Non-profit Organization dedicated to holistic
              and sustainable development in Malawi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-12 bg-white relative z-30">
        <div className="container mx-auto px-4">
          <div className="bg-white -mt-24 rounded-[3rem] shadow-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">
                  Established
                </p>
                <p className="text-blue-900 font-black">20 January 2021</p>
                <p className="text-gray-500 text-xs leading-none mt-1">
                  (Registered June 2023)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">
                  Locations
                </p>
                <p className="text-blue-900 font-black">Lilongwe & Blantyre</p>
                <p className="text-gray-500 text-xs mt-1">Malawi, Africa</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary-yellow/10 flex items-center justify-center text-primary-yellow">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">
                  Legal Status
                </p>
                <p className="text-blue-900 font-black">Registered Trust</p>
                <p className="text-gray-500 text-xs mt-1">
                  Youth-led Non-profit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-4 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-primary-green">
                <Eye className="w-8 h-8" />
                <h2 className="text-4xl font-black uppercase tracking-widest">
                  Our Vision
                </h2>
              </div>
              <p className="text-3xl font-black text-blue-900 leading-tight">
                "A thrives Malawi where{" "}
                <span className="text-primary-green">empowered youth lead</span>{" "}
                in sustainable development and environmental protection."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-primary-yellow">
                <Target className="w-8 h-8" />
                <h2 className="text-4xl font-black uppercase tracking-widest">
                  Our Mission
                </h2>
              </div>
              <p className="text-3xl font-black text-blue-900 leading-tight">
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
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
              Our Core <span className="text-primary-green">Values</span>
            </h2>
            <div className="w-24 h-2 bg-primary-green mx-auto rounded-full mb-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 hover:shadow-primary-green/10 transition-all border border-gray-100 flex flex-col items-center text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-current/20`}
                >
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-blue-900 mb-4 uppercase tracking-wider">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-24 bg-blue-900 relative overflow-hidden">
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
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
              Who We <span className="text-primary-yellow">Target</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 text-center hover:bg-white/10 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-primary-green mx-auto flex items-center justify-center text-white mb-8 shadow-2xl shadow-primary-green/30">
                  <group.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">
                  {group.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{group.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-1 bg-primary-green rounded" />
              <span className="text-primary-green font-black uppercase tracking-[0.3em] text-sm">
                Our Leadership
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
              Meet our <span className="text-primary-green">Team</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Dedicated professionals working tirelessly to provide the umbrella
              of hope for the youth of Malawi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
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
                    <button className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center hover:bg-primary-yellow transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <a
                      href={member.social.mail}
                      className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center hover:bg-primary-yellow transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
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
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
