import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Edit3, Trash2, Plus, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Joel Chirwa",
      role: "Executive Director",
      photo: null,
    },
    {
      id: 2,
      name: "Sarah Phiri",
      role: "Head of Programs",
      photo: null,
    },
    {
      id: 3,
      name: "Kennedy Banda",
      role: "Medical Officer",
      photo: null,
    },
    {
      id: 4,
      name: "Grace Malenga",
      role: "Environmental Specialist",
      photo: null,
    },
    {
      id: 5,
      name: "John Tembo",
      role: "Community Coordinator",
      photo: null,
    },
    {
      id: 6,
      name: "Mary Kamoto",
      role: "Finance Manager",
      photo: null,
    },
  ]);

  const handleEdit = (member) => {
    console.log("Edit team member:", member);
    // TODO: Open edit modal/form
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
      console.log("Deleted team member:", id);
    }
  };

  const handleAddNew = () => {
    console.log("Add new team member");
    // TODO: Open add new modal/form
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AdminLayout title="Our Team">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Team Members
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Manage your organization's team members
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="h-14 px-8 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-green/20 flex items-center gap-3 hover:translate-y-[-2px] transition-all"
        >
          <UserPlus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      {/* Team List - Simplified */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all"
            >
              {/* Left: Photo/Initials + Info */}
              <div className="flex items-center gap-4 flex-1">
                {/* Photo or Initials */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-900 to-primary-green flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    getInitials(member.name)
                  )}
                </div>

                {/* Name & Role */}
                <div className="flex flex-col">
                  <h3 className="text-blue-900 font-black text-base">
                    {member.name}
                  </h3>
                  <p className="text-primary-yellow text-xs font-semibold">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="py-2.5 px-4 bg-blue-50 text-blue-900 rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-blue-900 hover:text-white transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
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

export default AdminTeam;
