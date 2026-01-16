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

  const insights = useMemo(() => {
    if (!stats || !viewsByDate.length) return [];

    const results = [];

    // Engagement Insight
    const subscriberRate =
      stats.visitors > 0 ? (stats.subscribers / stats.visitors) * 100 : 0;
    if (subscriberRate > 5) {
      results.push({
        id: 1,
        type: "success",
        title: "High Audience Loyalty",
        text: `Your visitor-to-subscriber conversion is at ${subscriberRate.toFixed(
          1
        )}%, which is significantly higher than average. Your community trust is strong.`,
        icon: Target,
      });
    } else {
      results.push({
        id: 1,
        type: "info",
        title: "Growth Opportunity",
        text: "Visitor-to-subscriber conversion is currently low. Consider optimizing lead magnets on your most popular programs.",
        icon: Info,
      });
    }

    // Traffic Trend Insight
    if (viewsByDate.length >= 14) {
      const last7Days = viewsByDate
        .slice(-7)
        .reduce((acc, curr) => acc + curr.views, 0);
      const prev7Days = viewsByDate
        .slice(-14, -7)
        .reduce((acc, curr) => acc + curr.views, 0);
      const trafficTrend =
        prev7Days > 0 ? ((last7Days - prev7Days) / prev7Days) * 100 : 0;

      if (trafficTrend > 10) {
        results.push({
          id: 2,
          type: "zap",
          title: "Traffic Momentum",
          text: `Weekly traffic is up by ${trafficTrend.toFixed(
            0
          )}%. Your recent organic reach is expanding rapidly.`,
          icon: Zap,
        });
      } else if (trafficTrend < -10) {
        results.push({
          id: 2,
          type: "warning",
          title: "Visibility Alert",
          text: `Views have dropped by ${Math.abs(trafficTrend).toFixed(
            0
          )}% this week. It might be time to share new updates or blogs.`,
          icon: AlertCircle,
        });
      }
    }

    // Impact Insight
    const appRate =
      stats.visitors > 0 ? (stats.applications / stats.visitors) * 100 : 0;
    if (appRate > 2) {
      results.push({
        id: 3,
        type: "success",
        title: "Exceptional Impact Interest",
        text: `A high percentage of visitors (${appRate.toFixed(
          1
        )}%) are actively applying for programs. Your mission is resonating.`,
        icon: Activity,
      });
    }

    // Session Intensity
    const sessionIntensity =
      stats.visitors > 0 ? (stats.pageViews / stats.visitors).toFixed(1) : 0;
    if (sessionIntensity > 2.5) {
      results.push({
        id: 4,
        type: "success",
        title: "Deep Engagement",
        text: `Visitors average ${sessionIntensity} pages per session. This indicates high interest in your multiple focus areas.`,
        icon: Search,
      });
    }

    return results;
  }, [stats, viewsByDate]);

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
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Growth Engine
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

        <div className="flex items-center gap-3 p-1.5 bg-gray-100/50 rounded-2xl border border-gray-100">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-white text-blue-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("audience")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "audience"
                ? "bg-white text-blue-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Audience
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 cursor-default">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </div>
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
                className="group relative bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.03] group-hover:scale-110 transition-transform ${kpi.bg}`}
                />

                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${kpi.bg} ${kpi.text}`}>
                    <kpi.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase">
                    <ArrowUpRight className="w-3 h-3" />
                    Live
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-blue-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 group-hover:from-blue-900 group-hover:to-blue-600">
                    {kpi.value}
                  </h3>
                  <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.15em] mt-1">
                    {kpi.label}
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 mt-2 flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {kpi.subLabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Main Visual Section */}
            <div className="lg:col-span-8 space-y-8">
              {/* Performance Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-900 flex items-center justify-center shadow-lg shadow-blue-900/20">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight leading-none">
                        Traffic Velocity
                      </h3>
                      <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
                        Engagement over time
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-72 flex items-end justify-between gap-2 px-2">
                  {viewsByDate.length > 0 ? (
                    viewsByDate.map((day, index) => (
                      <div
                        key={day.date}
                        className="flex-1 flex flex-col items-center gap-3 group relative h-full justify-end"
                      >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none whitespace-nowrap z-10 shadow-xl">
                          {day.views} Views
                        </div>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{
                            height: `${(day.views / maxViews) * 100}%`,
                          }}
                          transition={{
                            delay: index * 0.02,
                            duration: 0.7,
                            ease: "easeOut",
                          }}
                          className="w-full bg-gradient-to-t from-blue-900/5 via-blue-900/40 to-blue-600 rounded-t-xl group-hover:to-orange-500 transition-all duration-300 shadow-sm relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                        <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter truncate w-full text-center">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      <Calendar className="w-12 h-12 text-gray-100 mb-4" />
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        Generating data metrics...
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Actionable Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.length > 0 ? (
                  insights.map((insight, idx) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className={`p-6 rounded-[2rem] border relative overflow-hidden group ${
                        insight.type === "success"
                          ? "bg-emerald-50/50 border-emerald-100"
                          : insight.type === "zap"
                          ? "bg-orange-50/50 border-orange-100"
                          : insight.type === "warning"
                          ? "bg-rose-50/50 border-rose-100"
                          : "bg-blue-50/50 border-blue-100"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-2xl shadow-sm bg-white shrink-0 ${
                            insight.type === "success"
                              ? "text-emerald-500"
                              : insight.type === "zap"
                              ? "text-orange-500"
                              : insight.type === "warning"
                              ? "text-rose-500"
                              : "text-blue-500"
                          }`}
                        >
                          <insight.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-blue-900 uppercase mb-1 tracking-tight">
                            {insight.title}
                          </h4>
                          <p className="text-xs font-medium text-gray-600 leading-relaxed">
                            {insight.text}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.1 }}
                        className="absolute -right-4 -bottom-4"
                      >
                        <insight.icon className="w-20 h-20" />
                      </motion.div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full p-8 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                    <Search className="w-8 h-8 text-gray-200 mb-3" />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Computing Strategic Insights...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Visuals */}
            <div className="lg:col-span-4 space-y-8">
              {/* Popular Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">
                      Hot Content
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {popularPages.length > 0 ? (
                    popularPages.map((content, index) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all cursor-default"
                      >
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-black text-blue-900 uppercase truncate mb-1">
                            {content.title}
                          </h4>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-gray-300" />
                              <span className="text-[10px] font-bold text-gray-400">
                                {content.views.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-200" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase">
                              {content.trend}
                            </span>
                          </div>
                        </div>
                        <div className="p-2 rounded-xl group-hover:bg-blue-900 bg-gray-100 transition-colors">
                          <ArrowRight className="w-3 h-3 group-hover:text-white text-gray-400" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <MousePointer2 className="w-10 h-10 text-gray-100 mx-auto mb-4" />
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                        Awaiting interaction data
                      </p>
                    </div>
                  )}
                </div>

                <button className="w-full mt-8 py-4 px-6 rounded-2xl bg-blue-900 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                  Content Strategy Report
                </button>
              </motion.div>

              {/* Geo Reach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/30"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight">
                      Global Footprint
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {countryData.length > 0 ? (
                    countryData.slice(0, 5).map((data, index) => (
                      <div key={data.country} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{data.flag}</span>
                            <span className="font-bold text-sm tracking-tight opacity-90">
                              {data.country}
                            </span>
                          </div>
                          <span className="font-black text-emerald-400 text-xs">
                            {data.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${data.percentage}%` }}
                            transition={{
                              delay: 0.8 + index * 0.1,
                              duration: 1,
                            }}
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 opacity-30">
                      <Globe className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-[10px] font-bold uppercase tracking-widest">
                        Scanning World map...
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminAnalytics;
