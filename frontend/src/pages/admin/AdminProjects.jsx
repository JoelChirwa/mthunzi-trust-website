import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FolderKanban,
  Edit3,
  Trash2,
  Plus,
  Loader2,
  X,
  Save,
  Image as ImageIcon,
  Calendar,
  MapPin,
  DollarSign,
  Users as UsersIcon,
  Tag,
  CheckCircle2,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "Community",
    location: "",
    status: "Planning",
    startDate: "",
    endDate: "",
    budget: 0,
    beneficiaries: 0,
    description: "",
    featured: false,
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        startDate: project.startDate ? project.startDate.split("T")[0] : "",
        endDate: project.endDate ? project.endDate.split("T")[0] : "",
      });
    } else {
      setFormData({
        title: "",
        image: "",
        category: "Community",
        location: "",
        status: "Planning",
        startDate: "",
        endDate: "",
        budget: 0,
        beneficiaries: 0,
        description: "",
        featured: false,
      });
    }
  }, [project, isOpen]);

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

  const categories = [
    "Education",
    "Health",
    "Agriculture & Food Security",
    "Water & Sanitation",
    "Climate Change",
    "Women & Girls Empowerment",
    "Waste Management",
    "Other",
  ];
  const statuses = ["Planning", "In Progress", "Completed", "On Hold"];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-lg md:text-xl font-black text-blue-900 uppercase tracking-tighter">
                {project ? "Edit Project" : "Launch New Project"}
              </h3>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
                {project
                  ? "Update project details and track progress"
                  : "Create a new community impact project"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-xl md:rounded-2xl text-gray-400 hover:text-red-500 hover:shadow-lg transition-all border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            {/* Row 1: Title */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Community Water Supply Project"
                className="w-full px-6 py-4 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
              />
            </div>

            {/* Row 2: Image Upload */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                Project Cover Image
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

            {/* Row 3: Category, Location, Status */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                  <Tag className="w-3 h-3 inline mr-1" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g., Lilongwe District"
                  className="w-full px-4 py-3 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 transition-all"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Dates, Budget, Beneficiaries */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                  <DollarSign className="w-3 h-3 inline mr-1" />
                  Budget (MWK)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budget: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="w-full px-4 py-3 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                  <UsersIcon className="w-3 h-3 inline mr-1" />
                  Beneficiaries
                </label>
                <input
                  type="number"
                  value={formData.beneficiaries}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      beneficiaries: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="w-full px-4 py-3 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
                />
              </div>
            </div>

            {/* Row 6: Full Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                Full Description (HTML Supported)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Detailed project description..."
                rows={5}
                className="w-full px-6 py-4 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
              />
            </div>

            {/* Row 7: Featured Toggle */}
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
                Mark as Featured Project
              </label>
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
              disabled={isUploading}
              className={`w-full sm:w-auto px-8 py-4 bg-blue-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Save className="w-4 h-4" /> Save Project
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/projects"));
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
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
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Removing project...");
                try {
                  const response = await fetch(getApiUrl(`/projects/${id}`), {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                  });
                  if (response.ok) {
                    setProjects((prev) => prev.filter((p) => p._id !== id));
                    toast.success("Project removed successfully", {
                      id: loadingToast,
                    });
                  } else {
                    toast.error("Deletion failed", { id: loadingToast });
                  }
                } catch (error) {
                  console.error("Error deleting project:", error);
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
    setCurrentProject(null);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    const loadingToast = toast.loading(
      currentProject ? "Updating project..." : "Creating project..."
    );
    try {
      const url = currentProject
        ? getApiUrl(`/projects/${currentProject._id}`)
        : getApiUrl("/projects");

      const method = currentProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProjects();
        setIsModalOpen(false);
        toast.success(
          currentProject ? "Project updated!" : "Project created!",
          { id: loadingToast }
        );
      } else {
        toast.error("Operation failed", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("An error occurred", { id: loadingToast });
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      Planning: "bg-blue-100 text-blue-700",
      "In Progress": "bg-yellow-100 text-yellow-700",
      Completed: "bg-green-100 text-green-700",
      "On Hold": "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getCategoryBadge = (category) => {
    const colors = {
      Education: "bg-purple-100 text-purple-700",
      Health: "bg-red-100 text-red-700",
      "Agriculture & Food Security": "bg-green-100 text-green-700",
      "Water & Sanitation": "bg-blue-100 text-blue-700",
      "Climate Change": "bg-emerald-100 text-emerald-700",
      "Women & Girls Empowerment": "bg-pink-100 text-pink-700",
      "Waste Management": "bg-orange-100 text-orange-700",
      Other: "bg-gray-100 text-gray-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <AdminLayout title="Community Projects">
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        project={currentProject}
      />

      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Our Projects
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage community impact projects and track progress
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-green animate-spin" />
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                Loading Projects...
              </p>
            </div>
          ) : projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 hover:bg-gray-50/50 transition-all gap-4"
              >
                {/* Left: Icon + Info */}
                <div className="flex items-start gap-4 flex-1 w-full">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FolderKanban className="w-8 h-8 text-gray-300" />
                    )}
                  </div>

                  {/* Title and Details */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-blue-900 font-black text-sm md:text-base">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <Star className="w-4 h-4 text-primary-yellow fill-primary-yellow" />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${getCategoryBadge(
                          project.category
                        )}`}
                      >
                        {project.category}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${getStatusBadge(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                      <span className="px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-gray-100 text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </span>
                      {project.beneficiaries > 0 && (
                        <span className="px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-green-100 text-green-700 flex items-center gap-1">
                          <UsersIcon className="w-3 h-3" />
                          {project.beneficiaries.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2 w-full lg:w-auto">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 lg:flex-none py-2.5 px-4 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 lg:flex-none py-2.5 px-4 bg-red-50 text-red-500 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                <FolderKanban className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                No projects registered yet
              </p>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddNew}
                  className="px-6 py-3 bg-primary-green text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary-green/20 transition-all hover:scale-105"
                >
                  Create Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
