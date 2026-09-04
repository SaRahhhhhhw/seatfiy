import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaApple, FaGooglePlay } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <h2>Get the CineBook App</h2>
        <div className="app-buttons">
          <button className="app-btn">
            <FaApple size={18} />
            App Store
          </button>
          <button className="app-btn">
            <FaGooglePlay size={16} />
            Google Play
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-col footer-brand">
          <Link to="/" className="logo">
            Cine<span className="logo-accent">Book</span>
          </Link>
          <p>
            Your premium destination for cinema booking. Discover films, choose your
            seats, and experience the magic of cinema.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/cinemas">Cinemas</Link></li>
            <li><Link to="/coming-soon">Coming Soon</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help Center</h4>
          <ul>
            <li><Link to="/how-to-book">How to Book</Link></li>
            <li><Link to="/cancellation-policy">Cancellation Policy</Link></li>
            <li><Link to="/refunds">Refunds</Link></li>
            <li><Link to="/gift-cards">Gift Cards</Link></li>
            <li><Link to="/group-bookings">Group Bookings</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Newsletter</h4>
          <p>Get early access to tickets and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" required />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-legal">
        © {new Date().getFullYear()} CineBook. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
