import React, { createContext, useContext, useState, useEffect } from "react";
import { getApiUrl } from "../utils/api";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch(getApiUrl("/settings"));
      const data = await response.json();
      setSettings(data);

      // Apply global side effects
      if (data.seoTitle) document.title = data.seoTitle;

      if (data.seoDescription) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement("meta");
          metaDesc.name = "description";
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = data.seoDescription;
      }

      if (data.primaryColor) {
        document.documentElement.style.setProperty(
          "--primary-blue",
          data.primaryColor
        );
      }
      if (data.secondaryColor) {
        document.documentElement.style.setProperty(
          "--primary-green",
          data.secondaryColor
        );
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, isLoading, refreshSettings: fetchSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
