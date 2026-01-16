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
  ChevronDown,
  CheckCircle,
  FileText,
} from "lucide-react";
import { getApiUrl } from "../utils/api";
import { useSettings } from "../context/SettingsContext";
import SEO from "../components/SEO";

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { settings } = useSettings();

  const [openValueIndex, setOpenValueIndex] = useState(null);
  const [openTargetIndex, setOpenTargetIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTeamMembers();
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
    {
      icon: CheckCircle,
      title: "Accountability",
      desc: "We take responsibility for our actions and outcomes, continuously measuring our impact to ensure we deliver on our promises.",
      color: "bg-teal-500",
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
      title: "Youth, Women & People with Disabilities",
      content:
        "Empowering the backbone of our society through inclusive programs, specialized resources, and dedicated advocacy for persons with disabilities.",
    },
    {
      icon: School,
      title: "Schools, Clubs, Community & Faith-based Organisations",
      content:
        "Partnering with established social pillars and grassroots groups to foster education, leadership, and moral guidance.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      <SEO
        title="About Us"
        description="Learn about Mthunzi Trust, a youth-led non-profit organization in Malawi dedicated to education, sustainability, and community empowerment since 2021."
        keywords="Mthunzi Trust history, youth-led NGO Malawi, Symon Satiele, community development Malawi"
        url="/about"
      />
      {/* Cinematic Hero */}
      <section className="relative min-h-[40vh] md:min-h-[80vh] flex items-start overflow-hidden bg-blue-900">
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
              {settings?.tagline || "The umbrella of Hope."}
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-2xl font-light leading-relaxed mb-12">
              Registered Youth-led Non-profit Organization dedicated to holistic
              and sustainable development in Malawi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-1 bg-primary-green rounded" />
                <span className="text-primary-green font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter leading-none">
                {settings?.organizationName || "Mthunzi Trust"}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                {settings?.organizationName || "Mthunzi Trust"} was founded in
                2021 by visionary youth leader Symon Satiele and formally
                registered in 2023 with the Government of Malawi at the
                Registrar General under the Trustees Incorporation Rules.
                Established as a youth-led, non-profit organization,{" "}
                {settings?.organizationName || "Mthunzi Trust"} exists as an{" "}
                {settings?.tagline || "“Umbrella of Hope”"} for marginalized and
                underserved communities across Malawi, grounded in the belief
                that inclusive, community-driven development is essential for
                building resilient and equitable societies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pt-20"
            >
              <div className="bg-blue-50 p-8 md:p-12 rounded-[2.5rem] relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-yellow/20 rounded-full blur-2xl" />
                <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                  The Trust was created in response to persistent gaps in
                  development processes, where youth, women, persons with
                  disabilities, and other marginalized groups are often excluded
                  or insufficiently engaged.{" "}
                  {settings?.organizationName || "Mthunzi Trust"} recognizes
                  these groups as critical agents of change and works to break
                  systemic barriers to participation, amplify marginalized
                  voices, and enable meaningful involvement in social, economic,
                  environmental, and governance initiatives that shape
                  sustainable development outcomes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Foundation & Objectives Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-950 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-yellow/5 rounded-full blur-[120px] -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-stretch">
            {/* Left Column: Mission, Vision, Legality */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-[45%] flex flex-col"
            >
              <div className="h-full border-2 border-white/20 rounded-[3rem] p-8 md:p-12 background-blur-md bg-white/5 space-y-12">
                {/* Mission */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-yellow/20 flex items-center justify-center text-primary-yellow">
                    <Lightbulb className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3">
                      Our Mission
                    </h3>
                    <p className="text-white/80 leading-relaxed font-medium">
                      To empower youth and communities through education,
                      entrepreneurship, environmental sustainability, and sexual
                      and reproductive health rights (SRHR), fostering holistic
                      and sustainable development in Malawi.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-green/20 flex items-center justify-center text-primary-green">
                    <Eye className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3">
                      Our Vision
                    </h3>
                    <p className="text-white/80 leading-relaxed font-medium">
                      A thriving Malawi where empowered youth lead in
                      sustainable development, economic growth, and
                      environmental protection, achieving healthier, educated,
                      and resilient communities.
                    </p>
                  </div>
                </div>

                {/* Legality */}
                <div className="flex gap-6 pt-4 border-t border-white/10">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center text-blue-300">
                    <FileText className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4">
                      Legality
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3 text-white/70 text-sm md:text-base font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-yellow mt-2 flex-shrink-0" />
                        Registered Youth-led Non-profit Organization (Trust)
                      </li>
                      <li className="flex gap-3 text-white/70 text-sm md:text-base font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-yellow mt-2 flex-shrink-0" />
                        Affiliated with National Youth Council of Malawi - in
                        process
                      </li>
                      <li className="flex gap-3 text-white/70 text-sm md:text-base font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-yellow mt-2 flex-shrink-0" />
                        In-Country Focal Point for the African Youth Adaptation
                        Network
                      </li>
                      <li className="flex gap-3 text-white/70 text-sm md:text-base font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-yellow mt-2 flex-shrink-0" />
                        Member of SDSN-Youth Network
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Specific Objectives */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-[55%] flex flex-col"
            >
              <div className="mb-10">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                  Specific{" "}
                  <span className="text-primary-green">Objectives</span>
                </h2>
                <div className="w-16 h-1 bg-primary-yellow rounded" />
              </div>

              <div className="space-y-8">
                {[
                  "To unlock inclusive, high-quality education by reducing school dropout rates—especially among girls—while strengthening safe water, sanitation, and hygiene in schools and communities.",
                  "To advance environmental sustainability and climate resilience through community-led action, advocacy, education, and equitable stewardship of natural resources.",
                  "To transform youth and women’s livelihoods by strengthening entrepreneurial skills, promoting youth-led economic development, and advancing sustainable agriculture and food security.",
                  "To protect and empower adolescents and young people by expanding access to sexual and reproductive health and rights information and services, reducing early pregnancies, STIs, HIV/AIDS, mental health risks, and gender-based violence.",
                  "To amplify youth and women’s leadership by enabling meaningful participation in decision-making and governance processes that drive accountable, inclusive, and sustainable development.",
                ].map((obj, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 items-start group"
                  >
                    <div className="mt-1 w-6 h-6 rounded-full border border-primary-green/40 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-green transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-yellow group-hover:bg-white" />
                    </div>
                    <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed group-hover:text-white transition-colors">
                      {obj}
                    </p>
                  </motion.div>
                ))}
              </div>
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
            <p className="text-gray-500 text-sm md:text-base">
              Click on each value to learn more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-blue-900/5 hover:shadow-primary-green/10 transition-all border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenValueIndex(openValueIndex === i ? null : i)
                  }
                  className="w-full p-6 md:p-8 flex flex-col items-center text-center cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${value.color} flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}
                  >
                    <value.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-base md:text-xl font-black text-blue-900 mb-3 uppercase tracking-wider">
                    {value.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: openValueIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary-green" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openValueIndex === i ? "auto" : 0,
                    opacity: openValueIndex === i ? 1 : 0,
                  }}
                  transition={{
                    height: { duration: 0.4, ease: "easeInOut" },
                    opacity: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="w-12 h-px bg-gray-200 mx-auto mb-4" />
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
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
            <p className="text-white/70 text-sm md:text-base">
              Click on each group to learn more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {targetGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl lg:rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenTargetIndex(openTargetIndex === i ? null : i)
                  }
                  className="w-full p-8 lg:p-10 text-center cursor-pointer group"
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary-green mx-auto flex items-center justify-center text-white mb-6 lg:mb-8 shadow-2xl shadow-primary-green/30 group-hover:scale-110 transition-transform">
                    <group.icon className="w-8 h-8 lg:w-10 lg:h-10" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-white mb-4 uppercase tracking-tight">
                    {group.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: openTargetIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary-yellow mx-auto" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openTargetIndex === i ? "auto" : 0,
                    opacity: openTargetIndex === i ? 1 : 0,
                  }}
                  transition={{
                    height: { duration: 0.4, ease: "easeInOut" },
                    opacity: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-8 lg:px-10 pb-8 lg:pb-10">
                    <div className="w-12 h-px bg-white/20 mx-auto mb-4" />
                    <p className="text-white/80 text-sm lg:text-base leading-relaxed text-center">
                      {group.content}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
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
                    <p className="text-primary-green font-bold uppercase tracking-widest text-[10px] mt-1">
                      {member.role} {member.position && `• ${member.position}`}
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
