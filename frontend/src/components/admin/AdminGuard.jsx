import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  const location = useLocation();

  if (!isAuth) {
    // Redirect to login but save the attempted location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminGuard;
