import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { jobsData } from "../../data/jobsData";
import {
  Plus,
  Search,
  Briefcase,
  MapPin,
  Clock,
  Trash2,
  Edit3,
  Users,
  Building2,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminJobs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [jobs, setJobs] = useState(jobsData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchesTab = activeTab === "All" || job.type === activeTab;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleEdit = (job) => console.log("Edit job:", job);
  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to close this vacancy?")) {
      setJobs(jobs.filter((j) => j.slug !== slug));
    }
  };
  const handleAddNew = () => console.log("Add new job");

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
          onClick={handleAddNew}
          className="h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar max-w-full">
          {["All", "Full-Time", "Contract", "Part-Time"].map((tab) => (
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
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 hover:bg-gray-50/50 transition-all group gap-6"
                >
                  {/* Left: Job Info */}
                  <div className="flex items-center gap-6 flex-1">
                    {/* Icon Container */}
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 flex-shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-all">
                      <Briefcase className="w-7 h-7" />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-blue-900 font-black text-lg leading-tight uppercase tracking-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2">
                        <span className="flex items-center gap-1.5 text-primary-green text-[9px] font-black uppercase tracking-widest">
                          <Building2 className="w-3.5 h-3.5" />
                          {job.department}
                        </span>
                        <span className="text-gray-400 text-[10px] font-bold border-l border-gray-100 pl-4 flex items-center gap-1.5">
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
                        onClick={() => handleDelete(job.slug)}
                        className="flex-1 sm:flex-none h-10 px-5 bg-red-50 text-red-500 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Close
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em] text-gray-400">
                      <Calendar className="w-3 h-3" />
                      Deadline:{" "}
                      <span className="text-red-400">{job.deadline}</span>
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
    </AdminLayout>
  );
};

export default AdminJobs;
