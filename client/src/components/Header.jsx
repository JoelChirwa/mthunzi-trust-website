import { Link } from "react-router-dom"
import { useState } from "react"
import logo from '../assets/logo.jpg'


const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-green-500 shadow-md p-4 fixed top-0 w-full z-40">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Mthunzi Trust home" className="inline-flex items-center">
          <div className="flex items-center">
            <img className="h-10 w-10 mr-3 rounded-full" src={logo} alt="Mthunzi Logo" />
            <h1 className="text-white text-2xl font-bold">Mthunzi Trust</h1>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link className="text-white hover:underline" to="/">Home</Link>
          <Link className="text-white hover:underline" to="/about">About Us</Link>
          <Link className="text-white hover:underline" to="/programs">Our Programs</Link>
          <Link className="text-white hover:underline" to="/blog">Blog</Link>
          <Link className="text-white hover:underline" to="/contact">Contact</Link>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="hamburger p-2 rounded-md focus:outline-none"
          >
            <span className={`block w-6 h-0.5 bg-white my-1 transform transition duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white my-1 transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-white my-1 transform transition duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div id="mobile-menu" className="md:hidden">
          <nav className="flex flex-col space-y-2 p-4 container mx-auto">
            <Link onClick={() => setOpen(false)} className="text-white py-2" to="/">Home</Link>
            <Link onClick={() => setOpen(false)} className="text-white py-2" to="/about">About Us</Link>
            <Link onClick={() => setOpen(false)} className="text-white py-2" to="/programs">Our Programs</Link>
            <Link onClick={() => setOpen(false)} className="text-white py-2" to="/blog">Blog</Link>
            <Link onClick={() => setOpen(false)} className="text-white py-2" to="/contact">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
