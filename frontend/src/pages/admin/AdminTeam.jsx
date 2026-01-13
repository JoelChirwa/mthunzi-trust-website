import React from "react";
import AdminContentList from "./AdminContentList";
import { Users, Mail, Phone, Linkedin, BadgeCheck } from "lucide-react";

const AdminTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Joel Chirwa",
      role: "Executive Director",
      department: "Leadership",
      email: "joel@mthunzi.org",
      phone: "+265 996 654 088",
      linkedin: "https://linkedin.com/in/joelchirwa",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Phiri",
      role: "Head of Programs",
      department: "Operations",
      email: "sarah@mthunzi.org",
      linkedin: "https://linkedin.com/in/sarahphiri",
      status: "Active",
    },
    {
      id: 3,
      name: "Kennedy Banda",
      role: "Medical Officer",
      department: "Health",
      email: "kennedy@mthunzi.org",
      linkedin: "https://linkedin.com/in/kennedybanda",
      status: "Away",
    },
    {
      id: 4,
      name: "Grace Malenga",
      role: "Environmental Specialist",
      department: "Sustainability",
      email: "grace@mthunzi.org",
      linkedin: "https://linkedin.com/in/gracemalenga",
      status: "Active",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "Professional Profile",
      render: (name, item) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-900 border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-xs uppercase">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex flex-col">
            <span className="text-blue-950 font-black text-sm uppercase tracking-tight flex items-center gap-2">
              {name}
              {item.status === "Active" && (
                <BadgeCheck className="w-4 h-4 text-primary-green" />
              )}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary-yellow mt-1">
              {item.role}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      label: "Department",
      render: (dept) => (
        <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
          {dept}
        </span>
      ),
    },
    {
      key: "contact",
      label: "Direct Communication",
      render: (_, item) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-400 group cursor-pointer hover:text-blue-900 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span className="text-xs font-bold leading-none">{item.email}</span>
          </div>
          <div className="flex items-center gap-4">
            {item.phone && (
              <div className="flex items-center gap-2 text-gray-400 group cursor-pointer hover:text-blue-900 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="text-xs font-bold leading-none">
                  {item.phone}
                </span>
              </div>
            )}
            {item.linkedin && (
              <a
                href={item.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#0A66C2] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Profile
                </span>
              </a>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Availability",
      render: (status) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              status === "Active"
                ? "bg-green-500 animate-pulse"
                : "bg-yellow-400"
            }`}
          />
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              status === "Active" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {status}
          </span>
        </div>
      ),
    },
  ];

  const handleEdit = (item) => console.log("Edit person:", item);
  const handleDelete = (item) => console.log("Archive person:", item);
  const handleAdd = () => console.log("Onboard team member");

  return (
    <AdminContentList
      title="Organizational Directory"
      items={teamMembers}
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
};

export default AdminTeam;
