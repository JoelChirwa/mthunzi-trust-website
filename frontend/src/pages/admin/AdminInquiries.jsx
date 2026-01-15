import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

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

  const columns = [
    {
      label: "Sender",
      key: "name",
      subLabel: true,
      subKey: "email",
    },
    {
      label: "Subject",
      key: "subject",
      render: (val) => (
        <span className="px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
          {val}
        </span>
      ),
    },
    {
      label: "Date",
      key: "createdAt",
      render: (val) => (
        <span className="text-gray-400 text-xs font-medium">
          {new Date(val).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

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
    <div className="relative">
      <AdminContentList
        title="Inquiries"
        items={inquiries}
        columns={columns}
        onView={(item) => setSelectedInquiry(item)}
        onDelete={handleDelete}
        onEdit={(item) => setSelectedInquiry(item)}
      />

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 lg:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 lg:p-12 border-b border-gray-50 flex justify-between items-start bg-gray-50/50">
                <div>
                  <div className="flex items-center gap-3 text-primary-green mb-3 lg:mb-4">
                    <Mail className="w-5 h-5" />
                    <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em]">
                      Direct Communication
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-3xl font-black text-blue-900 uppercase tracking-tighter leading-none mb-2">
                    {selectedInquiry.subject}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-8 lg:space-y-10">
                {/* Meta Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-blue-900/70 uppercase tracking-widest">
                          Sender Name
                        </p>
                        <p className="font-bold text-blue-900 truncate">
                          {selectedInquiry.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-blue-900/70 uppercase tracking-widest">
                          Email Address
                        </p>
                        <p className="font-bold text-blue-900 break-all text-sm lg:text-base">
                          {selectedInquiry.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100 flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-blue-900/70 uppercase tracking-widest">
                          Phone Number
                        </p>
                        <p className="font-bold text-blue-900">
                          {selectedInquiry.phone || "Not Provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 flex-shrink-0">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-blue-900/70 uppercase tracking-widest">
                          Inquiry Category
                        </p>
                        <p className="font-bold text-blue-900">
                          {selectedInquiry.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-gray-50 rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-10 relative">
                  <div className="absolute top-6 lg:top-8 right-6 lg:right-8 text-gray-200">
                    <MessageSquare className="w-8 h-8 lg:w-12 lg:h-12" />
                  </div>
                  <p className="text-[9px] font-black text-blue-900/60 uppercase tracking-[0.4em] mb-4 lg:mb-6">
                    Original Message
                  </p>
                  <p className="text-blue-950 font-medium leading-relaxed text-base lg:text-lg whitespace-pre-wrap relative z-10">
                    {selectedInquiry.message}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 lg:p-12 border-t border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                <button
                  onClick={() => handleDelete(selectedInquiry)}
                  className="px-6 h-12 lg:h-14 bg-red-50 text-red-500 rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 className="w-4 h-4" /> Delete Discovery
                </button>
                <div className="flex gap-4">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                    className="flex-1 sm:flex-none px-6 h-12 lg:px-10 lg:h-16 bg-blue-900 text-white rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:bg-primary-green hover:shadow-primary-green/20 transition-all"
                  >
                    Reply via Email <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
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
