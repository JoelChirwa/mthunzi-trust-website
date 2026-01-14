import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Globe,
  Mail,
  Save,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Loader2,
  CheckCircle,
  Palette,
  Search,
  ShieldAlert,
  Clock,
  Layout,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../../utils/api";
import { useSettings } from "../../context/SettingsContext";

const AdminSettings = () => {
  const { refreshSettings } = useSettings();
  const [formData, setFormData] = useState({
    organizationName: "",
    tagline: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    maintenanceMode: false,
    footerText: "",
    primaryColor: "",
    secondaryColor: "",
    workingHours: "",
    seoTitle: "",
    seoDescription: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getApiUrl("/settings"));
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const loadingToast = toast.loading("Updating configurations...");
    try {
      setIsSaving(true);
      const response = await fetch(getApiUrl("/settings"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Settings updated successfully", { id: loadingToast });
        setShowSuccess(true);
        refreshSettings();
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        toast.error("Failed to update settings", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("A critical error occurred", { id: loadingToast });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Settings">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary-green animate-spin mb-4" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
            Retrieving Configuration...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      <div className="max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
          {/* Success Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 py-4 bg-primary-green text-white text-center flex items-center justify-center gap-3 z-50 font-black uppercase tracking-widest text-xs"
              >
                <CheckCircle className="w-4 h-4" /> Settings updated
                successfully
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-gray-50 gap-6">
            <div>
              <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
                Organization Settings
              </h3>
              <p className="text-gray-400 text-xs font-medium mt-2">
                Update your organization's basic information and contact details
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="h-14 px-10 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 flex items-center gap-3 hover:translate-y-[-2px] disabled:opacity-50 disabled:translate-y-0 transition-all"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-10">
            {/* Basic Information */}
            <div>
              <h4 className="text-blue-900 font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary-green" />
                Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-blue-900 font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-green" />
                Contact Information
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                      Address
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-blue-900 font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <Facebook className="w-5 h-5 text-primary-green" />
                  <Instagram className="w-5 h-5 text-primary-green" />
                </div>
                Social Media Links
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    Facebook
                  </label>
                  <div className="relative group">
                    <Facebook className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    Twitter
                  </label>
                  <div className="relative group">
                    <Twitter className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    Instagram
                  </label>
                  <div className="relative group">
                    <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    LinkedIn
                  </label>
                  <div className="relative group">
                    <Linkedin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div>
              <h4 className="text-blue-900 font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-3">
                <Palette className="w-5 h-5 text-primary-green" />
                Appearance Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    Primary Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor || "#1e3a8a"}
                      onChange={handleChange}
                      className="h-14 w-14 rounded-2xl border-2 border-gray-200 p-1 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleChange}
                      placeholder="#1e3a8a"
                      className="flex-1 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    Secondary Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      name="secondaryColor"
                      value={formData.secondaryColor || "#10b981"}
                      onChange={handleChange}
                      className="h-14 w-14 rounded-2xl border-2 border-gray-200 p-1 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleChange}
                      placeholder="#10b981"
                      className="flex-1 bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEO & Content */}
            <div>
              <h4 className="text-blue-900 font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-3">
                <Search className="w-5 h-5 text-primary-green" />
                SEO & Content
              </h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                    SEO Description
                  </label>
                  <textarea
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-3xl px-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                      Footer Text
                    </label>
                    <div className="relative group">
                      <Layout className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="text"
                        name="footerText"
                        value={formData.footerText}
                        onChange={handleChange}
                        className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-900/70 ml-4">
                      Working Hours
                    </label>
                    <div className="relative group">
                      <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-900/60 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="text"
                        name="workingHours"
                        value={formData.workingHours}
                        onChange={handleChange}
                        className="w-full bg-gray-100/50 border-2 border-gray-200 focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm text-blue-900 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Site Status */}
            <div className="pt-6 border-t border-gray-50">
              <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-red-900 font-black text-sm uppercase tracking-tight">
                      Maintenance Mode
                    </h4>
                    <p className="text-red-600/70 text-[10px] font-bold uppercase tracking-widest mt-1">
                      Taking the site offline for maintenance
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={formData.maintenanceMode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maintenanceMode: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
