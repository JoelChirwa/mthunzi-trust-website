import React from "react";
import AdminContentList from "./AdminContentList";
import { jobsData } from "../../data/jobsData";
import { Briefcase, Users, Calendar, Clock } from "lucide-react";

const AdminJobs = () => {
  const columns = [
    {
      key: "title",
      label: "Vacancy Details",
      render: (title, item) => (
        <div className="flex flex-col">
          <span className="text-blue-950 font-black text-sm uppercase tracking-tight">
            {title}
          </span>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary-green">
              {item.department}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {item.type}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "applications",
      label: "Submissions",
      render: () => (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-black text-blue-900">42</span>
          </div>
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[8px] font-black uppercase">
            5 New
          </span>
        </div>
      ),
    },
    {
      key: "posted",
      label: "Timeline",
      render: () => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Calendar className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-900">
              Posted Jan 10
            </span>
          </div>
          <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">
            Expires in 4 days
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Recruitment Status",
      render: () => (
        <div className="px-5 py-2 bg-green-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20 w-fit">
          Accepting Applications
        </div>
      ),
    },
  ];

  const handleEdit = (item) => console.log("Edit job:", item);
  const handleDelete = (item) => console.log("Close job:", item);
  const handleAdd = () => console.log("Create new vacancy");

  return (
    <AdminContentList
      title="Careers & Recruitment"
      items={jobsData}
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
};

export default AdminJobs;
