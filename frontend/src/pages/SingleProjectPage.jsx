import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Target,
  CheckCircle,
  Share2,
  Download,
  ExternalLink,
} from "lucide-react";

const SingleProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  // Complete project data
  const projectsData = [
    {
      id: 1,
      slug: "chimwasongwe-tree-planting",
      title: "Chimwasongwe Primary School Tree Planting",
      shortDescription:
        "Planted 100 fruit trees creating a sustainable learning environment and food security for over 400 students.",
      fullDescription:
        "In partnership with Chimwasongwe Primary School in Lilongwe, Mthunzi Trust implemented a comprehensive tree planting initiative that goes beyond simple environmental conservation. This project represents our commitment to creating sustainable ecosystems that benefit both the environment and local communities. By planting 100 carefully selected fruit trees on the school grounds, we've created a living laboratory for environmental education while simultaneously addressing food security challenges faced by students and their families.",
      location: "Chimwasongwe Primary School, Lilongwe, Malawi",
      category: "Environment",
      year: "2024",
      date: "March - June 2024",
      heroImage:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&auto=format&fit=crop&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1473654729523-203e25dfda10?w=800&auto=format&fit=crop&q=80",
      ],
      beneficiaries: "400+",
      duration: "4 months",
      partner: "Chimwasongwe Primary School",
      outcomes: [
        "100 fruit trees (mango, avocado, and guava) planted and maintained",
        "400+ students benefiting from improved school environment",
        "Enhanced school nutrition through fruit provision",
        "Climate education integrated into school curriculum",
        "Community engagement workshops conducted",
        "Environmental awareness significantly increased",
        "Long-term food security strategy established",
      ],
      impact: {
        environmental: [
          "Improved air quality within the school compound",
          "Increased biodiversity and habitat for local wildlife",
          "Reduction in soil erosion",
          "Carbon sequestration contributing to climate action",
        ],
        educational: [
          "Students learning about environmental stewardship",
          "Practical lessons in agriculture and sustainability",
          "Increased environmental consciousness among youth",
        ],
        social: [
          "Enhanced school grounds creating better learning environment",
          "Community pride and involvement in school development",
          "Improved student health through access to fresh fruit",
        ],
      },
      challenges: [
        "Initial water availability for young trees during dry season",
        "Need for ongoing maintenance and care protocols",
        "Educating community about long-term benefits",
      ],
      solutions: [
        "Implemented rainwater harvesting system",
        "Established student-led tree care committee",
        "Conducted community workshops on environmental benefits",
      ],
      futureGoals: [
        "Expand to 5 additional schools in the district by 2025",
        "Establish tree nursery on school grounds",
        "Create environmental education curriculum module",
      ],
    },
    {
      id: 2,
      slug: "regional-srhr-advocacy",
      title: "Regional SRHR Youth Advocacy",
      shortDescription:
        "Successfully advocated for improved youth access to sexual and reproductive health services across Southern Africa.",
      fullDescription:
        "Mthunzi Trust led a groundbreaking regional advocacy initiative spanning four Southern African countries to improve youth access to sexual and reproductive health and rights (SRHR) services. This multi-country project brought together young advocates, health professionals, and policymakers to address the critical gaps in youth-friendly health services across the region.",
      location: "Malawi, Zambia, Zimbabwe, Botswana",
      category: "Health",
      year: "2023-2024",
      date: "June 2023 - May 2024",
      heroImage:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&auto=format&fit=crop&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80",
      ],
      beneficiaries: "1,500+",
      duration: "12 months",
      partner: "Regional Health Ministries, Youth Networks",
      outcomes: [
        "4 countries engaged in comprehensive SRHR advocacy efforts",
        "Regional policy influence on youth-friendly health services",
        "1,500+ youth reached with health education and information",
        "Partnerships established with 4 national health ministries",
        "Youth advocate network of 50+ members established",
        "National SRHR policies influenced in 2 countries",
        "Ongoing mentorship program created",
      ],
      impact: {
        health: [
          "Improved access to contraception for young people",
          "Reduced stigma around youth SRHR services",
          "Increased awareness of reproductive health rights",
          "Better informed youth making healthier choices",
        ],
        policy: [
          "Youth-friendly service guidelines adopted",
          "Age-appropriate health education mandated",
          "Reduced barriers to confidential services",
        ],
        capacity: [
          "50+ youth advocates trained",
          "Regional network for knowledge sharing established",
          "Sustainable advocacy infrastructure created",
        ],
      },
      challenges: [
        "Cultural sensitivities around youth and sexual health",
        "Varying policy environments across countries",
        "Limited resources for sustained advocacy",
      ],
      solutions: [
        "Culturally sensitive communication strategies",
        "Country-specific advocacy approaches",
        "Built partnerships for resource mobilization",
      ],
      futureGoals: [
        "Expand to 3 additional countries in East Africa",
        "Develop online SRHR education platform",
        "Establish youth-led SRHR clinics",
      ],
    },
    {
      id: 3,
      slug: "youth-entrepreneurship-program",
      title: "Youth Entrepreneurship Program",
      shortDescription:
        "Trained over 300 young people in business skills, resulting in the creation of 50+ small businesses.",
      fullDescription:
        "Recognizing that economic empowerment is fundamental to youth development, Mthunzi Trust launched a comprehensive entrepreneurship program targeting young people in Lilongwe and Blantyre. This intensive training program equips youth with practical business skills, financial literacy, and mentorship support needed to launch and sustain their own enterprises.",
      location: "Lilongwe & Blantyre, Malawi",
      category: "Entrepreneurship",
      year: "2023-2024",
      date: "January 2023 - December 2024",
      heroImage:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&auto=format&fit=crop&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=80",
      ],
      beneficiaries: "300+",
      duration: "24 months",
      partner: "Local Business Community, Microfinance Institutions",
      outcomes: [
        "300+ youth trained in comprehensive business skills",
        "50+ new small businesses successfully launched",
        "Economic empowerment and sustainable job creation",
        "Ongoing mentorship and support provided",
        "15+ businesses still operational after 12 months",
        "Average monthly income increased by 60%",
        "Business network established for peer support",
      ],
      impact: {
        economic: [
          "50+ jobs created through new businesses",
          "Increased household incomes for participants",
          "Local economic activity stimulated",
          "Skills transferable to formal employment",
        ],
        social: [
          "Increased confidence and self-efficacy",
          "Improved financial decision-making",
          "Role models for other youth created",
        ],
        sustainability: [
          "15+ businesses operational beyond 1 year",
          "Mentorship network established",
          "Ongoing support structure in place",
        ],
      },
      challenges: [
        "Access to startup capital for graduates",
        "Market competition from established businesses",
        "Limited business management experience",
      ],
      solutions: [
        "Partnerships with microfinance institutions",
        "Market research and niche identification training",
        "Extended mentorship and coaching support",
      ],
      futureGoals: [
        "Train 500 additional youth by 2026",
        "Establish business incubation hub",
        "Create access to seed funding program",
      ],
    },
    {
      id: 4,
      slug: "waste-management-initiative",
      title: "Waste Management & Environmental Education",
      shortDescription:
        "Reduced pollution by 40% through community-based waste management training and environmental education.",
      fullDescription:
        "In response to growing environmental challenges at Chikuli Trading Center, Mthunzi Trust implemented a comprehensive waste management and environmental education initiative. This project combined practical waste management training with environmental awareness campaigns to create lasting behavioral change in the community.",
      location: "Chikuli Trading Center, Malawi",
      category: "Environment",
      year: "2024",
      date: "April - October 2024",
      heroImage:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&auto=format&fit=crop&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542601098-3adb3b831c18?w=800&auto=format&fit=crop&q=80",
      ],
      beneficiaries: "2,000+",
      duration: "7 months",
      partner: "Local Government, Community Leaders",
      outcomes: [
        "40% reduction in visible pollution in the trading center",
        "Community-wide training on waste management practices",
        "Cleaner, healthier environment for 2,000+ residents",
        "Sustainable waste collection system established",
        "Environmental awareness increased by 65%",
        "Youth volunteer waste management team created",
        "Recycling initiative generating income for 10 families",
      ],
      impact: {
        environmental: [
          "Reduced plastic pollution in waterways",
          "Improved sanitation and public health",
          "Cleaner public spaces",
          "Foundation for sustainable waste practices",
        ],
        health: [
          "Reduced disease vectors from waste",
          "Improved air quality",
          "Safer environment for children",
        ],
        economic: [
          "Recycling creating income opportunities",
          "Reduced cleanup costs for local government",
          "Improved business environment",
        ],
      },
      challenges: [
        "Changing long-standing waste disposal habits",
        "Limited infrastructure for waste collection",
        "Need for ongoing maintenance and monitoring",
      ],
      solutions: [
        "Community-led education campaigns",
        "Simple, locally appropriate waste systems",
        "Youth volunteer sustainability team",
      ],
      futureGoals: [
        "Expand to 3 additional trading centers",
        "Establish composting and recycling enterprise",
        "Create environmental education curriculum",
      ],
    },
  ];

  useEffect(() => {
    const foundProject = projectsData.find((p) => p.slug === slug);
    if (foundProject) {
      setProject(foundProject);
      window.scrollTo(0, 0);
    } else {
      navigate("/impact");
    }
  }, [slug, navigate]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-end overflow-hidden bg-gray-900">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>

        {/* Back and Share Buttons */}
        <div className="absolute top-20 md:top-24 left-0 right-0 z-30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate("/impact")}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden md:inline">Back to Impact</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden md:inline">Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 z-20 relative pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary-yellow rounded-full text-xs font-bold text-gray-900">
                {project.category}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30">
                {project.year}
              </span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-white mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl">
              {project.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-8 md:py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Location</div>
                <div className="font-semibold text-gray-900">
                  {project.location}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Date</div>
                <div className="font-semibold text-gray-900">
                  {project.date}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Beneficiaries</div>
                <div className="font-semibold text-gray-900">
                  {project.beneficiaries} people
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Duration</div>
                <div className="font-semibold text-gray-900">
                  {project.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About This Project
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {project.fullDescription}
            </p>

            {project.partner && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="text-sm text-gray-500 mb-2">
                  Partner Organization
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.partner}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Measurable Outcomes */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-primary-green" />
              Measurable Outcomes
            </h2>
            <ul className="space-y-4">
              {project.outcomes.map((outcome, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{outcome}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Project Impact */}
      {project.impact && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                Project Impact
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(project.impact).map(([category, items]) => (
                  <div key={category} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                      {category}
                    </h3>
                    <ul className="space-y-3">
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 text-primary-green flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                Project Gallery
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {project.challenges && project.solutions && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Challenges Faced
                  </h3>
                  <ul className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Solutions Implemented
                  </h3>
                  <ul className="space-y-4">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Future Goals */}
      {project.futureGoals && (
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary-green to-primary-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Looking Forward
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {project.futureGoals.map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                  >
                    <p className="text-white leading-relaxed">{goal}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Support Projects Like This
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your support enables us to continue creating transformative impact
              in communities across Malawi and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary-yellow text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl"
              >
                Partner With Us
              </Link>
              <Link
                to="/impact"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SingleProjectPage;
