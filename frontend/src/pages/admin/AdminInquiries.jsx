import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminContentList from "./AdminContentList";
import {
  Mail,
  Trash2,
  Eye,
  Clock,
  User,
  Phone,
  Tag,
  MessageSquare,
  Loader2,
  X,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/inquiries"));
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(getApiUrl(`/inquiries/${id}/status`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setInquiries((prev) =>
          prev.map((iq) => (iq._id === id ? { ...iq, status: newStatus } : iq))
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = (inquiry) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4 p-4 min-w-[300px]">
          <div>
            <p className="text-sm font-black text-blue-900 uppercase tracking-tight">
              Confirm Deletion
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Are you sure you want to delete the inquiry from{" "}
              <span className="font-bold text-blue-900">{inquiry.name}</span>?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Removing inquiry...");
                try {
                  const response = await fetch(
                    getApiUrl(`/inquiries/${inquiry._id}`),
                    { method: "DELETE" }
                  );
                  if (response.ok) {
                    setInquiries((prev) =>
                      prev.filter((iq) => iq._id !== inquiry._id)
                    );
                    if (selectedInquiry?._id === inquiry._id)
                      setSelectedInquiry(null);
                    toast.success("Inquiry removed", { id: loadingToast });
                  } else {
                    toast.error("Failed to remove inquiry", {
                      id: loadingToast,
                    });
                  }
                } catch (error) {
                  console.error("Error deleting inquiry:", error);
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

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    if (inquiry.status === "New") {
      updateStatus(inquiry._id, "Read");
    }
  };

  const filteredInquiries = inquiries.filter((iq) => {
    const matchesStatus = statusFilter === "All" || iq.status === statusFilter;
    const matchesSearch =
      iq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      label: "Status",
      key: "status",
      render: (val) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              val === "New"
                ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                : val === "Replied"
                ? "bg-emerald-500"
                : "bg-gray-300"
            }`}
          />
          <span
            className={`text-[9px] font-black uppercase tracking-[0.15em] ${
              val === "New"
                ? "text-blue-600"
                : val === "Replied"
                ? "text-emerald-600"
                : "text-gray-400"
            }`}
          >
            {val}
          </span>
        </div>
      ),
    },
    {
      label: "Sender",
      key: "name",
      subLabel: true,
      subKey: "email",
    },
    {
      label: "Category",
      key: "subject",
      render: (val) => (
        <span className="px-3 py-1 bg-gray-100 text-blue-900 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-200">
          {val}
        </span>
      ),
    },
    {
      label: "Received",
      key: "createdAt",
      render: (val) => (
        <div className="flex flex-col">
          <span className="text-blue-950 text-xs font-bold">
            {new Date(val).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="text-gray-400 text-[9px] font-medium uppercase tracking-tighter">
            {new Date(val).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ),
    },
  ];

  const CustomFilters = () => (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl border border-gray-200">
      {["All", "New", "Read", "Replied"].map((status) => (
        <button
          key={status}
          onClick={() => setStatusFilter(status)}
          className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
            statusFilter === status
              ? "bg-white text-blue-900 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-40">
        <Loader2 className="w-12 h-12 text-primary-green animate-spin mb-4" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
          Awaiting Correspondence...
        </p>
      </div>
    );
  }

  return (
    <AdminLayout title="Inbox & Correspondence">
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 lg:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-blue-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-4xl bg-[#0b1224] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-white/10"
            >
              {/* Premium Dark Header */}
              <div className="p-8 lg:p-12 border-b border-white/5 flex justify-between items-start bg-gradient-to-b from-white/[0.03] to-transparent">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          selectedInquiry.status === "New"
                            ? "bg-blue-500 animate-pulse"
                            : "bg-gray-500"
                        }`}
                      />
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                        Status: {selectedInquiry.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                      <Clock className="w-3 h-3 text-white/30" />
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                        {new Date(selectedInquiry.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-4xl font-black text-white uppercase tracking-tighter leading-tight max-w-2xl">
                    {selectedInquiry.subject}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-3 lg:p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modern Grid Body */}
              <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 bg-transparent custom-scrollbar">
                {/* Contact Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col gap-1 items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-2 text-blue-400">
                      <User className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                      Sender
                    </span>
                    <p className="text-white font-black text-lg">
                      {selectedInquiry.name}
                    </p>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col gap-1 items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-2 text-orange-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                      Email
                    </span>
                    <p className="text-white font-bold text-sm truncate w-full px-2">
                      {selectedInquiry.email}
                    </p>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col gap-1 items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-2 text-emerald-400">
                      <Phone className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                      Phone
                    </span>
                    <p className="text-white font-black text-lg">
                      {selectedInquiry.phone || "--"}
                    </p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                      Message Content
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="relative p-10 lg:p-14 rounded-[3rem] bg-white/[0.01] border border-white/5 overflow-hidden">
                    <MessageSquare className="absolute -top-10 -right-10 w-40 h-40 text-white/[0.02] rotate-12" />
                    <p className="text-white/80 text-xl lg:text-2xl font-medium leading-relaxed whitespace-pre-wrap relative z-10 selection:bg-blue-500/30">
                      {selectedInquiry.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-8 lg:p-12 border-t border-white/5 bg-white/[0.02] flex flex-col sm:flex-row gap-6 justify-between items-stretch">
                <button
                  onClick={() => handleDelete(selectedInquiry)}
                  className="px-8 h-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all group"
                >
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />{" "}
                  Purge Record
                </button>

                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedInquiry.status !== "Replied" && (
                    <button
                      onClick={() =>
                        updateStatus(selectedInquiry._id, "Replied")
                      }
                      className="px-8 h-14 bg-white/5 border border-white/10 text-white/60 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 hover:text-white transition-all"
                    >
                      Mark as Handled
                    </button>
                  )}
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                    onClick={() => updateStatus(selectedInquiry._id, "Replied")}
                    className="px-10 h-16 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl shadow-blue-600/20 hover:bg-blue-500 hover:-translate-y-1 transition-all group active:scale-95"
                  >
                    Initiate Reply
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">
                Live Intelligence Center
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter leading-none">
              Inbound Inbox
            </h2>
            <p className="text-gray-400 font-bold text-sm tracking-tight">
              Reviewing {inquiries.length} operational inquiries from your
              global audience.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-64 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search inbox..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border border-transparent shadow-sm rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-sm"
              />
            </div>
          </div>
        </div>

        {/* Global Filters */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
          {["All", "New", "Read", "Replied"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                statusFilter === status
                  ? "bg-blue-900 text-white shadow-xl shadow-blue-900/20"
                  : "text-gray-400 hover:bg-gray-50 hover:text-blue-900"
              }`}
            >
              {status}
            </button>
          ))}
          <div className="h-6 w-px bg-gray-100 mx-2 hidden md:block" />
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-auto px-4 hidden md:block">
            Found {filteredInquiries.length} results
          </p>
        </div>

        {/* Content List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((iq, index) => (
                <motion.div
                  key={iq._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleView(iq)}
                  className={`group relative bg-white p-6 md:p-8 rounded-[2rem] border transition-all cursor-pointer hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 overflow-hidden ${
                    iq.status === "New"
                      ? "border-blue-100 shadow-xl shadow-blue-500/[0.03]"
                      : "border-gray-50 bg-white/60"
                  }`}
                >
                  {/* Status Highlight Bar */}
                  {iq.status === "New" && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"
                    />
                  )}

                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Icon/Avatar Placeholder */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${
                          iq.status === "New"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                        }`}
                      >
                        <User className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Content Snippet */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <h4
                            className={`text-lg font-black uppercase tracking-tight truncate max-w-[200px] md:max-w-md ${
                              iq.status === "New"
                                ? "text-blue-900"
                                : "text-gray-500"
                            }`}
                          >
                            {iq.name}
                          </h4>
                          {iq.status === "New" && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                          {new Date(iq.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p
                          className={`text-sm font-black uppercase tracking-widest ${
                            iq.status === "New"
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        >
                          {iq.subject}
                        </p>
                        <p className="text-gray-400 font-medium text-xs line-clamp-1 break-words">
                          {iq.message}
                        </p>
                      </div>
                    </div>

                    {/* Action Palette (Hovered) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(iq);
                        }}
                        className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-[3rem] flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
                  Inbox Clear
                </h3>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">
                  No correspondence matches the current filter.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
};

const ArrowRight = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

export default AdminInquiries;
