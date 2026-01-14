import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Edit3,
  Trash2,
  Plus,
  Building2,
  Loader2,
  X,
  Save,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const PartnerModal = ({ isOpen, onClose, onSave, partner }) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    url: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (partner) {
      setFormData(partner);
    } else {
      setFormData({
        name: "",
        logo: "",
        url: "",
      });
    }
  }, [partner, isOpen]);

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
        setFormData({ ...formData, logo: result.url });
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
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Modal Header */}
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
                {partner ? "Update Partner" : "New Partner"}
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                Organization Collaboration
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-gray-400 hover:text-red-500 hover:shadow-lg transition-all border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                Partner Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., World Health Organization"
                className="w-full px-6 py-4 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                Partner Logo
              </label>
              <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-sm overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center p-2">
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 text-primary-green animate-spin" />
                  ) : formData.logo ? (
                    <img
                      src={formData.logo}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-block px-6 py-3 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl cursor-pointer hover:bg-primary-green hover:shadow-lg transition-all">
                    {formData.logo ? "Change Logo" : "Upload Logo"}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-1">
                Website URL
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60" />
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full pl-14 pr-6 py-4 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-primary-green rounded-2xl outline-none text-sm font-bold text-blue-900 placeholder:text-gray-300 transition-all"
                />
              </div>
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
              <Save className="w-4 h-4" /> Save Partner
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/partners"));
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (partner) => {
    setCurrentPartner(partner);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4 p-4 min-w-[300px]">
          <div>
            <p className="text-sm font-black text-blue-900 uppercase tracking-tight">
              Confirm Removal
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Are you sure you want to delete this partner?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Removing partner...");
                try {
                  const response = await fetch(getApiUrl(`/partners/${id}`), {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                  });
                  if (response.ok) {
                    fetchPartners();
                    toast.success("Partner removed", { id: loadingToast });
                  } else {
                    toast.error("Deletion failed", { id: loadingToast });
                  }
                } catch (error) {
                  console.error("Error deleting partner:", error);
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
    setCurrentPartner(null);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    const loadingToast = toast.loading(
      currentPartner ? "Updating partner..." : "Adding partner..."
    );
    try {
      const url = currentPartner
        ? getApiUrl(`/partners/${currentPartner._id}`)
        : getApiUrl("/partners");

      const method = currentPartner ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPartners();
        setIsModalOpen(false);
        toast.success(currentPartner ? "Partner updated!" : "Partner added!", {
          id: loadingToast,
        });
      } else {
        toast.error("Failed to save partner", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error saving partner:", error);
      toast.error("Communication error", { id: loadingToast });
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AdminLayout title="Partners">
      <PartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        partner={currentPartner}
      />

      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Our Partners
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage your organization's partnerships and collaborations
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary-green animate-spin" />
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                Loading Partners...
              </p>
            </div>
          ) : partners.length > 0 ? (
            partners.map((partner, index) => (
              <motion.div
                key={partner._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-blue-900 font-black text-lg shadow-sm flex-shrink-0 overflow-hidden border border-gray-100 p-2">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-900 to-primary-green flex items-center justify-center text-white">
                        {getInitials(partner.name)}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-blue-900 font-black text-lg">
                      {partner.name}
                    </h3>
                    {partner.url && (
                      <p className="text-primary-green text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <LinkIcon className="w-3 h-3" />{" "}
                        {(() => {
                          try {
                            const url = partner.url.startsWith("http")
                              ? partner.url
                              : `https://${partner.url}`;
                            return new URL(url).hostname;
                          } catch (e) {
                            return partner.url;
                          }
                        })()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="py-2.5 px-4 bg-blue-50 text-blue-900 rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id)}
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
                <Building2 className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                No partners found
              </p>
              <button
                onClick={handleAddNew}
                className="mt-6 px-8 py-3 bg-primary-green text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary-green/20"
              >
                Add Your First Partner
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPartners;
