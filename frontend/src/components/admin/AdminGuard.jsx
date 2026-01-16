import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { AUTHORIZED_ADMINS } from "../../config/admins";
import AccessDenied from "../../pages/admin/AccessDenied";
import { getApiUrl } from "../../utils/api";

const AdminGuard = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();

  const { getToken } = useAuth();
  const [dbUser, setDbUser] = React.useState(null);
  const [isVerifying, setIsVerifying] = React.useState(true);

  React.useEffect(() => {
    const syncAndVerify = async () => {
      if (isSignedIn && user) {
        try {
          const token = await getToken();
          const response = await fetch(getApiUrl("/users/sync"), {
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
          });

          if (response.ok) {
            const data = await response.json();
            setDbUser(data.user);
          }
        } catch (error) {
          console.error("Error syncing user:", error);
        } finally {
          setIsVerifying(false);
        }
      } else if (isLoaded) {
        setIsVerifying(false);
      }
    };

    if (isLoaded) {
      syncAndVerify();
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  if (!isLoaded || isVerifying) {
    return (
      <div className="min-h-screen bg-blue-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-green/20 border-t-primary-green rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const isHardcodedAdmin = AUTHORIZED_ADMINS.includes(
    user?.primaryEmailAddress?.emailAddress
  );
  const isAdminRole =
    dbUser && (dbUser.role === "admin" || dbUser.role === "super-admin");

  if (!isHardcodedAdmin && !isAdminRole) {
    return <AccessDenied />;
  }

  return children;
};

export default AdminGuard;
