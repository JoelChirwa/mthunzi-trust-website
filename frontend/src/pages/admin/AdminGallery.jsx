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
  Calendar,
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
      size: "2.4 MB",
    },
    {
      id: 2,
      type: "picture",
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
      title: "Tree Planting",
      date: "Jan 10, 2024",
      size: "1.8 MB",
    },
    {
      id: 3,
      type: "video",
      url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400",
      title: "Impact Story",
      date: "Jan 05, 2024",
      size: "14.5 MB",
    },
    {
      id: 4,
      type: "picture",
      url: "https://images.unsplash.com/photo-1524062794001-dc26bca829b7?w=400",
      title: "Farm Visit",
      date: "Dec 28, 2023",
      size: "3.1 MB",
    },
    {
      id: 5,
      type: "video",
      url: "https://images.unsplash.com/photo-1529390079861-159b978dd76c?w=400",
      title: "School Outreach",
      date: "Dec 20, 2023",
      size: "22.0 MB",
    },
    {
      id: 6,
      type: "picture",
      url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400",
      title: "Team Meeting",
      date: "Dec 15, 2023",
      size: "1.2 MB",
    },
  ];

  const filtered =
    activeTab === "All"
      ? mediaItems
      : mediaItems.filter(
          (m) => m.type.toLowerCase() === activeTab.slice(0, -1).toLowerCase()
        );

  const handleEdit = (item) => console.log("Edit:", item);
  const handleDelete = (id) => console.log("Delete:", id);
  const handleAdd = () => console.log("Add New Media");

  return (
    <AdminLayout title="Digital Assets">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Media Gallery
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage photos and videos for your organization
          </p>
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto">
          {/* Storage Mini-Card */}
          <div className="hidden sm:flex items-center gap-3 px-6 py-3 bg-blue-50 border border-blue-100 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-blue-900/40 uppercase tracking-widest">
                Storage Used
              </span>
              <span className="text-xs font-black text-blue-900">
                1.2 GB / 5 GB
              </span>
            </div>
            <div className="w-12 h-1 bg-blue-200 rounded-full overflow-hidden">
              <div className="w-[24%] h-full bg-blue-900" />
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 lg:flex-none h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all"
          >
            <Plus className="w-4 h-4" /> Add Asset
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
          {["All", "Pictures", "Videos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
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
            placeholder="Search assets..."
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-medium focus:border-blue-900 transition-all shadow-sm focus:shadow-md"
          />
        </div>
      </div>

      {/* Media List Format */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
        <div className="divide-y divide-gray-100">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all group"
              >
                {/* Left: Thumbnail and Title */}
                <div className="flex items-center gap-6 flex-1">
                  {/* Square Mini Thumbnail */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative shadow-sm border border-gray-100 flex-shrink-0">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    {/* Tiny type indicator icon */}
                    <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.type === "video" ? (
                        <Video className="w-4 h-4 text-white" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-blue-900 font-black text-base leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span
                        className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                          item.type === "video"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {item.type}
                      </span>
                      <span className="text-gray-400 text-[10px] font-medium border-l border-gray-100 pl-4 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </span>
                      <span className="text-gray-400 text-[10px] font-medium border-l border-gray-100 pl-4">
                        {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="h-10 px-5 bg-blue-50 text-blue-900 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="h-10 px-5 bg-red-50 text-red-500 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
