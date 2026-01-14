import React from "react";
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
} from "lucide-react";

const ImpactPage = () => {
  const impactMetrics = [
    {
      icon: TreePine,
      value: "100+",
      label: "Trees Planted",
      color: "text-green-600",
    },
    {
      icon: Users,
      value: "500+",
      label: "Youth Impacted",
      color: "text-blue-600",
    },
    {
      icon: School,
      value: "10+",
      label: "Schools Reached",
      color: "text-yellow-600",
    },
    {
      icon: Heart,
      value: "2000+",
      label: "Health Education",
      color: "text-pink-600",
    },
    {
      icon: Award,
      value: "5+",
      label: "Partnerships",
      color: "text-purple-600",
    },
    { icon: MapPin, value: "2", label: "Cities Active", color: "text-red-600" },
  ];

  const successStories = [
    {
      title: "Chimwasongwe Primary School",
      description:
        "100 fruit trees planted, providing environmental benefits and food security for students.",
      impact: "Improved school environment and nutrition",
      image: "🌳",
      category: "Environment",
    },
    {
      title: "Youth SRHR Advocacy",
      description:
        "Successfully advocated for youth access to sexual reproductive health services across 4 countries.",
      impact: "Regional policy influence",
      image: "❤️",
      category: "Health",
    },
    {
      title: "Entrepreneurship Training",
      description:
        "Trained 300+ youth in business skills, leading to 50+ new small businesses.",
      impact: "Economic empowerment",
      image: "💼",
      category: "Entrepreneurship",
    },
    {
      title: "Waste Management Initiative",
      description:
        "Reduced pollution by 40% in Chikuli Trading Center through community training.",
      impact: "Cleaner community",
      image: "♻️",
      category: "Environment",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-start overflow-hidden bg-blue-900 border-b-4 border-primary-yellow">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1600&auto=format&fit=crop&q=80"
            alt="Impact Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/30 z-10" />
        </motion.div>

        {/* Decorative Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-20"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 z-30 relative pt-32 md:pt-48">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none uppercase">
                Our <span className="text-primary-yellow">Impact</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl font-light">
                Measuring change and celebrating successes in communities across
                Malawi and the surrounding regions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              By The Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quantifiable results from our programs and initiatives
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactMetrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl ${metric.color.replace(
                      "text",
                      "bg"
                    )} bg-opacity-10 mb-4`}
                  >
                    <MetricIcon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {metric.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories of transformation and empowerment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl">{story.image}</div>
                    <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium">
                      {story.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{story.description}</p>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Target className="w-4 h-4" />
                      <span>Impact</span>
                    </div>
                    <p className="font-medium text-gray-900">{story.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Impact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Geographic Reach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our presence across Malawi and the region
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Malawi Map */}
                <div className="relative">
                  <div className="relative h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🇲🇼</div>
                      <div className="text-2xl font-bold text-gray-900">
                        Malawi
                      </div>
                    </div>

                    {/* Location Markers */}
                    <div className="absolute top-1/4 left-1/3">
                      <div className="relative">
                        <div className="w-6 h-6 bg-primary-green rounded-full border-4 border-white shadow-lg"></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium bg-white px-2 py-1 rounded shadow">
                          Lilongwe
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-1/3 right-1/4">
                      <div className="relative">
                        <div className="w-6 h-6 bg-primary-blue rounded-full border-4 border-white shadow-lg"></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium bg-white px-2 py-1 rounded shadow">
                          Blantyre
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Presence */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Regional Partnerships
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        country: "Zambia",
                        projects: "SRHR Advocacy",
                        status: "Active",
                      },
                      {
                        country: "Zimbabwe",
                        projects: "Youth Networks",
                        status: "Active",
                      },
                      {
                        country: "Botswana",
                        projects: "Capacity Building",
                        status: "Active",
                      },
                    ].map((country, index) => (
                      <motion.div
                        key={country.country}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div>
                          <div className="font-bold text-gray-900">
                            {country.country}
                          </div>
                          <div className="text-sm text-gray-600">
                            {country.projects}
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            country.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {country.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Reports & Publications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download our annual reports and impact assessments
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  year: "2023",
                  title: "Annual Report",
                  downloads: "1.2k",
                  size: "5.4 MB",
                },
                {
                  year: "2024",
                  title: "Impact Assessment",
                  downloads: "2.1k",
                  size: "7.8 MB",
                },
                {
                  year: "2025",
                  title: "Sustainability Plan",
                  downloads: "0.8k",
                  size: "3.2 MB",
                },
              ].map((report, index) => (
                <motion.div
                  key={report.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="text-5xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {report.title} {report.year}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{report.downloads} downloads</span>
                    <span>{report.size}</span>
                  </div>
                  <button className="w-full btn-primary py-3">
                    Download PDF
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-green to-primary-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Help Us Grow Our Impact
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Your support enables us to expand our programs and reach more
            communities in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Donate Now
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
              View Full Impact Report
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ImpactPage;
