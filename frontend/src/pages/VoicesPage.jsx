import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlayCircle, Loader2 } from "lucide-react";
import { getApiUrl } from "../utils/api";

const VoicesPage = () => {
  const navigate = useNavigate();
  const [voices, setVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVoices();
  }, []);

  const fetchVoices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/voices"));
      const data = await response.json();
      setVoices(data);
    } catch (error) {
      console.error("Error fetching voices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/impact")}
            className="flex items-center gap-2 text-primary-green hover:text-primary-blue transition-colors font-bold mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Impact
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              Community <span className="text-primary-green">Voices</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
              Experience the stories of transformation through the eyes and
              voices of the people we serve across Malawi.
            </p>
          </motion.div>
        </div>

        {/* Video Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
              Tuning in to community voices...
            </p>
          </div>
        ) : voices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {voices.map((voice, index) => (
              <motion.div
                key={voice._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all h-full flex flex-col"
              >
                <div className="aspect-video relative">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${voice.youtubeId}`}
                    title={voice.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <PlayCircle className="w-5 h-5 text-primary-green flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {voice.title}
                    </h3>
                  </div>
                  {voice.speaker && (
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-auto">
                      Shared by{" "}
                      <span className="text-primary-green">
                        {voice.speaker}
                      </span>
                    </p>
                  )}
                  {voice.description && (
                    <p className="text-sm text-gray-500 mt-4 line-clamp-3 italic">
                      {voice.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium mb-6">
              No community stories found yet.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="btn-primary px-8 py-3 text-xs uppercase tracking-widest font-black"
            >
              Share Your Story
            </button>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-primary-green rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-blue/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
            Inspired by these stories?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10 font-light">
            Your support can help us create even more success stories and
            transform more lives in Malawi.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-primary-yellow text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-xl hover:shadow-2xl relative z-10 transform hover:-translate-y-1"
          >
            Partner With Us
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VoicesPage;
