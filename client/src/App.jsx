import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Footer from './components/Footer'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Programs from './pages/Programs'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminCreateBlog from './pages/AdminCreateBlog'
import AdminEditBlog from './pages/AdminEditBlog'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import AdminCreatePartner from './pages/AdminCreatePartner'
import AdminEditPartner from './pages/AdminEditPartner'
import AdminCreateJob from './pages/AdminCreateJob'
import AdminEditJob from './pages/AdminEditJob'
import AdminCreateEvent from './pages/AdminCreateEvent'
import AdminEditEvent from './pages/AdminEditEvent'
import Events from './pages/Events'


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/blogs/create" element={<AdminCreateBlog />} />
            <Route path="/admin/blogs/edit/:id" element={<AdminEditBlog />} />
            <Route path="/admin/partners/create" element={<AdminCreatePartner />} />
            <Route path="/admin/partners/edit/:id" element={<AdminEditPartner />} />
            <Route path="/admin/jobs/create" element={<AdminCreateJob />} />
            <Route path="/admin/jobs/edit/:id" element={<AdminEditJob />} />
            <Route path="/admin/events/create" element={<AdminCreateEvent />} />
            <Route path="/admin/events/edit/:id" element={<AdminEditEvent />} />
            <Route path="/events" element={<Events />} />
          </Routes>
          <Footer />
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
