import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Video,
  Edit3,
  Trash2,
  Plus,
  Loader2,
  X,
  Save,
  Youtube,
  Star,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const VoiceModal = ({ isOpen, onClose, onSave, voice }) => {
  const [formData, setFormData] = useState({
    title: "",
    youtubeId: "",
    description: "",
    speaker: "",
    featured: false,
    active: true,
  });

  useEffect(() => {
    if (voice) {
      setFormData(voice);
    } else {
      setFormData({
        title: "",
        youtubeId: "",
        description: "",
        speaker: "",
        featured: false,
        active: true,
      });
    }
  }, [voice, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-lg md:text-xl font-black text-blue-900 uppercase tracking-tighter">
                {voice ? "Edit Community Voice" : "Add New Community Voice"}
              </h3>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
                Share a story of transformation
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-xl md:rounded-2xl text-gray-400 hover:text-red-500 hover:shadow-lg transition-all border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                Story Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Mthunzi awards best Essay Writers"
                className="w-full px-6 py-4 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                <Youtube className="w-3 h-3 inline mr-1" />
                YouTube Video ID
              </label>
              <input
                type="text"
                value={formData.youtubeId}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeId: e.target.value })
                }
                placeholder="e.g., dQw4w9WgXcQ"
                className="w-full px-6 py-4 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
              />
              <p className="text-[10px] text-gray-400 font-medium ml-1">
                The code after 'v=' in the YouTube URL (e.g.,
                youtube.com/watch?v=<b>dQw4w9WgXcQ</b>)
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                  Speaker/Narrator (Optional)
                </label>
                <input
                  type="text"
                  value={formData.speaker}
                  onChange={(e) =>
                    setFormData({ ...formData, speaker: e.target.value })
                  }
                  placeholder="e.g., John Phiri"
                  className="w-full px-4 py-3 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
                />
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-2 border-blue-200 text-primary-green focus:ring-2 focus:ring-primary-green"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-bold text-blue-900 cursor-pointer flex items-center gap-2"
                  >
                    <Star className="w-4 h-4 text-primary-yellow" />
                    Featured on Impact Page
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Briefly describe the significance of this voice..."
                rows={3}
                className="w-full px-6 py-4 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all resize-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-end gap-3 md:gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-400 hover:text-blue-900 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(formData)}
              className="w-full sm:w-auto px-8 py-4 bg-blue-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all"
            >
              <Save className="w-4 h-4" /> Save Voice
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const AdminVoices = () => {
  const [voices, setVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVoice, setCurrentVoice] = useState(null);

  useEffect(() => {
    fetchVoices();
  }, []);

  const fetchVoices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/voices?active=any"));
      const data = await response.json();
      setVoices(data);
    } catch (error) {
      console.error("Error fetching voices:", error);
      toast.error("Failed to load community voices");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (voice) => {
    setCurrentVoice(voice);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentVoice(null);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    const loadingToast = toast.loading(
      currentVoice ? "Updating voice..." : "Adding voice story..."
    );
    try {
      const url = currentVoice
        ? getApiUrl(`/voices/${currentVoice._id}`)
        : getApiUrl("/voices");

      const method = currentVoice ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchVoices();
        setIsModalOpen(false);
        toast.success(
          currentVoice ? "Voice story updated!" : "New voice story added!",
          { id: loadingToast }
        );
      } else {
        toast.error("Operation failed", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error saving voice:", error);
      toast.error("An error occurred", { id: loadingToast });
    }
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-4 p-4 min-w-[300px]">
        <div>
          <p className="text-sm font-black text-blue-900 uppercase tracking-tight">
            Confirm Removal
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Permanently remove this community voice story?
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading("Removing...");
              try {
                const response = await fetch(getApiUrl(`/voices/${id}`), {
                  method: "DELETE",
                });
                if (response.ok) {
                  setVoices((prev) => prev.filter((v) => v._id !== id));
                  toast.success("Voice story removed", { id: loadingToast });
                } else {
                  toast.error("Removal failed", { id: loadingToast });
                }
              } catch (error) {
                toast.error("An error occurred", { id: loadingToast });
              }
            }}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all"
          >
            Remove
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleToggleActive = async (voice) => {
    try {
      const response = await fetch(getApiUrl(`/voices/${voice._id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !voice.active }),
      });
      if (response.ok) {
        setVoices((prev) =>
          prev.map((v) =>
            v._id === voice._id ? { ...v, active: !v.active } : v
          )
        );
        toast.success(
          voice.active ? "Voice story hidden" : "Voice story activated"
        );
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <AdminLayout title="Community Voices">
      <VoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        voice={currentVoice}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Voices & Stories
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage community testimonials and impact videos
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Voice Story
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-green animate-spin" />
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                Loading Stories...
              </p>
            </div>
          ) : voices.length > 0 ? (
            voices.map((voice, index) => (
              <motion.div
                key={voice._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 hover:bg-gray-50/5 transition-all gap-4 ${
                  !voice.active ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-start gap-4 flex-1 w-full">
                  <div className="w-32 aspect-video rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                    <img
                      src={`https://img.youtube.com/vi/${voice.youtubeId}/mqdefault.jpg`}
                      alt={voice.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                      <Youtube className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-blue-900 font-black text-sm md:text-base line-clamp-1">
                        {voice.title}
                      </h3>
                      {voice.featured && (
                        <Star className="w-4 h-4 text-primary-yellow fill-primary-yellow" />
                      )}
                    </div>
                    {voice.speaker && (
                      <p className="text-xs text-primary-green font-bold uppercase tracking-tight mb-2">
                        {voice.speaker}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 line-clamp-1 italic">
                      {voice.description || "No description provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto">
                  <button
                    onClick={() => handleToggleActive(voice)}
                    title={voice.active ? "Deactivate" : "Activate"}
                    className={`p-3 rounded-xl transition-all border ${
                      voice.active
                        ? "bg-blue-50 text-blue-900 border-blue-100 hover:bg-blue-900 hover:text-white"
                        : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                  >
                    {voice.active ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(voice)}
                    className="p-3 bg-gray-50 text-gray-400 hover:text-blue-900 rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(voice._id)}
                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                <Video className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                No voice stories captured yet
              </p>
              <button
                onClick={handleAddNew}
                className="mt-6 px-6 py-3 bg-primary-green text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105"
              >
                Add Your First Story
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminVoices;
