import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Plus,
  Search,
  Briefcase,
  MapPin,
  Trash2,
  Edit3,
  Calendar,
  X,
  Loader2,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const AdminJobs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "Lilongwe, Malawi",
    type: "Full-Time",
    deadline: "",
    description: "",
    requirements: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs`
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesTab = activeTab === "All" || job.type === activeTab;
    const matchesSearch = job.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      location: job.location,
      type: job.type,
      deadline: job.deadline
        ? new Date(job.deadline).toISOString().split("T")[0]
        : "",
      description: job.description,
      requirements: job.requirements?.join("\n") || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4 p-4 min-w-[300px]">
          <div>
            <p className="text-sm font-black text-blue-900 uppercase tracking-tight">
              Confirm Closing
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Are you sure you want to close this vacancy? This will remove it
              from the public careers page.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Closing vacancy...");
                try {
                  const response = await fetch(
                    `${
                      import.meta.env.VITE_API_URL ||
                      "http://localhost:5000/api"
                    }/jobs/${id}`,
                    { method: "DELETE" }
                  );
                  if (response.ok) {
                    fetchJobs();
                    toast.success("Vacancy closed successfully", {
                      id: loadingToast,
                    });
                  } else {
                    toast.error("Failed to close vacancy", {
                      id: loadingToast,
                    });
                  }
                } catch (error) {
                  console.error("Error deleting job:", error);
                  toast.error("An error occurred", { id: loadingToast });
                }
              }}
              className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all font-bold"
            >
              Close
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const loadingToast = toast.loading(
      editingJob ? "Updating vacancy..." : "Posting vacancy..."
    );
    try {
      const url = editingJob
        ? `${
            import.meta.env.VITE_API_URL || "http://localhost:5000/api"
          }/jobs/${editingJob._id}`
        : `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs`;

      const method = editingJob ? "PUT" : "POST";

      const payload = {
        ...formData,
        requirements: formData.requirements
          .split("\n")
          .filter((r) => r.trim() !== ""),
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingJob(null);
        setFormData({
          title: "",
          location: "Lilongwe, Malawi",
          type: "Full-Time",
          deadline: "",
          description: "",
          requirements: "",
        });
        fetchJobs();
        toast.success(editingJob ? "Vacancy updated!" : "Vacancy posted!", {
          id: loadingToast,
        });
      } else {
        toast.error("Cloud synchronization failed", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Fatal systems error", { id: loadingToast });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout title="Careers & Recruitment">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Open Vacancies
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage career opportunities and recruitment pipelines
          </p>
        </div>
        <button
          onClick={() => {
            setEditingJob(null);
            setFormData({
              title: "",
              location: "Lilongwe, Malawi",
              type: "Full-Time",
              deadline: "",
              description: "",
              requirements: "",
            });
            setIsModalOpen(true);
          }}
          className="h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar max-w-full">
          {[
            "All",
            "Full-Time",
            "Contract",
            "Part-Time",
            "Volunteer",
            "Internship",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
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
            placeholder="Search vacancies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-medium focus:border-blue-900 transition-all shadow-sm focus:shadow-md"
          />
        </div>
      </div>

      {/* Vacancy List */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
        <div className="divide-y divide-gray-100">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary-green animate-spin mb-4" />
                <p className="text-gray-400 font-medium">
                  Loading Vacancies...
                </p>
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 hover:bg-gray-50/50 transition-all group gap-6"
                >
                  {/* Left: Job Info */}
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 flex-shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-all">
                      <Briefcase className="w-7 h-7" />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-blue-900 font-black text-lg leading-tight uppercase tracking-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2">
                        <span className="flex items-center gap-1.5 text-primary-green text-[9px] font-black uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span
                          className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                            job.type === "Full-Time"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : job.type === "Contract"
                              ? "bg-orange-50 text-orange-600 border-orange-100"
                              : "bg-purple-50 text-purple-600 border-purple-100"
                          }`}
                        >
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & Deadline */}
                  <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => handleEdit(job)}
                        className="flex-1 sm:flex-none h-10 px-5 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="flex-1 sm:flex-none h-10 px-5 bg-red-50 text-red-500 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Close
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em] text-gray-400">
                      <Calendar className="w-3 h-3" />
                      Deadline:{" "}
                      <span className="text-red-400">
                        {job.deadline
                          ? new Date(job.deadline).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                  <Briefcase className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-lg font-black text-blue-900 uppercase tracking-tighter">
                  No vacancies found
                </h3>
                <p className="text-gray-400 text-xs font-medium mt-1">
                  Adjust your search or filters to see more results
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add/Edit Modal */}
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
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-green flex items-center justify-center text-white">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
                    {editingJob ? "Edit Vacancy" : "Post New Job"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-900/70 uppercase tracking-widest ml-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-5 py-3.5 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all text-sm font-bold text-blue-900 placeholder:text-gray-300"
                      placeholder="e.g. Program Coordinator"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-900/70 uppercase tracking-widest ml-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-5 py-3.5 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all text-sm font-bold text-blue-900 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-900/70 uppercase tracking-widest ml-1">
                      Job Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-5 py-3.5 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all text-sm font-bold text-blue-900"
                    >
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                      <option>Volunteer</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-900/70 uppercase tracking-widest ml-1">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={(e) =>
                        setFormData({ ...formData, deadline: e.target.value })
                      }
                      className="w-full px-5 py-3.5 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all text-sm font-bold text-blue-900"
                    />
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-900/70 uppercase tracking-widest ml-1">
                      Job Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-5 py-3.5 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all text-sm font-bold text-blue-900 placeholder:text-gray-300 leading-relaxed"
                      placeholder="Enter detailed job description..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-900/70 uppercase tracking-widest ml-1">
                      Requirements (one per line)
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirements: e.target.value,
                        })
                      }
                      className="w-full px-5 py-3.5 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all text-sm font-bold text-blue-900 placeholder:text-gray-300 leading-relaxed"
                      placeholder="e.g. Master's in Social Sciences&#10;5+ years experience"
                    />
                  </div>
                </div>
              </form>

              {/* Modal Footer - Fixed at bottom */}
              <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 bg-white text-gray-400 hover:text-blue-900 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="px-10 py-4 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] disabled:opacity-50 disabled:translate-y-0 transition-all font-bold"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {editingJob ? "Update Vacancy" : "Post Vacancy"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminJobs;
