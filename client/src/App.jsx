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
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminCreateBlog from './pages/AdminCreateBlog'
import AdminEditBlog from './pages/AdminEditBlog'
import { ToastProvider } from './context/ToastContext'
import AdminCreateTeam from './pages/AdminCreateTeam'
import AdminEditTeam from './pages/AdminEditTeam'
import AdminCreatePartner from './pages/AdminCreatePartner'
import AdminEditPartner from './pages/AdminEditPartner'


const App = () => {
  return (
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
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blogs/create" element={<AdminCreateBlog />} />
          <Route path="/admin/blogs/edit/:id" element={<AdminEditBlog />} />
          <Route path="/admin/team/create" element={<AdminCreateTeam />} />
          <Route path="/admin/partners/create" element={<AdminCreatePartner />} />
          <Route path="/admin/partners/edit/:id" element={<AdminEditPartner />} />
          <Route path="/admin/team/edit/:id" element={<AdminEditTeam />} />
      </Routes>
      <Footer />
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
