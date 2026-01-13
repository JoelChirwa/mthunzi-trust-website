import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Loader2,
  FileText,
} from "lucide-react";

const SingleBlogPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
          /\/api$/,
          ""
        )}/api/blogs/${slug}`
      );
      const data = await response.json();
      if (response.ok) {
        setPost(data);
        fetchRelatedPosts(data._id);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedPosts = async (currentId) => {
    try {
      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
          /\/api$/,
          ""
        )}/api/blogs`
      );
      const data = await response.json();
      setRelatedPosts(data.filter((p) => p._id !== currentId).slice(0, 3));
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 gap-4">
        <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
        <p className="text-blue-900 font-black uppercase tracking-widest text-xs">
          Gathering Story Details...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mx-auto mb-6">
            <FileText className="w-10 h-10 text-gray-200" />
          </div>
          <h1 className="text-4xl font-black text-blue-900 mb-4 uppercase tracking-tighter">
            Story Not Found
          </h1>
          <Link
            to="/blog"
            className="text-primary-green font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden bg-blue-900">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent z-10" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-primary-yellow mb-8 transition-colors font-bold uppercase tracking-widest text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Articles
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-white/80 text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 pt-8 border-t border-white/10">
              <div className="hidden sm:block">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
                  Published on
                </p>
                <p className="text-white font-black">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Article */}
            <article className="lg:w-2/3">
              <div
                className="prose prose-xl prose-blue max-w-none text-gray-600 leading-relaxed space-y-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Social Share */}
              <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="font-black text-blue-900 uppercase tracking-widest text-sm">
                    Share Story:
                  </span>
                  <div className="flex gap-3">
                    {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-900 hover:bg-primary-green hover:text-white transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
                <button className="flex items-center gap-2 text-primary-green font-black uppercase tracking-widest text-sm hover:translate-x-1 transition-transform">
                  <Share2 className="w-5 h-5" /> Copy Article Link
                </button>
              </div>
            </article>

            {/* Sidebar / Related */}
            <aside className="lg:w-1/3">
              <div className="sticky top-32">
                <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
                  <h3 className="text-2xl font-black text-blue-900 mb-8 flex items-center gap-3">
                    <div className="w-2 h-8 bg-primary-green rounded-full" />
                    Related Stories
                  </h3>
                  <div className="space-y-8">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related._id}
                        to={`/blog/${related.slug}`}
                        className="group block"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                            <img
                              src={related.image}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              alt=""
                            />
                          </div>
                          <div>
                            <h4 className="font-black text-blue-900 group-hover:text-primary-green transition-colors line-clamp-2 leading-tight">
                              {related.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-12 pt-10 border-t border-gray-200/50">
                    <div className="bg-blue-900 rounded-3xl p-8 relative overflow-hidden">
                      <div className="relative z-10 text-center">
                        <h4 className="text-white font-black text-xl mb-4">
                          Want more updates?
                        </h4>
                        <p className="text-white/60 text-sm mb-6">
                          Join our newsletter for weekly impact reports.
                        </p>
                        <button className="w-full bg-primary-yellow text-blue-900 py-3 rounded-xl font-black hover:bg-white transition-all">
                          Subscribe
                        </button>
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleBlogPage;
