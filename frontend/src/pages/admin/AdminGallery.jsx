import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Plus,
  Search,
  Image as ImageIcon,
  Video,
  Trash2,
  Edit3,
  Calendar,
  X,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const AdminGallery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "picture",
    url: "",
    size: "",
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/gallery"));
      const data = await response.json();
      setMediaItems(data);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = mediaItems.filter((item) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Pictures" && item.type === "picture") ||
      (activeTab === "Videos" && item.type === "video");

    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(getApiUrl("/upload"), {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.url) {
        setFormData({
          ...formData,
          url: result.url,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          type: file.type.startsWith("video") ? "video" : "picture",
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Saving your asset...");
    try {
      const response = await fetch(getApiUrl("/gallery"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ title: "", type: "picture", url: "", size: "" });
        fetchMedia();
        toast.success("Asset added to gallery!", { id: loadingToast });
      } else {
        toast.error("Failed to sync asset", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error adding gallery item:", error);
      toast.error("An error occurred", { id: loadingToast });
    }
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
              Are you sure you want to permanently delete this digital asset?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Destroying asset...");
                try {
                  const response = await fetch(getApiUrl(`/gallery/${id}`), {
                    method: "DELETE",
                  });
                  if (response.ok) {
                    fetchMedia();
                    toast.success("Asset incinerated!", { id: loadingToast });
                  } else {
                    toast.error("Destruction failed", { id: loadingToast });
                  }
                } catch (error) {
                  console.error("Error deleting item:", error);
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

  return (
    <AdminLayout title="Digital Assets">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Media Gallery
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage photos and videos for your organization
          </p>
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 lg:flex-none h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all"
          >
            <Plus className="w-4 h-4" /> Add Asset
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
          {["All", "Pictures", "Videos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-blue-900 text-white shadow-md shadow-blue-900/20"
                  : "text-gray-400 hover:text-blue-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-blue-900" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-medium focus:border-blue-900 transition-all shadow-sm focus:shadow-md"
          />
        </div>
      </div>

      {/* Media List format */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
        <div className="divide-y divide-gray-100">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Loader2 className="w-10 h-10 text-primary-green animate-spin mb-4" />
                <p className="text-gray-400 font-medium">Loading Assets...</p>
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all group"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden relative shadow-sm border border-gray-100 flex-shrink-0">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.type === "video" ? (
                          <Video className="w-4 h-4 text-white" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-blue-900 font-black text-base leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1.5">
                        <span
                          className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                            item.type === "video"
                              ? "bg-purple-50 text-purple-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {item.type}
                        </span>
                        <span className="text-gray-400 text-[10px] font-medium border-l border-gray-100 pl-4 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-gray-400 text-[10px] font-medium border-l border-gray-100 pl-4">
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="h-10 px-5 bg-red-50 text-red-500 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ImageIcon className="w-12 h-12 text-gray-200 mb-4" />
                <h3 className="text-lg font-black text-blue-900 uppercase tracking-tighter">
                  No assets found
                </h3>
                <p className="text-gray-400 text-xs font-medium mt-1">
                  Upload your first photo or video
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Asset Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-blue-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
                  Add New Asset
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-900/70 uppercase tracking-widest ml-1">
                    Asset Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-5 py-3.5 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all text-sm font-bold text-blue-900 placeholder:text-gray-300"
                    placeholder="e.g. Youth Workshop 2024"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-blue-900/70 uppercase tracking-widest ml-1">
                    Media Upload
                  </label>
                  {formData.url ? (
                    <div className="relative group rounded-[2rem] overflow-hidden border border-gray-100 aspect-video bg-gray-50">
                      <img
                        src={formData.url}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, url: "" })}
                        className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-xl shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={isUploading}
                      />
                      <div className="w-full p-12 rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-100/50 flex flex-col items-center justify-center gap-4 group-hover:bg-white group-hover:border-primary-green transition-all">
                        {isUploading ? (
                          <Loader2 className="w-10 h-10 text-primary-green animate-spin" />
                        ) : (
                          <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-primary-green transition-colors" />
                        )}
                        <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
                          {isUploading
                            ? "Uploading..."
                            : "Click to upload media"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!formData.url}
                  className="w-full h-14 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] disabled:opacity-50 disabled:translate-y-0 transition-all"
                >
                  <Plus className="w-4 h-4" /> Save Asset
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminGallery;
