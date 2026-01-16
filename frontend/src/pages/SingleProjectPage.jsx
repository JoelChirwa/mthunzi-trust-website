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
import { toast } from "react-hot-toast";
import { getApiUrl } from "../utils/api";

const SingleProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl(`/projects/slug/${slug}`));
      if (!response.ok) {
        throw new Error("Project not found");
      }
      const data = await response.json();
      setProject(data);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching project:", error);
      navigate("/impact");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.description?.substring(0, 160) + "...",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-primary-green rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white/50 font-black uppercase tracking-[0.3em] text-[10px]">
            Retrieving Project Intel...
          </p>
        </div>
      </div>
    );
  }

  if (!project) return null;

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
            src={project.image}
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
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30 text-xs">
                {project.status}
              </span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-white mb-4 leading-tight">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
              <div>
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                  Location
                </div>
                <div className="text-sm font-bold text-blue-900">
                  {project.location}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
              <div>
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                  Commenced
                </div>
                <div className="text-sm font-bold text-blue-900">
                  {new Date(project.startDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
              <div>
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                  Reach
                </div>
                <div className="text-sm font-bold text-blue-900">
                  {project.beneficiaries?.toLocaleString() || 0} People
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
              <div>
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                  Category
                </div>
                <div className="text-sm font-bold text-blue-900">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 uppercase tracking-tighter mb-8 bg-gradient-to-r from-blue-900 to-primary-green bg-clip-text text-transparent">
              Project Overview
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6 font-medium">
              {project.description.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Partners if any */}
            {project.partners && project.partners.length > 0 && (
              <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-4">
                  Partnering Organizations
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.partners.map((partner, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-blue-900 shadow-sm border border-gray-100"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Achievements / Outcomes */}
      {project.achievements && project.achievements.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-blue-900 uppercase tracking-tighter mb-10 flex items-center gap-4">
                <Target className="w-10 h-10 text-primary-green" />
                Measurable Impact
              </h2>
              <div className="grid gap-4">
                {project.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary-green" />
                    </div>
                    <span className="text-blue-900 font-bold">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-blue-900 uppercase tracking-tighter mb-12">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Galllery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Objectives */}
      {project.objectives && project.objectives.length > 0 && (
        <section className="py-16 md:py-24 bg-blue-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green rounded-full blur-[100px]" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-12 text-center">
                Mission <span className="text-primary-green">Objectives</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.objectives.map((obj, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex gap-4"
                  >
                    <div className="text-primary-green font-black text-2xl opacity-30">
                      {index + 1}
                    </div>
                    <p className="text-white/80 font-medium leading-relaxed">
                      {obj}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter mb-6">
              Support Projects{" "}
              <span className="text-primary-green">Like This</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 font-medium">
              Your support enables us to continue creating transformative impact
              in communities across Malawi and beyond. Join us in making a
              difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 bg-primary-green text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-900 transition-all shadow-xl shadow-primary-green/20"
              >
                Partner With Us
              </Link>
              <Link
                to="/impact/projects"
                className="inline-flex items-center justify-center gap-3 bg-gray-100 text-gray-400 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
              >
                Explore More Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SingleProjectPage;
