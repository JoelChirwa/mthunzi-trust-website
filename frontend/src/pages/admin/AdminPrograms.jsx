import React from "react";
import AdminContentList from "./AdminContentList";
import { programsData } from "../../data/programsData";
import { Layers, Target, Users, MapPin } from "lucide-react";

const AdminPrograms = () => {
  const columns = [
    {
      key: "title",
      label: "Program Profile",
      render: (title, item) => (
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary-green/10 rounded-2xl flex items-center justify-center text-primary-green">
            <Layers className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-blue-950 font-black text-sm uppercase tracking-tight">
              {title}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary-yellow mt-1">
              SDG Target: {item.sdg || "3, 4, 13"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "location",
      label: "Operational Zone",
      render: () => (
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin className="w-4 h-4 text-red-400" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Nationwide / Malawi
          </span>
        </div>
      ),
    },
    {
      key: "impact",
      label: "Capacity",
      render: () => (
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[8px] font-black"
              >
                U{i}
              </div>
            ))}
          </div>
          <span className="text-xs font-black text-blue-900">5k+ Lives</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Lifecycle",
      render: () => (
        <div className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 w-fit">
          Active Phase
        </div>
      ),
    },
  ];

  const handleEdit = (item) => console.log("Edit program:", item);
  const handleDelete = (item) => console.log("Delete program:", item);
  const handleAdd = () => console.log("Init new program");

  return (
    <AdminContentList
      title="Strategic Programs"
      items={programsData}
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
};

export default AdminPrograms;
