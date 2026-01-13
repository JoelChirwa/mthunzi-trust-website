import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";

import ImpactPage from "./pages/ImpactPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import ContactPage from "./pages/ContactPage";
import Programs from "./pages/Programs";
import SingleProgramPage from "./pages/SingleProgramPage";
import CareersPage from "./pages/CareersPage";
import SingleJobPage from "./pages/SingleJobPage";
import JobApplicationPage from "./pages/JobApplicationPage";
import GalleryPage from "./pages/GalleryPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminGuard from "./components/admin/AdminGuard";

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
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
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
            path="/admin/analytics"
            element={
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            }
          />

          {/* Admin Login - No Layout */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Public Routes with Layout */}
          <Route
            path="/*"
            element={
              <Layout>
                <AnimatedRoutes />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
