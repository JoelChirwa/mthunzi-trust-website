import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Layers,
  Edit3,
  Trash2,
  Plus,
  Loader2,
  X,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const ProgramModal = ({ isOpen, onClose, onSave, program }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    shortDesc: "",
    description: "",
    icon: "Layers",
    color: "bg-blue-600",
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (program) {
      setFormData(program);
    } else {
      setFormData({
        title: "",
        image: "",
        shortDesc: "",
        description: "",
        icon: "Layers",
        color: "bg-blue-600",
      });
    }
  }, [program, isOpen]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("image", file);

      const response = await fetch(getApiUrl("/upload"), {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        setFormData({ ...formData, image: result.url });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
                {program ? "Edit Program" : "Launch New Initiative"}
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                {program
                  ? "Refine your strategic program"
                  : "Define a new impact program for Mthunzi"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-gray-400 hover:text-red-500 hover:shadow-lg transition-all border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="p-8 overflow-y-auto space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                Program Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Education for All"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-medium transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                Program Cover Image
              </label>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 text-primary-green animate-spin" />
                  ) : formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-block px-6 py-3 bg-blue-50 text-blue-900 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-900 hover:text-white transition-all">
                    {formData.image ? "Change Image" : "Upload Image"}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                  <p className="text-[10px] text-gray-400 font-medium mt-2 leading-relaxed">
                    Recommended: 1600x900px (16:9). <br />
                    Supported: JPG, PNG, WEBP
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                Short Description
              </label>
              <textarea
                value={formData.shortDesc}
                onChange={(e) =>
                  setFormData({ ...formData, shortDesc: e.target.value })
                }
                placeholder="A brief summary for cards..."
                rows={2}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-medium transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                Full Description (HTML Supported)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Detailed program content..."
                rows={5}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-8 py-4 bg-white text-gray-400 hover:text-blue-900 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(formData)}
              disabled={isUploading}
              className={`px-8 py-4 bg-blue-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Save className="w-4 h-4" /> Save Program
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/programs"));
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (program) => {
    setCurrentProgram(program);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4 p-4 min-w-[300px]">
          <div>
            <p className="text-sm font-black text-blue-900 uppercase tracking-tight">
              Confirm Deletion
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Are you sure you want to delete this program? This will remove all
              associated data.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Removing program...");
                try {
                  const response = await fetch(getApiUrl(`/programs/${id}`), {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                  });
                  if (response.ok) {
                    setPrograms((prev) => prev.filter((p) => p._id !== id));
                    toast.success("Program removed successfully", {
                      id: loadingToast,
                    });
                  } else {
                    toast.error("Deletion failed", { id: loadingToast });
                  }
                } catch (error) {
                  console.error("Error deleting program:", error);
                  toast.error("An error occurred", { id: loadingToast });
                }
              }}
              className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all font-bold"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000, position: "top-center" }
    );
  };

  const handleAddNew = () => {
    setCurrentProgram(null);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    const loadingToast = toast.loading(
      currentProgram ? "Updating initiative..." : "Launching initiative..."
    );
    try {
      const url = currentProgram
        ? getApiUrl(`/programs/${currentProgram._id}`)
        : getApiUrl("/programs");

      const method = currentProgram ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPrograms();
        setIsModalOpen(false);
        toast.success(
          currentProgram ? "Initiative updated!" : "Initiative launched!",
          { id: loadingToast }
        );
      } else {
        toast.error("Synchronisation error", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error saving program:", error);
      toast.error("Fatal system error", { id: loadingToast });
    }
  };

  const getInitials = (title) => {
    if (!title) return "PT";
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AdminLayout title="Strategic Programs">
      <ProgramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        program={currentProgram}
      />

      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Our Programs
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage your organization's programs and initiatives
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>

      {/* Programs List - Simplified */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-green animate-spin" />
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                Syncing Strategic Initiatives...
              </p>
            </div>
          ) : programs.length > 0 ? (
            programs.map((program, index) => (
              <motion.div
                key={program._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all"
              >
                {/* Left: Icon + Info */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-green to-blue-900 flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0 overflow-hidden">
                    {program.image ? (
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(program.title)
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex flex-col">
                    <h3 className="text-blue-900 font-black text-base">
                      {program.title}
                    </h3>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(program)}
                    className="py-2.5 px-4 bg-blue-50 text-blue-900 rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(program._id)}
                    className="py-2.5 px-4 bg-red-50 text-red-500 rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                <Layers className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                No programs registered yet
              </p>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddNew}
                  className="px-6 py-3 bg-primary-green text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary-green/20 transition-all hover:scale-105"
                >
                  Create Program
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPrograms;
