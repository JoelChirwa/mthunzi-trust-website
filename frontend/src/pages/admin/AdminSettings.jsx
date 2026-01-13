import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Smartphone,
  Mail,
  Save,
  Zap,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

const AdminSettings = () => {
  const [activeSegment, setActiveSegment] = useState("General");

  const segments = [
    { name: "General", icon: Globe, desc: "Global website configuration" },
    { name: "Security", icon: Shield, desc: "Authentication and protection" },
    {
      name: "Appearance",
      icon: Palette,
      desc: "Brand design & aesthetic setup",
    },
    { name: "Notifications", icon: Bell, desc: "System alerts and emails" },
    { name: "Integrations", icon: Zap, desc: "External API connections" },
  ];

  const SettingRow = ({ title, desc, children }) => (
    <div className="py-10 border-b border-gray-50 last:border-0 flex flex-col lg:flex-row justify-between gap-10">
      <div className="max-w-md">
        <h4 className="text-blue-900 font-black text-sm uppercase tracking-tight mb-2">
          {title}
        </h4>
        <p className="text-gray-400 text-xs font-medium leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="flex-1 max-w-xl">{children}</div>
    </div>
  );

  return (
    <AdminLayout title="System Logistics">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
        {/* Navigation Segments */}
        <div className="xl:col-span-1 space-y-3">
          {segments.map((seg) => (
            <button
              key={seg.name}
              onClick={() => setActiveSegment(seg.name)}
              className={`w-full p-6 rounded-[2.5rem] flex items-center gap-5 transition-all text-left group ${
                activeSegment === seg.name
                  ? "bg-white shadow-xl shadow-gray-200/50 border border-gray-100"
                  : "hover:bg-white/50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  activeSegment === seg.name
                    ? "bg-blue-900 text-white"
                    : "bg-gray-50 text-gray-400 group-hover:bg-white"
                }`}
              >
                <seg.icon className="w-5 h-5" />
              </div>
              <div>
                <p
                  className={`text-xs font-black uppercase tracking-widest ${
                    activeSegment === seg.name
                      ? "text-blue-900"
                      : "text-gray-400"
                  }`}
                >
                  {seg.name}
                </p>
                <p className="text-[10px] text-gray-300 font-bold mt-1 leading-tight">
                  {seg.desc}
                </p>
              </div>
            </button>
          ))}

          <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100/50 relative overflow-hidden">
            <Info className="w-10 h-10 text-blue-200 absolute -bottom-2 -right-2" />
            <h5 className="text-blue-900 font-black text-[10px] uppercase tracking-widest mb-2">
              Need Assistance?
            </h5>
            <p className="text-blue-700/60 text-[10px] font-medium leading-relaxed">
              Changes to system logistics may impact live website performance.
              Proceed with operational caution.
            </p>
          </div>
        </div>

        {/* Settings Form Area */}
        <div className="xl:col-span-3">
          <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative">
            <div className="flex justify-between items-center mb-12 pb-8 border-b border-gray-50">
              <div>
                <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
                  {activeSegment} Configuration
                </h3>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                  Operational ID: MT-LOG-{activeSegment.toUpperCase()}-2024
                </p>
              </div>
              <button className="h-14 px-10 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all">
                <Save className="w-4 h-4" /> Finalize Changes
              </button>
            </div>

            <div className="space-y-4">
              <SettingRow
                title="Organizational Identity"
                desc="Update company legal name and primary branding slogan exhibited in global headers and search engines."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                      Entity Legal Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Mthunzi Trust"
                      className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
                      Brand Slogan
                    </label>
                    <input
                      type="text"
                      defaultValue="The Umbrella of Hope"
                      className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>
              </SettingRow>

              <SettingRow
                title="Mission Control Email"
                desc="Primary contact address for system confirmations and organizational inquiries repository."
              >
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-900 transition-colors" />
                  <input
                    type="email"
                    defaultValue="info@mthunzi.org"
                    className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all"
                  />
                </div>
              </SettingRow>

              <SettingRow
                title="Operational Status"
                desc="Toggle public accessibility of the website. Maintenance mode will display a temporary landing buffer."
              >
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 w-fit">
                  <div className="w-12 h-6 bg-primary-green rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-900">
                    System Live
                  </span>
                </div>
              </SettingRow>

              <SettingRow
                title="Data Retention Protocol"
                desc="Configure how long analytical logs and interaction histories are stored within our secure cloud infrastructure."
              >
                <select className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-900 rounded-2xl px-6 py-4 outline-none font-bold text-sm transition-all appearance-none cursor-pointer">
                  <option>Standard Retention (12 Months)</option>
                  <option>Extended Archive (24 Months)</option>
                  <option>Minimum Compliance (3 Months)</option>
                </select>
              </SettingRow>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
