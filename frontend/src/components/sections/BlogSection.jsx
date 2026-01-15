import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Calendar, Loader2 } from "lucide-react";
import { getApiUrl } from "../../utils/api";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(getApiUrl("/blogs"));
      const data = await response.json();
      setBlogs(data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return null;
  if (blogs.length === 0) return null;

  const displayPosts = blogs;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, staggerChildren: 0.2 },
            },
          }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-1 bg-primary-green rounded" />
              <span className="text-primary-green font-black uppercase tracking-[0.3em] text-sm">
                Our Journal
              </span>
            </motion.div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-4xl md:text-5xl font-black text-blue-900 leading-tight"
            >
              Latest Stories & <br />{" "}
              <span className="text-primary-green">Impact Updates</span>
            </motion.h2>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <Link
              to="/blog"
              className="flex items-center gap-3 bg-white text-blue-900 px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-900/5 hover:bg-primary-yellow transition-all border border-gray-100"
            >
              View All Stories <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post, idx) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/5 hover:shadow-primary-green/20 border border-gray-100/50 hover:border-primary-green/30 transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.images && post.images[0]}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-4 font-bold uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5 text-primary-green" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-black text-blue-900 group-hover:text-primary-green transition-colors duration-300 leading-tight mb-8">
                      {post.title}
                    </h3>
                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between group/btn">
                      <span className="text-primary-green font-black text-xs uppercase tracking-widest">
                        Read Story
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary-green/5 group-hover:bg-primary-green flex items-center justify-center transition-all duration-300">
                        <ChevronRight className="w-4 h-4 text-primary-green group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
