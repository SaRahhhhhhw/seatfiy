import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/cinemas', label: 'Cinemas' },
  { to: '/coming-soon', label: 'Coming Soon' },
  { to: '/my-bookings', label: 'My Bookings' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">
        Cine<span className="logo-accent">Book</span>
      </Link>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <button className="icon-btn" aria-label="Search">
          <Search size={20} />
        </button>
        <Link to="/login" className="btn-signin">Sign In</Link>
        <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
