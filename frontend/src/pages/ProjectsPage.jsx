import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Tag,
  Calendar,
  Users,
  Loader2,
  FolderKanban,
  Search,
  Filter,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../utils/api";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Education",
    "Health",
    "Agriculture & Food Security",
    "Water & Sanitation",
    "Climate Change",
    "Women & Girls Empowerment",
    "Waste Management",
    "Other",
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/projects"));
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === "All" || project.category === filter;
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-primary-green overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-blue rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
              Our Community{" "}
              <span className="text-primary-yellow">Projects</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium">
              Explore the breadth of our impact across Malawi. From sustainable
              agriculture to youth empowerment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all font-bold text-blue-900"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto scrollbar-hide no-scrollbar">
              <Filter className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === cat
                      ? "bg-primary-green text-white shadow-lg shadow-primary-green/20"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
                Synchronizing Impact Data...
              </p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Top Badges */}
                      <div className="absolute top-6 right-6 flex flex-col gap-2">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-900 shadow-lg">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-900 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                          <Tag className="w-3 h-3" />
                          {project.status}
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-blue-900 mb-4 leading-tight group-hover:text-primary-green transition-colors">
                        {project.title}
                      </h3>

                      <div className="pt-6 border-t border-gray-50 mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {project.beneficiaries > 0 && (
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                Beneficiaries
                              </span>
                              <span className="text-sm font-black text-blue-900">
                                {project.beneficiaries.toLocaleString()}+
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => navigate(`/impact/${project.slug}`)}
                          className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-900 group-hover:bg-primary-green group-hover:text-white transition-all duration-300"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-[2.5rem] flex items-center justify-center mb-8">
                <FolderKanban className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tighter mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-500 font-medium max-w-sm mx-auto mb-8">
                We couldn't find any projects matching your search or category
                filter. Try refining your selection.
              </p>
              <button
                onClick={() => {
                  setFilter("All");
                  setSearchQuery("");
                }}
                className="px-8 py-4 bg-primary-green text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary-green/20"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[100px] border-white rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Want to <span className="text-primary-green">Partner</span> with us?
          </h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto font-medium">
            Join us in our mission to create sustainable change. Whether you're
            an individual or an organization, there are many ways to support our
            community projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="px-10 py-5 bg-primary-green text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-900 transition-all shadow-xl shadow-primary-green/20"
            >
              Collaborate Now
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-900 transition-all"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
