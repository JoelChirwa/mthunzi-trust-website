import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Edit3, Trash2, Plus, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const AdminPartners = () => {
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "World Health Organization",
      logo: null,
    },
    {
      id: 2,
      name: "Ministry of Health - Malawi",
      logo: null,
    },
    {
      id: 3,
      name: "UNICEF Malawi",
      logo: null,
    },
    {
      id: 4,
      name: "Local Community Council",
      logo: null,
    },
  ]);

  const handleEdit = (partner) => {
    console.log("Edit partner:", partner);
    // TODO: Open edit modal/form
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      setPartners(partners.filter((partner) => partner.id !== id));
      console.log("Deleted partner:", id);
    }
  };

  const handleAddNew = () => {
    console.log("Add new partner");
    // TODO: Open add new modal/form
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AdminLayout title="Partners">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Our Partners
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage your organization's partnerships and collaborations
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>

      {/* Partners List - Simplified */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all"
            >
              {/* Left: Logo/Icon + Info */}
              <div className="flex items-center gap-4 flex-1">
                {/* Logo or Initials */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-900 to-primary-green flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    getInitials(partner.name)
                  )}
                </div>

                {/* Name & Type */}
                <div className="flex flex-col">
                  <h3 className="text-blue-900 font-black text-base">
                    {partner.name}
                  </h3>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(partner)}
                  className="py-2.5 px-4 bg-blue-50 text-blue-900 rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-blue-900 hover:text-white transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="py-2.5 px-4 bg-red-50 text-red-500 rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPartners;
