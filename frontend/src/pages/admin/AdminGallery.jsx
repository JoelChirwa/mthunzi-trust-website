import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Plus,
  Search,
  Image as ImageIcon,
  Video,
  Trash2,
  Edit3,
  Eye,
  Filter,
  MoreHorizontal,
  UploadCloud,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminGallery = () => {
  const [activeTab, setActiveTab] = useState("All");

  const mediaItems = [
    {
      id: 1,
      type: "picture",
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
      title: "Youth Workshop",
      date: "Jan 12, 2024",
      size: "2.4MB",
    },
    {
      id: 2,
      type: "picture",
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
      title: "Tree Planting",
      date: "Jan 10, 2024",
      size: "1.8MB",
    },
    {
      id: 3,
      type: "video",
      url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400",
      title: "Impact Story",
      date: "Jan 05, 2024",
      size: "14.5MB",
    },
    {
      id: 4,
      type: "picture",
      url: "https://images.unsplash.com/photo-1524062794001-dc26bca829b7?w=400",
      title: "Farm Visit",
      date: "Dec 28, 2023",
      size: "3.1MB",
    },
    {
      id: 5,
      type: "video",
      url: "https://images.unsplash.com/photo-1529390079861-159b978dd76c?w=400",
      title: "School Outreach",
      date: "Dec 20, 2023",
      size: "22.0MB",
    },
    {
      id: 6,
      type: "picture",
      url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400",
      title: "Team Meeting",
      date: "Dec 15, 2023",
      size: "1.2MB",
    },
  ];

  const filtered =
    activeTab === "All"
      ? mediaItems
      : mediaItems.filter(
          (m) => m.type.toLowerCase() === activeTab.slice(0, -1).toLowerCase()
        );

  return (
    <AdminLayout title="Digital Assets">
      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[3.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center group hover:border-primary-green hover:bg-primary-green/5 transition-all cursor-pointer min-h-[300px]">
            <div className="w-20 h-20 bg-primary-green/10 text-primary-green rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter mb-2">
              Drop New Media Assets
            </h3>
            <p className="text-gray-400 text-sm font-medium max-w-sm">
              Drag and drop photos or videos here. We'll automatically optimize
              them for the web gallery.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-green">
                <CheckCircle2 className="w-4 h-4" /> Auto-Compression
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-green">
                <CheckCircle2 className="w-4 h-4" /> SEO Metadata
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-900 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-4 leading-none">
                Curation Analytics
              </h3>
              <p className="text-white/60 text-sm font-medium leading-relaxed">
                Your media storage is current active and healthy across our CDN.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                  Storage Used
                </p>
                <p className="text-white font-black text-lg">1.2 GB / 5 GB</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[24%] h-full bg-primary-green" />
              </div>
            </div>
          </div>
          {/* Accent icons */}
          <Layers className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
        </div>
      </div>

      {/* Media Filter Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
        <div className="flex gap-2 p-1.5 bg-white rounded-3xl border border-gray-100">
          {["All", "Pictures", "Videos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-blue-900 text-white shadow-lg"
                  : "text-gray-400 hover:text-blue-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative group min-w-[300px]">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-green" />
          <input
            type="text"
            placeholder="Search media library..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[2rem] outline-none text-sm font-medium"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={item.id}
              className="group relative"
            >
              <div className="aspect-[4/5] bg-gray-100 rounded-[2.5rem] overflow-hidden relative shadow-sm border border-gray-100">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Media Type Overlay */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                  {item.type === "video" ? (
                    <Video className="w-5 h-5" />
                  ) : (
                    <ImageIcon className="w-5 h-5" />
                  )}
                </div>

                {/* Operations Overlay */}
                <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-between backdrop-blur-sm">
                  <div className="flex justify-between items-start">
                    <div className="bg-primary-yellow/20 px-3 py-1 rounded-full text-primary-yellow font-black text-[8px] uppercase tracking-widest border border-primary-yellow/10">
                      {item.size}
                    </div>
                    <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-900 hover:bg-primary-green hover:text-white transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <h5 className="text-white font-black uppercase tracking-tight text-sm mb-1">
                      {item.title}
                    </h5>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      {item.date}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button className="py-3 bg-white text-blue-900 rounded-xl flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-widest hover:bg-primary-green hover:text-white transition-all">
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button className="py-3 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
