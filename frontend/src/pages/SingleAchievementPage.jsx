import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Tag, Award, ArrowLeft, Loader2, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../utils/api";

const SingleAchievementPage = () => {
  const { slug } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAchievement();
  }, [slug]);

  const fetchAchievement = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl(`/achievements/${slug}`));

      if (!response.ok) {
        throw new Error("Achievement not found");
      }

      const data = await response.json();
      setAchievement(data);
    } catch (error) {
      console.error("Error fetching achievement:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: achievement.title,
        text: achievement.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        icon: "🔗",
        style: {
          borderRadius: "15px",
          background: "#1e3a8a",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary-yellow animate-spin" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
            Loading achievement...
          </p>
        </div>
      </div>
    );
  }

  if (error || !achievement) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-blue-900 mb-4">
            Achievement Not Found
          </h2>
          <p className="text-gray-500 mb-8">
            The achievement you're looking for doesn't exist or has been
            removed.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-green text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-green/20 hover:translate-y-[-2px] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to About
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden bg-blue-900">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {achievement.images && achievement.images.length > 0 ? (
            <img
              src={achievement.images[0]}
              alt={achievement.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-primary-green" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent z-10" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 pt-24 md:pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-white/70 hover:text-primary-yellow transition-colors font-bold uppercase tracking-widest text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to About
              </Link>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-white/70 hover:text-primary-yellow transition-colors font-bold uppercase tracking-widest text-sm"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tighter">
              {achievement.title}
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl font-medium leading-relaxed mb-8">
              {achievement.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Tag className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  {achievement.category}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-bold">
                  {new Date(achievement.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {achievement.featured && (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-yellow/20 backdrop-blur-sm rounded-xl border border-primary-yellow/40">
                  <Award className="w-4 h-4 text-primary-yellow" />
                  <span className="text-sm font-bold text-primary-yellow uppercase tracking-wider">
                    Featured
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Additional Images Gallery */}
            {achievement.images && achievement.images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                {achievement.images.slice(1).map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="aspect-video rounded-3xl overflow-hidden shadow-xl"
                  >
                    <img
                      src={image}
                      alt={`${achievement.title} ${idx + 2}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <div
                className="text-gray-700 leading-relaxed space-y-6 text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: achievement.content }}
              />
            </motion.div>

            {/* Back to About CTA */}
            <div className="mt-16 pt-12 border-t border-gray-100">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:translate-y-[-2px] transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                View More Achievements
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SingleAchievementPage;
