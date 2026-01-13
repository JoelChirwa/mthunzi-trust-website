import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { AUTHORIZED_ADMINS } from "../../config/admins";

const AdminGuard = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-blue-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-green/20 border-t-primary-green rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check if user's email is in the authorized list
  const userEmail = user.primaryEmailAddress.emailAddress;
  if (!AUTHORIZED_ADMINS.includes(userEmail)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminGuard;
