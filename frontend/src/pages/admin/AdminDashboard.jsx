import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  MessageSquare,
  BarChart3,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Quick Stats
  const stats = [
    {
      label: "Team Members",
      value: "6",
      icon: Users,
      color: "blue",
    },
    {
      label: "Programs",
      value: "8",
      icon: Layers,
      color: "green",
    },
    {
      label: "Blog Posts",
      value: "12",
      icon: FileText,
      color: "yellow",
    },
    {
      label: "Careers",
      value: "4",
      icon: Briefcase,
      color: "purple",
    },
  ];

  // Analytics Data
  const analytics = [
    {
      label: "Total Website Visits",
      value: "24,563",
      change: "+12.5%",
      trendingUp: true,
      period: "Last 30 days",
    },
    {
      label: "Blog Engagement",
      value: "8,342",
      change: "+8.2%",
      trendingUp: true,
      period: "Last 30 days",
    },
    {
      label: "Program Interest",
      value: "3,128",
      change: "+15.3%",
      trendingUp: true,
      period: "Last 30 days",
    },
    {
      label: "Career Applications",
      value: "156",
      change: "-3.1%",
      trendingUp: false,
      period: "Last 30 days",
    },
  ];

  // Visitors by Country
  const countryData = [
    { country: "Malawi", visitors: 12450, percentage: 45, flag: "🇲🇼" },
    { country: "South Africa", visitors: 6890, percentage: 25, flag: "🇿🇦" },
    { country: "United Kingdom", visitors: 3520, percentage: 13, flag: "🇬🇧" },
    { country: "United States", visitors: 2980, percentage: 11, flag: "🇺🇸" },
    { country: "Others", visitors: 1660, percentage: 6, flag: "🌍" },
  ];

  const quickActions = [
    {
      icon: FileText,
      title: "Blogs",
      path: "/admin/blogs",
      color: "green",
    },
    {
      icon: Layers,
      title: "Programs",
      path: "/admin/programs",
      color: "blue",
    },
    {
      icon: Users,
      title: "Team",
      path: "/admin/team",
      color: "purple",
    },
    {
      icon: Briefcase,
      title: "Careers",
      path: "/admin/jobs",
      color: "yellow",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-sm font-medium mt-1">
          Here's what's happening with your organization
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  stat.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : stat.color === "green"
                    ? "bg-primary-green/10 text-primary-green"
                    : stat.color === "yellow"
                    ? "bg-primary-yellow/10 text-primary-yellow"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black text-blue-900">
                  {stat.value}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-900" />
          <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
            Analytics Overview
          </h3>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {analytics.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase mb-1">
                    {item.label}
                  </p>
                  <h4 className="text-3xl font-black text-blue-900">
                    {item.value}
                  </h4>
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                    item.trendingUp
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {item.trendingUp ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {item.change}
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.period}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visitors by Country */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-black text-blue-900 uppercase tracking-tight">
                Visitors by Country
              </h4>
              <p className="text-gray-400 text-xs mt-1">
                Geographic distribution of website visitors
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary-green">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-bold">27,500 Total</span>
            </div>
          </div>

          {/* Country List with Bars */}
          <div className="space-y-4">
            {countryData.map((data, index) => (
              <motion.div
                key={data.country}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{data.flag}</span>
                    <div>
                      <h5 className="text-blue-900 font-bold text-sm">
                        {data.country}
                      </h5>
                      <p className="text-gray-400 text-xs">
                        {data.visitors.toLocaleString()} visitors
                      </p>
                    </div>
                  </div>
                  <span className="text-blue-900 font-black text-sm">
                    {data.percentage}%
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary-green to-blue-900 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Layers className="w-6 h-6 text-blue-900" />
          <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
            Quick Actions
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(action.path)}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  action.color === "green"
                    ? "bg-primary-green/10 text-primary-green"
                    : action.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : action.color === "yellow"
                    ? "bg-primary-yellow/10 text-primary-yellow"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                <action.icon className="w-6 h-6" />
              </div>
              <h4 className="text-blue-900 font-black text-sm">
                {action.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
