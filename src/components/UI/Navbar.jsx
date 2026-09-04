import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import { useCart } from '../../context/CartContext';
import { isAuthenticated, getCurrentUser, logout } from '../../services/Auth';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/my-bookings', label: 'My Bookings' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { count } = useCart();
  const navigate = useNavigate();

  const isAuth = isAuthenticated();
  const user = getCurrentUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">
        Cine<span className="logo-accent">Book</span>
      </Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink 
              to={link.to} 
              className={({ isActive }) => (isActive ? 'active' : '')} 
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <SearchBar />

        {isAuth ? (
          <>
            <Link to="/cart" className="icon-btn cart-icon" aria-label="Cart">
              <ShoppingCart size={20} />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </Link>

            <div className="user-avatar" title={user?.name || 'User'}>
              {userInitial}
            </div>

            <button 
              onClick={handleLogout} 
              className="icon-btn" 
              title="Logout"
              style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-signin">Sign In</Link>
        )}

        <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;