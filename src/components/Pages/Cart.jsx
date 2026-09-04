import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, CreditCard } from 'lucide-react';
import Button from '../UI/Button';
import { createBooking } from '../../services/Bookings';
import { useCart } from '../../context/CartContext';

function Cart() {
  const { items, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  async function handleCheckout() {
    setSubmitting(true);
    setError('');
    try {
      for (const item of items) {
        await createBooking({
          movieId: item.movieId,
          showDate: item.showDate,
          showTime: item.showTime,
          screen: item.screen,
          seats: item.seats,
        });
      }
      clearCart();
      navigate('/my-bookings');
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. One of these seats may already be booked.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!items.length) {
    return (
      <div className="page-container">
        <h1 className="page-title">Your Cart</h1>
        <p className="hero-desc">Your cart is empty.</p>
        <Link to="/movies">
          <Button variant="primary">Browse Movies</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Your Cart</h1>
      {error && <p className="form-error">{error}</p>}

      <div className="admin-list" style={{ marginBottom: '2rem' }}>
        {items.map((item) => (
          <div className="admin-list-row" key={item.cartId}>
            <span>
              {item.movieTitle} — {item.showDate} · {item.showTime} · {item.screen} — Seats: {item.seats.join(', ')}
            </span>
            <span>
              ${item.total.toFixed(2)}
              <button className="icon-btn" style={{ marginLeft: '0.8rem' }} onClick={() => removeItem(item.cartId)} aria-label="Remove">
                <Trash2 size={16} />
              </button>
            </span>
          </div>
        ))}
      </div>

      <div className="booking-summary" style={{ maxWidth: '360px', marginLeft: 'auto' }}>
        <h3>Total</h3>
        <div className="summary-total">
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
        <Button variant="primary" fullWidth icon={<CreditCard size={18} />} onClick={handleCheckout} disabled={submitting}>
          {submitting ? 'Processing...' : 'Checkout'}
        </Button>
      </div>
    </div>
  );
}

export default Cart;
