import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FileText,
  Edit3,
  Trash2,
  Plus,
  Loader2,
  X,
  Save,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const BlogModal = ({ isOpen, onClose, onSave, blog }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "General",
    readTime: "3 min read",
    featured: false,
    author: "Mthunzi Trust",
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData(blog);
    } else {
      setFormData({
        title: "",
        content: "",
        image: "",
        category: "General",
        readTime: "3 min read",
        featured: false,
        author: "Mthunzi Trust",
      });
    }
  }, [blog, isOpen]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("image", file);

      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
          /\/api$/,
          ""
        )}/api/upload`,
        {
          method: "POST",
          body: data,
        }
      );

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
          className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
                {blog ? "Edit Post" : "Draft New Article"}
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                {blog
                  ? "Refine your story for the community"
                  : "Share a new update or story from Mthunzi"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                  Article Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Impact Report 2024"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-medium transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 transition-all appearance-none cursor-pointer"
                >
                  <option>General</option>
                  <option>Environment</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Community</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                  Read Time (e.g., 5 min read)
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData({ ...formData, readTime: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-medium transition-all"
                />
              </div>
              <div className="flex items-end pb-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() =>
                      setFormData({ ...formData, featured: !formData.featured })
                    }
                    className={`w-12 h-6 rounded-full transition-all relative ${
                      formData.featured ? "bg-primary-green" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        formData.featured ? "left-7" : "left-1"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-900">
                    Feature on Homepage
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                Featured Image
              </label>
              <div className="flex items-center gap-6">
                <div className="w-40 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                    {formData.image ? "Change Image" : "Upload Banner"}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                  <p className="text-[10px] text-gray-400 font-medium mt-2 leading-relaxed">
                    Recommended: 16:9 Aspect Ratio. <br />
                    Supported: JPG, PNG, WEBP
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-1">
                Content (HTML Supported)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Write your story here..."
                rows={12}
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
              <Save className="w-4 h-4" /> Publish Post
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
          /\/api$/,
          ""
        )}/api/blogs`
      );
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
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
              Are you sure you want to permanently delete this blog post?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Deleting post...");
                try {
                  const response = await fetch(
                    `${(
                      import.meta.env.VITE_API_URL || "http://localhost:5000"
                    ).replace(/\/api$/, "")}/api/blogs/${id}`,
                    {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                    }
                  );
                  if (response.ok) {
                    setBlogs((prev) => prev.filter((blog) => blog._id !== id));
                    toast.success("Blog post deleted", { id: loadingToast });
                  } else {
                    toast.error("Failed to delete post", { id: loadingToast });
                  }
                } catch (error) {
                  console.error("Error deleting blog:", error);
                  toast.error("An error occurred during deletion", {
                    id: loadingToast,
                  });
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
    setCurrentBlog(null);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    const loadingToast = toast.loading(
      currentBlog ? "Updating Story..." : "Publishing Story..."
    );
    try {
      const baseUrl = (
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      ).replace(/\/api$/, "");
      const url = currentBlog
        ? `${baseUrl}/api/blogs/${currentBlog._id}`
        : `${baseUrl}/api/blogs`;

      const method = currentBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchBlogs();
        setIsModalOpen(false);
        toast.success(currentBlog ? "Story updated!" : "Story published!", {
          id: loadingToast,
        });
      } else {
        toast.error("Cloud synchronisation failed", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("A critical error occurred", { id: loadingToast });
    }
  };

  return (
    <AdminLayout title="Blog Management">
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        blog={currentBlog}
      />

      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Blog Posts
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage your organization's blog articles and updates
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Blog Post
        </button>
      </div>

      {/* Blogs List */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-green animate-spin" />
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                Fetching Articles...
              </p>
            </div>
          ) : blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <motion.div
                key={blog._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all"
              >
                {/* Left: Thumbnail + Info */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Thumbnail */}
                  <div className="w-24 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-primary-green text-white">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Title & Stats */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-blue-900 font-black text-base truncate">
                        {blog.title}
                      </h3>
                      {blog.featured && (
                        <span className="px-2 py-0.5 bg-primary-yellow/20 text-blue-900 text-[8px] font-black uppercase rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span className="text-primary-green">
                        {blog.category}
                      </span>
                      <span>{blog.readTime}</span>
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="py-2.5 px-4 bg-blue-50 text-blue-900 rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
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
                <FileText className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                No articles published yet
              </p>
              <button
                onClick={handleAddNew}
                className="mt-6 px-8 py-3 bg-primary-green text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary-green/20 transition-all hover:scale-105"
              >
                Create Article
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
