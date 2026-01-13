import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminContentList = ({
  title,
  items = [],
  columns = [],
  onEdit,
  onDelete,
  onView,
  onAdd,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id || item.slug));
    }
  };

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <AdminLayout title={title}>
      {/* Action Bar */}
      <div className="flex flex-col xl:flex-row gap-4 lg:gap-6 justify-between items-stretch lg:items-center mb-6 lg:mb-10">
        <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full xl:w-auto">
          <div className="relative group flex-1 min-w-0">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-green transition-colors" />
            <input
              type="text"
              placeholder={`Search...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-8 py-3.5 lg:py-4 bg-white border border-gray-100 rounded-2xl lg:rounded-[2rem] shadow-sm outline-none focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5 transition-all font-medium text-sm"
            />
          </div>

          <button className="px-6 lg:px-8 h-12 lg:h-[56px] bg-white border border-gray-100 rounded-2xl lg:rounded-[2rem] shadow-sm flex items-center justify-center gap-3 text-blue-900 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 w-full xl:w-auto">
          <button className="flex-1 lg:flex-initial h-12 lg:h-[56px] px-6 lg:px-8 bg-white border border-gray-100 rounded-2xl lg:rounded-[2rem] shadow-sm flex items-center justify-center gap-3 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-900 transition-all truncate">
            <Download className="w-4 h-4" /> Export
          </button>
          <button
            onClick={onAdd}
            className="flex-1 lg:flex-initial h-12 lg:h-[56px] px-6 lg:px-10 bg-blue-900 text-white rounded-2xl lg:rounded-[2rem] shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-primary-green transition-all"
          >
            <Plus className="w-4 h-4" /> New Entry
          </button>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-3xl lg:rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="p-4 lg:p-8 w-10">
                  <div
                    onClick={toggleSelectAll}
                    className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                      selectedItems.length === items.length && items.length > 0
                        ? "bg-primary-green border-primary-green"
                        : "border-gray-200 hover:border-primary-green"
                    }`}
                  >
                    {selectedItems.length === items.length &&
                      items.length > 0 && (
                        <div className="w-2 h-2 bg-white rounded-sm" />
                      )}
                  </div>
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="p-4 lg:p-8 text-[10px] lg:text-[11px] font-black text-blue-900 uppercase tracking-widest whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="p-4 lg:p-8 text-[10px] lg:text-[11px] font-black text-blue-900 uppercase tracking-widest text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <motion.tr
                      key={item.id || item.slug}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4 lg:p-8">
                        <div
                          onClick={() => toggleItem(item.id || item.slug)}
                          className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                            selectedItems.includes(item.id || item.slug)
                              ? "bg-primary-green border-primary-green"
                              : "border-gray-200 hover:border-primary-green"
                          }`}
                        >
                          {selectedItems.includes(item.id || item.slug) && (
                            <div className="w-2 h-2 bg-white rounded-sm" />
                          )}
                        </div>
                      </td>
                      {columns.map((col) => (
                        <td key={col.key} className="p-4 lg:p-8">
                          {col.render ? (
                            col.render(item[col.key], item)
                          ) : (
                            <div className="flex flex-col min-w-[120px]">
                              <span className="text-blue-950 font-black text-xs lg:text-sm uppercase tracking-tight truncate max-w-[200px]">
                                {item[col.key]}
                              </span>
                              {col.subLabel && (
                                <span className="text-gray-400 text-[9px] lg:text-[10px] uppercase font-bold tracking-widest mt-1">
                                  {item[col.subKey]}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                      ))}
                      <td className="p-4 lg:p-8 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 lg:gap-3">
                          <button
                            onClick={() => onEdit && onEdit(item)}
                            className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all group/btn"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => onDelete && onDelete(item)}
                            className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all group/btn"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <div className="hidden sm:block w-px h-6 bg-gray-100 mx-1" />
                          <button className="hidden sm:flex w-10 h-10 rounded-xl bg-gray-50 text-gray-400 items-center justify-center hover:bg-white hover:text-blue-900 transition-all shadow-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + 2}
                      className="p-24 text-center"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200">
                          <AlertCircle className="w-10 h-10" />
                        </div>
                        <div>
                          <p className="text-blue-900 font-black uppercase tracking-widest text-sm">
                            No items found
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            Try adjusting your search or create a new entry.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-10 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Showing <span className="text-blue-900">1 to {items.length}</span>{" "}
            of {items.length} records
          </p>
          <div className="flex items-center gap-4">
            <button
              className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 hover:text-blue-900 hover:shadow-lg transition-all disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <button className="w-12 h-12 bg-blue-900 text-white rounded-2xl font-black text-xs">
                1
              </button>
            </div>
            <button
              className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 hover:text-blue-900 hover:shadow-lg transition-all disabled:opacity-50"
              disabled
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContentList;
