import { useState, useEffect, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Why Choose Us', path: '/why-choose-us' },
  { name: 'Courses', path: '/courses' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" end>
          <img src="/logo.PNG" alt="Logo" className="navbar-logo-img" />
        </NavLink>

        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`navbar-menu ${isOpen ? 'navbar-menu-open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}
          >
            {link.name}
          </NavLink>
        ))}
        <NavLink to="/enroll" className="navbar-cta">
          Enroll Now
        </NavLink>
      </div>

      <div
        className={`navbar-overlay ${isOpen ? 'navbar-overlay-open' : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </nav>
  );
}

export default memo(Navbar);