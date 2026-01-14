import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Clock,
  ArrowRight,
  Loader2,
  FileText,
} from "lucide-react";
import { getApiUrl } from "../utils/api";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/blogs"));

      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const blogHeroImage =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80";

  const featuredPost = blogs.find((p) => p.featured) || blogs[0];
  const regularPosts = blogs.filter((p) => p._id !== (featuredPost?._id || -1));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-blue-900">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={blogHeroImage}
            alt="Blog Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </motion.div>

        {/* Decorative Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-20"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 z-30 relative pt-32">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-green/20 backdrop-blur-md border border-primary-green/30 text-primary-green text-[10px] md:text-sm font-bold uppercase tracking-widest mb-6">
                Our Stories
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none uppercase">
                Insights & <span className="text-primary-green">Impact</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/80 leading-relaxed max-w-2xl font-light">
                Exploring the stories, achievements, and lessons from our
                journey to empower the youth of Malawi and beyond.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Fade to Content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-30" />
      </section>

      <div className="container mx-auto px-4 py-20">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <Loader2 className="w-16 h-16 text-primary-green animate-spin" />
              <p className="text-blue-900 font-black uppercase tracking-widest text-xs">
                Synchronizing Stories...
              </p>
            </motion.div>
          ) : blogs.length > 0 ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Featured Article */}
              {featuredPost && (
                <div className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-1 bg-primary-green rounded" />
                    <h2 className="text-xl md:text-2xl font-black text-blue-900 uppercase tracking-widest">
                      Featured Story
                    </h2>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="block group relative h-[400px] md:h-[500px] rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl"
                  >
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full lg:w-3/4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center text-white/80 text-xs md:text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-5xl font-black text-white mb-6 lg:mb-8 leading-tight line-clamp-2">
                        {featuredPost.title}
                      </h3>
                      <div className="flex items-center gap-3 bg-white text-blue-900 w-fit px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl font-black text-xs lg:text-base hover:bg-primary-yellow transition-all">
                        Read Story <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid Section */}
              {regularPosts.length > 0 && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-1 bg-gray-300 rounded" />
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-widest">
                      Latest Updates
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {regularPosts.map((post, idx) => (
                      <Link
                        key={post._id}
                        to={`/blog/${post.slug}`}
                        className="group"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -12 }}
                          className="bg-white rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5 hover:shadow-primary-green/20 border border-gray-100/50 hover:border-primary-green/30 transition-all duration-500 h-full flex flex-col"
                        >
                          {/* Image Container with Zoom & Overlay */}
                          <div className="relative h-56 lg:h-72 overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>

                          {/* Content Section */}
                          <div className="p-8 lg:p-10 flex-grow flex flex-col">
                            {/* Meta Information Bar */}
                            <div className="flex items-center gap-3 lg:gap-4 text-[10px] lg:text-[11px] text-gray-400 mb-6 font-bold uppercase tracking-widest bg-gray-50/50 p-2.5 lg:p-3 rounded-xl lg:rounded-2xl border border-gray-100/50">
                              <span className="flex items-center gap-2 text-primary-green">
                                <Calendar className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                              <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-gray-200" />
                              <span className="flex items-center gap-2">
                                <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                                {post.readTime}
                              </span>
                            </div>

                            <h3 className="text-xl lg:text-2xl font-black text-blue-900 group-hover:text-primary-green transition-colors duration-300 leading-[1.3] mb-6 lg:mb-8 line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Premium Button Footer */}
                            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between group/btn">
                              <div className="flex items-center gap-2 text-primary-green font-black text-xs lg:text-sm uppercase tracking-wider">
                                <span className="relative">
                                  Read Article
                                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green transition-all duration-300 group-hover/btn:w-full"></span>
                                </span>
                              </div>
                              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-primary-green/5 group-hover:bg-primary-green flex items-center justify-center transition-all duration-300">
                                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-primary-green group-hover:text-white transition-colors" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-xl mb-6">
                <FileText className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-2xl font-black text-blue-900 uppercase">
                Silence in the Library
              </h3>
              <p className="text-gray-400 mt-2 font-medium">
                We're currently gathering stories from our latest impact
                missions.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 mt-20 md:mt-32">
        <div className="bg-blue-900 rounded-[2.5rem] md:rounded-[50px] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-green/10 -skew-x-12 translate-x-1/2" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Get stories delivered <br />
              to your <span className="text-primary-yellow">inbox.</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-md">
              Be the first to know about our impact updates, upcoming events,
              and stories from the field.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-primary-yellow transition-all text-sm"
              />
              <button className="bg-primary-yellow text-blue-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="text-white/40 text-[10px] mt-6 uppercase tracking-widest font-bold">
              * Direct update dispatch. Zero spam.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
