import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  TrendingUp,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  MousePointer2,
  Calendar,
  Zap,
  Target,
  Activity,
  Info,
  AlertCircle,
  BarChart3,
  Search,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiUrl } from "../../utils/api";

const AdminAnalytics = () => {
  const [countryData, setCountryData] = useState([]);
  const [stats, setStats] = useState(null);
  const [popularPages, setPopularPages] = useState([]);
  const [viewsByDate, setViewsByDate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchGeographicReach = async () => {
      try {
        const response = await fetch(getApiUrl("/analytics/geographic-reach"));
        const data = await response.json();
        if (data.success) {
          setCountryData(data.data);
        }
      } catch (error) {
        console.error("Error fetching geographic reach:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch(getApiUrl("/analytics/admin-stats"));
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    const fetchPopularPages = async () => {
      try {
        const response = await fetch(getApiUrl("/analytics/popular-pages"));
        const data = await response.json();
        if (data.success) {
          setPopularPages(data.data);
        }
      } catch (error) {
        console.error("Error fetching popular pages:", error);
      }
    };

    const fetchViewsByDate = async () => {
      try {
        const response = await fetch(getApiUrl("/analytics/views-by-date"));
        const data = await response.json();
        if (data.success) {
          setViewsByDate(data.data);
        }
      } catch (error) {
        console.error("Error fetching views by date:", error);
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchGeographicReach(),
        fetchStats(),
        fetchPopularPages(),
        fetchViewsByDate(),
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const kpis = [
    {
      label: "Active Outreach",
      value: stats ? (stats.programs || 0) + (stats.blogs || 0) : "0",
      subLabel: "Programs & Blogs",
      icon: TrendingUp,
      color: "from-blue-600 to-indigo-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Community Reach",
      value: stats ? stats.subscribers?.toLocaleString() : "0",
      subLabel: "Active Subscribers",
      icon: Users,
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Global Visitors",
      value: stats ? stats.visitors?.toLocaleString() : "0",
      subLabel: "Unique Interactions",
      icon: Globe,
      color: "from-purple-600 to-fuchsia-600",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      label: "Total Engagement",
      value: stats ? stats.pageViews?.toLocaleString() : "0",
      subLabel: "Lifetime Page Views",
      icon: Eye,
      color: "from-orange-500 to-amber-600",
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
  ];

  const maxViews = Math.max(...viewsByDate.map((v) => v.views), 10);

  return (
    <AdminLayout title="Analytics & Insights">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              Live Intelligence
            </span>
          </div>
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">
            Platform Analytics
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Real-time performance metrics and directional insights for Mthunzi
            Trust.
          </p>
        </div>

        <div className="flex items-center gap-3 p-1.5 bg-[#0b1224]/5 rounded-2xl border border-gray-100">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-wider ${
              activeTab === "overview"
                ? "bg-[#0b1224] text-white shadow-lg"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("audience")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-wider ${
              activeTab === "audience"
                ? "bg-[#0b1224] text-white shadow-lg"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Audience
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 animate-pulse rounded-3xl"
            />
          ))}
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-[#0b1224] p-6 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden"
              >
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.05] blur-3xl group-hover:opacity-[0.1] transition-opacity ${kpi.bg}`}
                />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${kpi.text}`}
                  >
                    <kpi.icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 text-blue-400 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                    Tracking
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">
                    {kpi.value}
                  </h3>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-1">
                    {kpi.label}
                  </p>
                  <p className="text-[9px] font-bold text-white/20 mt-3 flex items-center gap-1.5 bg-white/5 w-fit px-2 py-1 rounded-md">
                    <Activity className="w-3 h-3 text-blue-500/50" />
                    {kpi.subLabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              {/* Visitor Trends (Horizontal Bars) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0b1224] p-8 rounded-[2.5rem] text-white shadow-2xl border border-white/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Visitor Trends
                  </h3>
                  <span className="text-[10px] font-black uppercase text-white/20 tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    Last 7 Days
                  </span>
                </div>

                <div className="space-y-6">
                  {viewsByDate.length > 0 ? (
                    viewsByDate.slice(-7).map((day, index) => (
                      <div key={day.date} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-medium text-blue-200/60">
                          <span className="uppercase tracking-widest text-[10px] font-black">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="text-blue-400 font-bold bg-blue-400/10 px-2 py-0.5 rounded-md">
                            {day.views} visitors
                          </span>
                        </div>
                        <div className="w-full h-8 bg-white/5 rounded-xl border border-white/5 overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(day.views / maxViews) * 100}%`,
                            }}
                            transition={{
                              delay: index * 0.1,
                              duration: 1,
                              ease: "easeOut",
                            }}
                            className="h-full bg-gradient-to-r from-blue-600/20 to-blue-400/60 rounded-xl relative group-hover:from-blue-600/40 transition-all"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
                          </motion.div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center text-blue-200/40 italic">
                      No trend data available for this period
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Geographic Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0b1224] p-8 rounded-[2.5rem] text-white shadow-2xl border border-white/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    Geographic Distribution
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-emerald-500/60 tracking-widest">
                      Live Reach
                    </span>
                  </div>
                </div>

                {/* Geo Summary Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10 group hover:border-blue-500/30 transition-colors">
                    <p className="text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mb-2">
                      Avg. Session
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-2xl font-black text-white">4m 12s</h4>
                    </div>
                    <p className="text-rose-400 text-[10px] font-bold mt-2 flex items-center gap-1.5 bg-rose-400/10 w-fit px-2 py-0.5 rounded">
                      <ArrowDownRight className="w-3 h-3" />
                      -2.4%
                    </p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10 group hover:border-blue-500/30 transition-colors">
                    <p className="text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mb-2">
                      Countries
                    </p>
                    <h4 className="text-2xl font-black text-white">
                      {countryData.length}
                    </h4>
                    <p className="text-blue-400 text-[10px] font-bold mt-2 flex items-center gap-1.5 bg-blue-400/10 w-fit px-2 py-0.5 rounded">
                      Active Globally
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">
                    Visitors by Country
                  </p>
                  {countryData.length > 0 ? (
                    countryData.map((data, index) => {
                      const colors = [
                        "from-emerald-500/50 to-emerald-400",
                        "from-blue-500/50 to-blue-400",
                        "from-orange-500/50 to-orange-400",
                        "from-purple-500/50 to-purple-400",
                        "from-rose-500/50 to-rose-400",
                      ];
                      const color = colors[index % colors.length];

                      return (
                        <div
                          key={data.country}
                          className="flex items-center gap-6 group"
                        >
                          <span className="w-24 text-[10px] font-black text-white/60 uppercase truncate tracking-widest group-hover:text-white transition-colors">
                            {data.country}
                          </span>
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${data.percentage}%` }}
                              transition={{
                                delay: 0.5 + index * 0.1,
                                duration: 1,
                              }}
                              className={`h-full bg-gradient-to-r ${color} rounded-full`}
                            />
                          </div>
                          <span className="w-12 text-right text-[11px] font-black text-white/80">
                            {data.percentage}%
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-10 text-center text-blue-200/40">
                      Scanning global traffic...
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar Visuals */}
            <div className="lg:col-span-4 space-y-8">
              {/* Popular Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0b1224] p-8 rounded-[2.5rem] text-white shadow-2xl border border-white/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <Zap className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                      Hot Content
                    </h3>
                  </div>
                  <span className="text-[9px] font-black text-orange-500/60 uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                    Trending
                  </span>
                </div>

                <div className="space-y-3">
                  {popularPages.length > 0 ? (
                    popularPages.map((content, index) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all cursor-default"
                      >
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-black text-white uppercase truncate mb-1 tracking-wider">
                            {content.title}
                          </h4>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-3 h-3 text-white/20" />
                              <span className="text-[10px] font-bold text-white/40">
                                {content.views.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">
                              {content.trend}
                            </span>
                          </div>
                        </div>
                        <div className="p-2 rounded-xl group-hover:bg-blue-500 bg-white/5 border border-white/5 transition-colors">
                          <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <MousePointer2 className="w-10 h-10 text-white/5 mx-auto mb-4" />
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                        Awaiting interaction data
                      </p>
                    </div>
                  )}
                </div>

                <button className="w-full mt-8 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:border-blue-500 transition-all shadow-lg group">
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    Full Content Report
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminAnalytics;
