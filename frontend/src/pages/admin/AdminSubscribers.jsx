import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  Trash2,
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl("subscribers"));
      const data = await response.json();
      if (response.ok) {
        setSubscribers(data);
      } else {
        toast.error("Failed to fetch subscribers");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ["Email", "Status", "Date Subscribed"],
      ...subscribers.map((s) => [
        s.email,
        s.status,
        new Date(s.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `subscribers_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = subscribers.filter((s) => {
    const matchesSearch = s.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">
              Newsletter <span className="text-primary-green">Subscribers</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Manage your community and export email lists
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={fetchSubscribers}
              className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:text-primary-green hover:border-primary-green transition-all shadow-sm"
              title="Refresh list"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={handleExport}
              disabled={subscribers.length === 0}
              className="flex items-center gap-3 px-6 py-3 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-yellow hover:text-blue-900 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Total Subscribers
                </p>
                <h3 className="text-2xl font-black text-blue-900">
                  {subscribers.length}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Active
                </p>
                <h3 className="text-2xl font-black text-blue-900">
                  {subscribers.filter((s) => s.status === "active").length}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Unsubscribed
                </p>
                <h3 className="text-2xl font-black text-blue-900">
                  {
                    subscribers.filter((s) => s.status === "unsubscribed")
                      .length
                  }
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary-green transition-all font-medium"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-10 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary-green appearance-none font-bold text-xs uppercase tracking-widest cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Email Address
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Joined Date
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-primary-green animate-spin" />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
                          Loading subscribers...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Mail className="w-12 h-12 text-gray-200" />
                        <p className="text-gray-400 font-bold">
                          No subscribers found matching your criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <tr
                      key={subscriber._id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="font-bold text-blue-900">
                          {subscriber.email}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            subscriber.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {subscriber.status === "active" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                        {new Date(subscriber.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                          title="Delete subscriber"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing {filteredSubscribers.length} of {subscribers.length}{" "}
              entries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscribers;
