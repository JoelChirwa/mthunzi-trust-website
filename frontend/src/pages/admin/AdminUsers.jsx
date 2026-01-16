import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Loader2,
  UserPlus,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Lock,
  ChevronRight,
  X,
  Plus,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiUrl } from "../../utils/api";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const ALL_PERMISSIONS = [
  {
    id: "blogs",
    label: "Manage Blogs",
    description: "Create, edit and delete blog posts",
  },
  {
    id: "programs",
    label: "Manage Programs",
    description: "Manage organization programs and pillars",
  },
  {
    id: "projects",
    label: "Manage Projects",
    description: "Track and update impact projects",
  },
  {
    id: "voices",
    label: "Manage Voices",
    description: "Manage community testimonials and videos",
  },
  {
    id: "jobs",
    label: "Manage Careers",
    description: "Post and manage job opportunities",
  },
  {
    id: "applications",
    label: "View Applications",
    description: "Review job and volunteer applications",
  },
  {
    id: "gallery",
    label: "Manage Gallery",
    description: "Upload and manage photos/videos",
  },
  {
    id: "team",
    label: "Manage Team",
    description: "Manage staff and board members",
  },
  {
    id: "partners",
    label: "Manage Partners",
    description: "Manage organizational partners",
  },
  {
    id: "settings",
    label: "System Settings",
    description: "Update global site settings and SEO",
  },
  {
    id: "inquiries",
    label: "View Inquiries",
    description: "Access and respond to contact form messages",
  },
  {
    id: "subscribers",
    label: "Manage Subscribers",
    description: "View and export newsletter subscribers",
  },
  {
    id: "users",
    label: "Manage Users",
    description: "Super Admin only: Manage roles and permissions",
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const { getToken } = useAuth();
  const { user: currentUser } = useUser();
  const [currentUserRole, setCurrentUserRole] = useState("user");

  // Modal states
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Selected user for access edit
  const [selectedUser, setSelectedUser] = useState(null);
  const [tempRole, setTempRole] = useState("user");
  const [tempPermissions, setTempPermissions] = useState([]);

  // Form state for adding new admin
  const [newAdminForm, setNewAdminForm] = useState({
    email: "",
    role: "admin",
    permissions: [],
  });

  useEffect(() => {
    fetchUsers();
    fetchCurrentUserRole();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const response = await fetch(getApiUrl("/users"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUserRole = async () => {
    try {
      const token = await getToken();
      const response = await fetch(getApiUrl("/users/sync"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: currentUser?.primaryEmailAddress?.emailAddress,
          name: currentUser?.fullName || "User",
          imageUrl: currentUser?.imageUrl,
        }),
      });
      const data = await response.json();
      setCurrentUserRole(data.user?.role || "user");
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  const openAccessModal = (user) => {
    if (currentUserRole !== "super-admin" && user._id !== currentUser?.id) {
      toast.error("Only Super Admins can manage permissions");
      return;
    }
    setSelectedUser(user);
    setTempRole(user.role);
    setTempPermissions(user.permissions || []);
    setIsAccessModalOpen(true);
  };

  const handleAccessUpdate = async () => {
    if (currentUserRole !== "super-admin") return;

    const promise = new Promise(async (resolve, reject) => {
      try {
        const token = await getToken();
        const response = await fetch(
          getApiUrl(`/users/${selectedUser._id}/access`),
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              role: tempRole,
              permissions: tempPermissions,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsers(
            users.map((u) => (u._id === selectedUser._id ? data.user : u))
          );
          setIsAccessModalOpen(false);
          resolve("Access permissions updated");
        } else {
          const error = await response.json();
          reject(error.message || "Update failed");
        }
      } catch (error) {
        reject("Server error occurred");
      }
    });

    toast.promise(promise, {
      loading: "Saving changes...",
      success: (msg) => msg,
      error: (err) => err,
    });
  };

  const handleAddAdmin = async () => {
    if (!newAdminForm.email) {
      toast.error("Email is required");
      return;
    }

    const promise = new Promise(async (resolve, reject) => {
      try {
        const token = await getToken();
        const response = await fetch(getApiUrl("/users/authorize"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAdminForm),
        });

        if (response.ok) {
          const data = await response.json();
          // Add or update in list
          setUsers((prev) => {
            const index = prev.findIndex((u) => u.email === data.user.email);
            if (index !== -1) {
              const updated = [...prev];
              updated[index] = data.user;
              return updated;
            }
            return [data.user, ...prev];
          });
          setIsAddModalOpen(false);
          setNewAdminForm({ email: "", role: "admin", permissions: [] });
          resolve(data.message);
        } else {
          const error = await response.json();
          reject(error.message || "Failed to authorize user");
        }
      } catch (error) {
        reject("Server error");
      }
    });

    toast.promise(promise, {
      loading: "Authorizing Administrator...",
      success: (msg) => msg,
      error: (err) => err,
    });
  };

  const togglePermission = (permId, isNewForm = false) => {
    if (isNewForm) {
      const perms = newAdminForm.permissions.includes(permId)
        ? newAdminForm.permissions.filter((p) => p !== permId)
        : [...newAdminForm.permissions, permId];
      setNewAdminForm({ ...newAdminForm, permissions: perms });
    } else {
      if (tempPermissions.includes(permId)) {
        setTempPermissions(tempPermissions.filter((p) => p !== permId));
      } else {
        setTempPermissions([...tempPermissions, permId]);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (currentUserRole !== "super-admin") {
      toast.error("Only Super Admins can delete users");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(getApiUrl(`/users/${userId}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter((u) => u._id !== userId));
        toast.success("User removed from system");
      } else {
        const error = await response.json();
        toast.error(error.message || "Deletion failed");
      }
    } catch (error) {
      toast.error("Server error occurred");
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case "super-admin":
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case "admin":
        return <ShieldCheck className="w-4 h-4 text-primary-green" />;
      default:
        return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "super-admin":
        return "bg-red-50 text-red-600 border-red-100";
      case "admin":
        return "bg-green-50 text-primary-green border-primary-green/20";
      default:
        return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <AdminLayout title="User Permissions">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            System Access Control
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Assign roles and granular permissions to administrators
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUserRole === "super-admin" && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary-green text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-green/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Grant New Admin Access
            </button>
          )}
          {currentUserRole === "super-admin" && (
            <div className="hidden sm:flex bg-primary-green/10 px-4 py-2 rounded-xl border border-primary-green/20 items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary-green" />
              <span className="text-primary-green font-black uppercase tracking-widest text-[10px]">
                Super Admin Mode
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
            Total Users
          </p>
          <h4 className="text-2xl font-black text-blue-900">{users.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-red-600">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
            Super Admins
          </p>
          <h4 className="text-2xl font-black">
            {users.filter((u) => u.role === "super-admin").length}
          </h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-primary-green">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
            Admins
          </p>
          <h4 className="text-2xl font-black">
            {users.filter((u) => u.role === "admin").length}
          </h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
            Contributors
          </p>
          <h4 className="text-2xl font-black">
            {users.filter((u) => u.role === "user").length}
          </h4>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none transition-all font-bold text-blue-900"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {["All", "super-admin", "admin", "user"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                  roleFilter === role
                    ? "bg-blue-900 text-white shadow-lg"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {role === "super-admin"
                  ? "S-Admins"
                  : role === "admin"
                  ? "Admins"
                  : role === "user"
                  ? "Users"
                  : "All"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-40 flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
              Syncing User Database...
            </p>
          </div>
        ) : (
          filteredUsers.map((u) => (
            <motion.div
              layout
              key={u._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white rounded-[2.5rem] border p-6 flex flex-col h-full transition-all group ${
                u._id === currentUser?.id
                  ? "border-primary-green ring-1 ring-primary-green/20"
                  : "border-gray-100 hover:shadow-xl hover:border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                    <img
                      src={
                        u.imageUrl ||
                        `https://ui-avatars.com/api/?name=${u.name}&background=random`
                      }
                      alt={u.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-blue-900 font-extrabold text-sm uppercase leading-tight line-clamp-1">
                      {u.clientSidePlaceholder || u.name}
                    </h4>
                    <p className="text-gray-400 text-[10px] font-medium flex items-center gap-1 mt-1 truncate max-w-[120px]">
                      {u.email}
                    </p>
                  </div>
                </div>
                <div
                  className={`p-1.5 rounded-lg border ${getRoleBadgeClass(
                    u.role
                  )}`}
                >
                  {getRoleIcon(u.role)}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex-1">
                <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                    Active Permissions
                  </span>
                  <span className="text-[10px] font-black text-blue-900">
                    {u.role === "super-admin"
                      ? "FULL"
                      : u.permissions?.length || 0}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {u.role === "super-admin" ? (
                    <div className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md uppercase tracking-tight">
                      Full Website Control
                    </div>
                  ) : u.permissions?.length > 0 ? (
                    u.permissions.slice(0, 3).map((p) => (
                      <span
                        key={p}
                        className="text-[9px] font-bold bg-white text-gray-500 border border-gray-200 px-2 py-0.5 rounded-md"
                      >
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-[9px] font-bold text-gray-300 italic">
                      No special permissions
                    </span>
                  )}
                  {u.role !== "super-admin" && u.permissions?.length > 3 && (
                    <span className="text-[9px] font-bold text-primary-green">
                      +{u.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAccessModal(u)}
                  className="flex-1 bg-gray-100 text-blue-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Edit Permissions
                </button>
                {currentUserRole === "super-admin" &&
                  u._id !== currentUser?.id && (
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
              </div>
              {u._id === currentUser?.id && (
                <div className="mt-4 text-center">
                  <span className="bg-primary-green text-white text-[8px] font-black uppercase px-3 py-0.5 rounded-full tracking-widest">
                    Logged In Session
                  </span>
                </div>
              )}
              {u.clerkId?.startsWith("pending_") && (
                <div className="mt-4 text-center">
                  <span className="bg-yellow-500 text-white text-[8px] font-black uppercase px-3 py-0.5 rounded-full tracking-widest flex items-center justify-center gap-1 mx-auto w-fit">
                    <Clock className="w-2 h-2" /> Pending Registration
                  </span>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Grant Access Modal (ADD ADMIN FORM) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10"
            >
              <div className="bg-primary-green p-8 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-lg">
                      Add New Administrator
                    </h3>
                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">
                      Grant access by email address
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 max-h-[75vh] overflow-y-auto no-scrollbar">
                <div className="mb-8">
                  <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2 ml-2">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@mthunzi.org"
                    value={newAdminForm.email}
                    onChange={(e) =>
                      setNewAdminForm({
                        ...newAdminForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green rounded-2xl outline-none font-bold text-blue-900 transition-all"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest mb-4 ml-2">
                    Assign Role
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["admin", "super-admin"].map((r) => (
                      <button
                        key={r}
                        onClick={() =>
                          setNewAdminForm({ ...newAdminForm, role: r })
                        }
                        className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                          newAdminForm.role === r
                            ? "border-primary-green bg-primary-green/5 text-primary-green"
                            : "border-transparent bg-gray-50 text-gray-400"
                        }`}
                      >
                        {r === "super-admin" ? (
                          <ShieldAlert className="w-5 h-5" />
                        ) : (
                          <ShieldCheck className="w-5 h-5" />
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {r}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`${
                    newAdminForm.role === "super-admin" ? "hidden" : ""
                  }`}
                >
                  <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest mb-4 ml-2">
                    Assign Permissions
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ALL_PERMISSIONS.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => togglePermission(p.id, true)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          newAdminForm.permissions.includes(p.id)
                            ? "border-primary-green bg-primary-green/5 text-blue-900"
                            : "border-gray-100 bg-gray-50 text-gray-400 opacity-60"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            newAdminForm.permissions.includes(p.id)
                              ? "bg-primary-green border-primary-green text-white"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {newAdminForm.permissions.includes(p.id) && (
                            <CheckCircle className="w-3 h-3" />
                          )}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tight">
                          {p.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-start gap-4">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-[11px] text-blue-900 leading-relaxed font-medium">
                    The user will be pre-authorized. Once they sign up or log in
                    with this email via Clerk, they will automatically receive
                    the assigned administrative privileges.
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={handleAddAdmin}
                  className="w-full bg-blue-900 text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-primary-green transition-all shadow-xl shadow-blue-900/10"
                >
                  Confirm & Authorize Admin
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Permissions Edit Modal */}
      <AnimatePresence>
        {isAccessModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccessModalOpen(false)}
              className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10"
            >
              {/* Header */}
              <div className="bg-blue-900 p-8 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl border-2 border-white/20 overflow-hidden">
                    <img
                      src={
                        selectedUser.imageUrl ||
                        `https://ui-avatars.com/api/?name=${selectedUser.name}`
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-lg">
                      {selectedUser.name}
                    </h3>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                      Update Access Level
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAccessModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                {/* Role Selection */}
                <div className="mb-8">
                  <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest mb-4 ml-2">
                    Select User Role
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["user", "admin", "super-admin"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setTempRole(r)}
                        className={`p-4 rounded-2xl border-2 transition-all text-center ${
                          tempRole === r
                            ? "border-primary-green bg-primary-green/5 text-primary-green shadow-lg shadow-primary-green/5"
                            : "border-transparent bg-gray-50 text-gray-400"
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          {r === "super-admin" ? (
                            <ShieldAlert className="w-6 h-6" />
                          ) : r === "admin" ? (
                            <ShieldCheck className="w-6 h-6" />
                          ) : (
                            <Shield className="w-6 h-6" />
                          )}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {r}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Permissions Grid */}
                <div
                  className={`${
                    tempRole === "super-admin"
                      ? "opacity-30 pointer-events-none"
                      : ""
                  }`}
                >
                  <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest mb-4 ml-2">
                    Assign Granular Permissions
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ALL_PERMISSIONS.map((perm) => {
                      const isSelected = tempPermissions.includes(perm.id);
                      return (
                        <div
                          key={perm.id}
                          onClick={() => togglePermission(perm.id)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? "border-primary-green bg-primary-green/5"
                              : "border-gray-50 bg-gray-50/50 grayscale opacity-60"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 mt-0.5 ${
                              isSelected
                                ? "bg-primary-green border-primary-green text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <CheckCircle className="w-4 h-4" />}
                          </div>
                          <div>
                            <p
                              className={`text-[11px] font-black uppercase tracking-tight ${
                                isSelected ? "text-blue-900" : "text-gray-400"
                              }`}
                            >
                              {perm.label}
                            </p>
                            <p className="text-[9px] text-gray-400 font-medium leading-tight mt-0.5">
                              {perm.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {tempRole === "super-admin" && (
                  <div className="mt-4 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-[10px] font-bold">
                      Super Admins automatically receive all system permissions.
                    </span>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="p-8 pt-0">
                <button
                  onClick={handleAccessUpdate}
                  disabled={currentUserRole !== "super-admin"}
                  className="w-full bg-blue-900 text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-900/20 hover:bg-primary-green transition-all disabled:opacity-50"
                >
                  Apply System Updates
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Access info for non-super admins */}
      {currentUserRole !== "super-admin" && (
        <div className="mt-8 bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="text-blue-900 font-black uppercase text-sm mb-1">
              Restricted Access
            </h4>
            <p className="text-blue-900/60 text-sm leading-relaxed">
              As an Administrator, you can view the user directory but role
              management and user deletion are restricted to Super Admins.
              Please contact your system head for privilege escalation.
            </p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
