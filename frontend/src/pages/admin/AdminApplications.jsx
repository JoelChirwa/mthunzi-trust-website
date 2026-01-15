import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  FileText,
  Trash2,
  ExternalLink,
  ChevronRight,
  User,
  MapPin,
  Heart,
  Users,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("applications"));
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (filteredApplications.length === 0) {
      toast.error("No applications to export");
      return;
    }

    const loadingToast = toast.loading("Preparing export...");

    try {
      // Define CSV headers
      const headers = [
        "Full Name",
        "Email",
        "Phone",
        "Gender",
        "Age",
        "Location",
        "Disability Status",
        "Job Title",
        "Status",
        "Applied Date",
        "LinkedIn",
      ];

      // Map data to CSV rows
      const rows = filteredApplications.map((app) => [
        app.fullName,
        app.email,
        app.phone,
        app.gender,
        app.age,
        app.location,
        app.disabilityStatus,
        app.jobId?.title || "N/A",
        app.status,
        new Date(app.createdAt).toLocaleDateString(),
        app.linkedIn || "N/A",
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `applications_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Exported ${filteredApplications.length} applications`, {
        id: loadingToast,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export applications", { id: loadingToast });
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(getApiUrl(`applications/${id}/status`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Status updated");
        fetchApplications();
        if (selectedApp?._id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
      }
    } catch (error) {
      toast.error("Failed to update status");
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
              Are you sure you want to delete this application? This action
              cannot be undone.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Deleting application...");
                try {
                  const response = await fetch(
                    getApiUrl(`applications/${id}`),
                    {
                      method: "DELETE",
                    }
                  );
                  if (response.ok) {
                    fetchApplications();
                    setSelectedApp(null);
                    toast.success("Application deleted successfully", {
                      id: loadingToast,
                    });
                  } else {
                    toast.error("Failed to delete application", {
                      id: loadingToast,
                    });
                  }
                } catch (error) {
                  console.error("Error deleting application:", error);
                  toast.error("An error occurred", { id: loadingToast });
                }
              }}
              className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000, position: "top-center" }
    );
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobId?.title?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "reviewed":
        return "bg-blue-100 text-blue-700";
      case "accepted":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <AdminLayout title="Job Applications">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Received Applications
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Review and manage incoming candidate submissions
          </p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={applications.length === 0}
          className="h-14 px-8 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 flex items-center gap-3 hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <FileText className="w-4 h-4" /> Export to CSV
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Total
            </span>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-3xl font-black text-blue-900">
            {applications.length}
          </p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest">
              Pending
            </span>
            <Clock className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-3xl font-black text-yellow-700">
            {applications.filter((app) => app.status === "pending").length}
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
              Reviewed
            </span>
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-blue-700">
            {applications.filter((app) => app.status === "reviewed").length}
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-3xl border border-green-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">
              Shortlisted
            </span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-3xl font-black text-green-700">
            {applications.filter((app) => app.status === "shortlisted").length}
          </p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
              Accepted
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-700">
            {applications.filter((app) => app.status === "accepted").length}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or job title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-medium focus:border-blue-900 transition-all shadow-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-6 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-bold text-blue-900"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 text-primary-green animate-spin" />
            </div>
          ) : filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <motion.div
                key={app._id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedApp(app)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  selectedApp?._id === app._id
                    ? "bg-blue-900 border-blue-900 text-white shadow-xl"
                    : "bg-white border-gray-100 hover:border-blue-900/40"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      selectedApp?._id === app._id
                        ? "bg-white/20 text-white"
                        : getStatusColor(app.status)
                    }`}
                  >
                    {app.status}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      selectedApp?._id === app._id
                        ? "text-white/60"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-black uppercase tracking-tight text-sm mb-1">
                  {app.fullName}
                </h4>
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest truncate ${
                    selectedApp?._id === app._id
                      ? "text-white/60"
                      : "text-gray-400"
                  }`}
                >
                  {app.jobId?.title || "Unknown Position"}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-bold uppercase">
                No applications found
              </p>
            </div>
          )}
        </div>

        {/* Application Details */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedApp ? (
              <motion.div
                key={selectedApp._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden"
              >
                {/* Detail Header */}
                <div className="p-8 lg:p-12 bg-gray-50 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-blue-900 flex items-center justify-center text-white shadow-xl uppercase font-black text-2xl">
                        {selectedApp.fullName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">
                          {selectedApp.fullName}
                        </h3>
                        <p className="text-primary-green font-bold uppercase tracking-widest text-xs mt-1">
                          Applied for: {selectedApp.jobId?.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(selectedApp._id)}
                        className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Delete Application"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detail Content */}
                <div className="p-8 lg:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-6">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Candidate Information
                      </h5>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-blue-900">
                          <Mail className="w-4 h-4 text-primary-green" />
                          <span className="font-bold text-sm">
                            {selectedApp.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-blue-900">
                          <Phone className="w-4 h-4 text-primary-green" />
                          <span className="font-bold text-sm">
                            {selectedApp.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-blue-900">
                          <MapPin className="w-4 h-4 text-primary-green" />
                          <span className="font-bold text-sm">
                            {selectedApp.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-blue-900">
                          <ExternalLink className="w-4 h-4 text-primary-green" />
                          <a
                            href={selectedApp.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-sm text-blue-600 underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Demographics & Status
                      </h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <p className="text-[8px] font-black text-gray-400 uppercase mb-1">
                            Gender
                          </p>
                          <p className="text-blue-900 font-bold uppercase text-xs">
                            {selectedApp.gender}
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <p className="text-[8px] font-black text-gray-400 uppercase mb-1">
                            Age
                          </p>
                          <p className="text-blue-900 font-bold text-xs">
                            {selectedApp.age} Years
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <p className="text-[8px] font-black text-gray-400 uppercase mb-1">
                            Disability
                          </p>
                          <p className="text-blue-900 font-bold uppercase text-xs">
                            {selectedApp.disabilityStatus}
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <p className="text-[8px] font-black text-gray-400 uppercase mb-1">
                            Current Status
                          </p>
                          <span
                            className={`inline-block px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${getStatusColor(
                              selectedApp.status
                            )}`}
                          >
                            {selectedApp.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Why fit? / Cover Letter
                      </h5>
                      <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 text-blue-900 text-sm leading-relaxed whitespace-pre-line">
                        {selectedApp.coverLetter}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Attachments
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a
                          href={selectedApp.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:border-primary-green transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-red-500" />
                            <span className="font-bold text-xs text-blue-900">
                              Curriculum Vitae (CV)
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-green" />
                        </a>

                        {selectedApp.certificates?.map((cert, idx) => (
                          <a
                            key={idx}
                            href={cert}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:border-primary-green transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-primary-green" />
                              <span className="font-bold text-xs text-blue-900">
                                Certificate {idx + 1}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-green" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest w-full mb-2">
                      Update Status To:
                    </span>
                    <button
                      onClick={() => updateStatus(selectedApp._id, "reviewed")}
                      className="px-6 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 hover:text-white transition-all"
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() =>
                        updateStatus(selectedApp._id, "shortlisted")
                      }
                      className="px-6 py-2.5 rounded-xl bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest hover:bg-green-700 hover:text-white transition-all"
                    >
                      Shortlisted
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp._id, "rejected")}
                      className="px-6 py-2.5 rounded-xl bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all"
                    >
                      Rejected
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp._id, "accepted")}
                      className="px-6 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:text-white transition-all"
                    >
                      Accepted
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-20 text-center bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
                  <User className="w-16 h-16 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
                  Select a Candidate
                </h3>
                <p className="text-gray-400 max-w-sm mx-auto mt-2 font-medium">
                  Click on an application from the list to view full candidate
                  details and files.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminApplications;
