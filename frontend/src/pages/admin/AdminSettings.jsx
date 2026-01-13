import React, { useState } from "react";
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
} from "lucide-react";

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    organizationName: "Mthunzi Trust",
    tagline: "The Umbrella of Hope",
    email: "info@mthunzi.org",
    phone: "+265 996 654 088",
    address: "Lilongwe, Malawi",
    facebook: "https://facebook.com/mthunzitrust",
    twitter: "https://twitter.com/mthunzitrust",
    instagram: "https://instagram.com/mthunzitrust",
    linkedin: "https://linkedin.com/company/mthunzitrust",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving settings:", formData);
    // TODO: Implement actual save functionality
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-4xl">
        <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-12 pb-8 border-b border-gray-50">
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
              className="h-14 px-10 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all"
            >
              <Save className="w-4 h-4" /> Save Changes
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
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm transition-all"
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
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                      Address
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all"
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
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                    Facebook
                  </label>
                  <div className="relative group">
                    <Facebook className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                    Twitter
                  </label>
                  <div className="relative group">
                    <Twitter className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                    Instagram
                  </label>
                  <div className="relative group">
                    <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                    LinkedIn
                  </label>
                  <div className="relative group">
                    <Linkedin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
