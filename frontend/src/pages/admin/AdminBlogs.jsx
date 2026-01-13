import React from "react";
import AdminContentList from "./AdminContentList";
import { blogPosts } from "../../data/blogData";
import { Eye, Clock, MessageSquare, Tag } from "lucide-react";

const AdminBlogs = () => {
  const columns = [
    {
      key: "title",
      label: "Article Details",
      subKey: "category",
      render: (title, item) => (
        <div className="flex items-center gap-4">
          <div className="w-16 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-blue-950 font-black text-sm uppercase tracking-tight truncate max-w-[300px]">
              {title}
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-green bg-primary-green/5 px-2 py-0.5 rounded-full border border-primary-green/10">
                {item.category || "General"}
              </span>
              <span className="text-[9px] font-bold text-gray-300 uppercase flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.date}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "author",
      label: "Author",
      render: (author) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600 border border-blue-100 uppercase">
            {author?.charAt(0) || "A"}
          </div>
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            {author || "Admin"}
          </span>
        </div>
      ),
    },
    {
      key: "stats",
      label: "Engagement",
      render: () => (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-400">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-black">1.2k</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-black">24</span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: () => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
            Published
          </span>
        </div>
      ),
    },
  ];

  const handleEdit = (item) => console.log("Edit blog:", item);
  const handleDelete = (item) => console.log("Delete blog:", item);
  const handleAdd = () => console.log("Add new blog");

  return (
    <AdminContentList
      title="Blog Management"
      items={blogPosts}
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
};

export default AdminBlogs;
