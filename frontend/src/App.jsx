import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";

import ImpactPage from "./pages/ImpactPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import SingleAchievementPage from "./pages/SingleAchievementPage";
import ContactPage from "./pages/ContactPage";
import Programs from "./pages/Programs";
import SingleProgramPage from "./pages/SingleProgramPage";
import CareersPage from "./pages/CareersPage";
import SingleJobPage from "./pages/SingleJobPage";
import JobApplicationPage from "./pages/JobApplicationPage";
import GalleryPage from "./pages/GalleryPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminGuard from "./components/admin/AdminGuard";
import MaintenancePage from "./pages/MaintenancePage";
import { getApiUrl } from "./utils/api";
import { SettingsProvider, useSettings } from "./context/SettingsContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<SingleProgramPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:slug" element={<SingleJobPage />} />
        <Route path="/careers/:slug/apply" element={<JobApplicationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SingleBlogPage />} />
        <Route path="/achievements/:slug" element={<SingleAchievementPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { settings, isLoading } = useSettings();

  return (
    <div className="relative">
      <Routes>
        {/* Admin Routes - Protected */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <AdminGuard>
              <AdminBlogs />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/programs"
          element={
            <AdminGuard>
              <AdminPrograms />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <AdminGuard>
              <AdminJobs />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <AdminGuard>
              <AdminGallery />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/team"
          element={
            <AdminGuard>
              <AdminTeam />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminGuard>
              <AdminSettings />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/inquiries"
          element={
            <AdminGuard>
              <AdminInquiries />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminGuard>
              <AdminAnalytics />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/partners"
          element={
            <AdminGuard>
              <AdminPartners />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/achievements"
          element={
            <AdminGuard>
              <AdminAchievements />
            </AdminGuard>
          }
        />

        {/* Admin Login - No Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Public Routes with Layout */}
        <Route
          path="/*"
          element={
            <PublicRouteWrapper settings={settings} isLoading={isLoading}>
              <Layout>
                <AnimatedRoutes />
              </Layout>
            </PublicRouteWrapper>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" reverseOrder={false} />
        <AppContent />
      </Router>
    </SettingsProvider>
  );
}

const PublicRouteWrapper = ({ children, settings, isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-primary-green rounded-full animate-spin mb-4" />
        <p className="text-white/50 font-black uppercase tracking-widest text-[10px]">
          Loading Mthunzi...
        </p>
      </div>
    );
  }

  if (settings?.maintenanceMode) {
    return <MaintenancePage settings={settings} />;
  }

  return children;
};

export default App;
