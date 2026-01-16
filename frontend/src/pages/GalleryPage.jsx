import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Maximize2,
  X,
  Filter,
  Play,
  Loader2,
} from "lucide-react";
import SEO from "../components/SEO";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/gallery`
      );
      const data = await response.json();
      setMediaItems(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["All", "Pictures", "Videos"];

  const filteredImages = mediaItems.filter((img) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Pictures") return img.type === "picture";
    if (activeFilter === "Videos") return img.type === "video";
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24"
    >
      <SEO
        title="Visual Gallery"
        description="Explore the visual journey of Mthunzi Trust. Photos and videos documenting our impact, community projects, and smiles enabled across Malawi."
        keywords="Malawi NGO gallery, community development photos, impact videos Malawi, NGO visual documentation"
        url="/gallery"
      />
      {/* Cinematic Header */}
      <section className="relative min-h-[35vh] md:min-h-[65vh] flex items-start overflow-hidden">
        <div className="absolute inset-0 bg-blue-900">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80"
            alt="Gallery Backdrop"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-transparent to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center pt-32 md:pt-48">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary-green/10 text-primary-green rounded-full font-black text-xs uppercase tracking-[0.2em] mb-8"
          >
            <ImageIcon className="w-4 h-4" /> Visual Journey
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-blue-900 uppercase tracking-tighter leading-tight mb-6"
          >
            Our Impact <br />
            <span className="text-primary-green">Captured.</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            A visual documentation of the smiles we've enabled and the
            communities we've transformed across Malawi.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-3 mr-4 text-blue-900 font-black text-xs uppercase tracking-widest border-r border-gray-100 pr-8">
            <Filter className="w-4 h-4" /> Filter by
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === cat
                  ? "bg-primary-green text-white shadow-xl shadow-primary-green/20"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-blue-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-primary-green animate-spin mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
              Developing visuals...
            </p>
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredImages.map((image) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={image._id}
                className="relative group cursor-pointer break-inside-avoid"
                onClick={() => setSelectedImage(image)}
              >
                <div className="overflow-hidden rounded-[2.5rem] bg-gray-100 relative shadow-sm hover:shadow-2xl transition-all duration-500">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 backdrop-blur-sm">
                    <div className="bg-primary-yellow/10 w-fit px-4 py-1 rounded-full text-primary-yellow font-black text-[10px] uppercase tracking-widest mb-4">
                      {image.type === "video" ? "Video" : "Capture"}
                    </div>
                    <h3 className="text-white text-2xl font-black uppercase tracking-tighter leading-none mb-4">
                      {image.title}
                    </h3>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-900 group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                      {image.type === "video" ? (
                        <Play className="w-5 h-5 fill-current" />
                      ) : (
                        <Maximize2 className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[4rem]">
            <ImageIcon className="w-16 h-16 text-gray-100 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-blue-900 uppercase">
              Empty Canvas
            </h3>
            <p className="text-gray-400 mt-2">
              We haven't uploaded any media yet. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-blue-950/95 backdrop-blur-2xl flex items-center justify-center p-8 md:p-20"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-950 transition-all font-black"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.type === "video" ? (
                <div className="w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-black">
                  <iframe
                    src={selectedImage.url}
                    className="w-full h-full"
                    title={selectedImage.title}
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-[3rem] shadow-2xl"
                />
              )}
              <div className="text-center">
                <div className="text-primary-green font-black uppercase tracking-[0.3em] text-[10px] mb-2">
                  {new Date(selectedImage.createdAt).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </div>
                <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  {selectedImage.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;
