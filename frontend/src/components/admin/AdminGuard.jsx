import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { AUTHORIZED_ADMINS } from "../../config/admins";
import AccessDenied from "../../pages/admin/AccessDenied";

const AdminGuard = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();

  const { getToken } = useAuth();

  // Check if user's email is in the authorized list
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  console.log("Current User Email:", userEmail);
  console.log("Authorized Admins:", AUTHORIZED_ADMINS);
  const isAuthorized = AUTHORIZED_ADMINS.includes(userEmail);
  console.log("Is Authorized:", isAuthorized);

  // Sync user to database ONLY IF AUTHORIZED
  React.useEffect(() => {
    const syncUserToDB = async () => {
      if (isSignedIn && user && isAuthorized) {
        try {
          const token = await getToken();
          await fetch(
            `${(
              import.meta.env.VITE_API_URL || "http://localhost:5000"
            ).replace(/\/api$/, "")}/api/users/sync`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                email: user.primaryEmailAddress.emailAddress,
                name: user.fullName || "User",
                imageUrl: user.imageUrl,
              }),
            }
          );
        } catch (error) {
          console.error("Error syncing user to DB:", error);
        }
      }
    };

    if (isLoaded && isSignedIn) {
      syncUserToDB();
    }
  }, [isLoaded, isSignedIn, user, getToken, isAuthorized]);

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

  if (!isAuthorized) {
    return <AccessDenied />;
  }

  return children;
};

export default AdminGuard;
