import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Users,
  FileText,
  Briefcase,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Image as ImageIcon,
  Clock,
  ExternalLink,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Views",
      value: "24.5k",
      change: "+12.5%",
      trendingUp: true,
      icon: Eye,
      color: "blue",
    },
    {
      label: "Active Blogs",
      value: "48",
      change: "+2",
      trendingUp: true,
      icon: FileText,
      color: "green",
    },
    {
      label: "Job Applications",
      value: "156",
      change: "+24",
      trendingUp: true,
      icon: Briefcase,
      color: "yellow",
    },
    {
      label: "New Members",
      value: "1,204",
      change: "-5%",
      trendingUp: false,
      icon: Users,
      color: "purple",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "Blog",
      action: "New post published",
      title: "Mthunzi Trust Expands Community Outreach",
      user: "Admin",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Career",
      action: "New application received",
      title: "Medical Officer position",
      user: "Website",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "Gallery",
      action: "Media updated",
      title: "Youth Workshop 2024 Gallery",
      user: "Joel C.",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "Program",
      action: "Content updated",
      title: "Holistic Health Initiative",
      user: "Admin",
      time: "2 days ago",
    },
  ];

  const QuickAction = ({ icon: Icon, title, desc, color }) => (
    <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group cursor-pointer relative overflow-hidden">
      <div
        className={`w-16 h-16 rounded-2xl bg-${color}-50 flex items-center justify-center text-${color}-600 mb-6 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-blue-900 font-black text-lg uppercase tracking-tight mb-2">
        {title}
      </h4>
      <p className="text-gray-400 text-sm font-medium leading-relaxed">
        {desc}
      </p>
      <div className="absolute top-8 right-8 w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Plus className="w-5 h-5 text-blue-900" />
      </div>
    </div>
  );

  return (
    <AdminLayout title="Overview">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  stat.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : stat.color === "green"
                    ? "bg-primary-green/10 text-primary-green"
                    : stat.color === "yellow"
                    ? "bg-primary-yellow/10 text-primary-yellow"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                <stat.icon className="w-7 h-7" />
              </div>
              <div
                className={`flex items-center gap-1 font-black text-xs uppercase tracking-widest ${
                  stat.trendingUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trendingUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              {stat.label}
            </p>
            <h3 className="text-4xl font-black text-blue-900 tracking-tighter">
              {stat.value}
            </h3>

            {/* Background Accent */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Chart Area Placeholder */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
                  Engagement Trajectory
                </h3>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                  Real-time performance metrics
                </p>
              </div>
              <div className="flex gap-2">
                {["7D", "1M", "1Y"].map((t) => (
                  <button
                    key={t}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      t === "1M"
                        ? "bg-blue-900 text-white"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-80 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-300 font-black uppercase tracking-widest text-[10px]">
                  Visualization Module Loading...
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
                Global Actions
              </h3>
              <button className="text-[10px] font-black text-primary-green uppercase tracking-widest border-b-2 border-primary-green/20 hover:border-primary-green transition-all pb-1">
                Customize Layout
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <QuickAction
                icon={FileText}
                title="New Post"
                desc="Draft a new impact story"
                color="green"
              />
              <QuickAction
                icon={Briefcase}
                title="Add Job"
                desc="Post a new career opening"
                color="blue"
              />
              <QuickAction
                icon={ImageIcon}
                title="Gallery"
                desc="Upload visual media assets"
                color="purple"
              />
            </div>
          </div>
        </div>

        {/* Sidebar - Recent Activity */}
        <div className="space-y-10">
          <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm h-full flex flex-col">
            <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter mb-8 decoration-primary-yellow decoration-4 underline-offset-8">
              Activity Logistics
            </h3>

            <div className="space-y-8 flex-1">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="relative pl-10 border-l border-gray-50 pb-8 last:pb-0"
                >
                  <div
                    className={`absolute -left-[1.25rem] top-0 w-10 h-10 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center`}
                  >
                    <Clock className="w-5 h-5 text-blue-900" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-gray-50 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">
                      {activity.type}
                    </span>
                    <span className="text-[10px] text-gray-300 font-bold">
                      {activity.time}
                    </span>
                  </div>
                  <h5 className="text-blue-900 font-black text-sm uppercase tracking-tight mb-1">
                    {activity.action}
                  </h5>
                  <p className="text-gray-400 text-xs font-medium italic mb-3">
                    "{activity.title}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary-green/20 text-primary-green flex items-center justify-center text-[8px] font-black">
                      {activity.user.charAt(0)}
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {activity.user}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-10 py-5 bg-blue-50 text-blue-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-blue-100 transition-all flex items-center justify-center gap-3">
              Full Log Repository <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
