import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  MousePointer2,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { getApiUrl } from "../../utils/api";

const AdminAnalytics = () => {
  const [countryData, setCountryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeographicReach();
  }, []);

  const kpis = [
    {
      label: "Avg. Session",
      value: "4m 32s",
      change: "+12%",
      trendingUp: true,
      icon: Clock,
      color: "blue",
    },
    {
      label: "Bounce Rate",
      value: "32.4%",
      change: "-5%",
      trendingUp: true, // Lower bounce rate is better
      icon: MousePointer2,
      color: "green",
    },
    {
      label: "New Visitors",
      value: "1,284",
      change: "+18%",
      trendingUp: true,
      icon: Users,
      color: "purple",
    },
    {
      label: "Page Views",
      value: "12,405",
      change: "+7%",
      trendingUp: true,
      icon: Eye,
      color: "yellow",
    },
  ];

  const topContent = [
    { title: "Organization Programs", views: "5.2k", trend: "+12%" },
    { title: "Latest Community Blog", views: "3.8k", trend: "+8%" },
    { title: "Career Opportunities", views: "2.5k", trend: "+25%" },
    { title: "About Mthunzi Trust", views: "2.1k", trend: "+3%" },
  ];

  return (
    <AdminLayout title="Analytics">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Analytics Insights
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Detailed performance metrics and visitor behavior
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <Calendar className="w-4 h-4 text-gray-400 ml-2" />
          <select className="bg-transparent border-none text-xs font-bold text-blue-900 uppercase tracking-widest outline-none pr-4 py-2 cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 24 Hours</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  kpi.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : kpi.color === "green"
                    ? "bg-green-50 text-green-600"
                    : kpi.color === "purple"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                <kpi.icon className="w-5 h-5" />
              </div>
              <div
                className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                  kpi.trendingUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {kpi.trendingUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {kpi.change}
              </div>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              {kpi.label}
            </p>
            <h3 className="text-2xl font-black text-blue-900">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Visitors by Country */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-900" />
              <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">
                Geographic Reach
              </h3>
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Global Traffic Breakdown
            </span>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              // Loading Skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                    <div className="h-4 w-12 bg-gray-100 rounded" />
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 rounded-full" />
                </div>
              ))
            ) : countryData.length > 0 ? (
              countryData.map((data, index) => (
                <div key={data.country} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{data.flag}</span>
                      <span className="font-bold text-blue-900">
                        {data.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 font-medium text-xs">
                        {data.visitors?.toLocaleString()}
                      </span>
                      <span className="font-black text-blue-900 w-10 text-right">
                        {data.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.percentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary-green to-blue-900 rounded-full"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Globe className="w-12 h-12 text-gray-100 mb-4" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  No geographic data registered yet
                </p>
                <p className="text-gray-300 text-[10px] mt-1">
                  Visitor locations will appear here once users start
                  registering
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Top Content View */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-blue-900" />
            <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">
              Popular Pages
            </h3>
          </div>

          <div className="space-y-6">
            {topContent.map((content, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-default"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-blue-900 uppercase tracking-tight truncate mb-1">
                    {content.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400">
                      {content.views} Views
                    </span>
                  </div>
                </div>
                <div className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                  {content.trend}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
