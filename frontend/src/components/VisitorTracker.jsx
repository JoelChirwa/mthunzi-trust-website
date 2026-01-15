import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getApiUrl } from "../utils/api";

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages or local development
    if (location.pathname.startsWith("/admin")) return;

    const track = async () => {
      try {
        // We can't easily get precise country on frontend without another API,
        // but the backend will default to Malawi or use headers.
        await fetch(getApiUrl("/analytics/track"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: location.pathname,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        // Silent fail
      }
    };

    track();
  }, [location.pathname]);

  return null;
};

export default VisitorTracker;
