import { useEffect, useState } from 'react';
import { getMyBookings, updateBookingStatus } from '../../services/Bookings';
import Loading from '../UI/Loading';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  function loadBookings() {
    setLoading(true);
    getMyBookings()
      .then(setBookings)
      .catch(() => setError('Could not load your bookings.'))
      .finally(() => setLoading(false));
  }

  async function handleCancel(bookingId) {
    try {
      await updateBookingStatus(bookingId, 'cancelled');
      loadBookings();
    } catch (err) {
      setError('Could not cancel this booking.');
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="page-container">
      <h1 className="page-title">My Bookings</h1>
      {error && <p className="form-error">{error}</p>}
      {!error && !bookings.length && <p className="hero-desc">No bookings yet.</p>}

      <div className="admin-list">
        {bookings.map((booking) => (
          <div className="admin-list-row" key={booking.id}>
            <span>
              {booking.movieTitle} — Seats:{' '}
              {(booking.seats || []).join(', ')} — {booking.status}
            </span>
            <span>
              ${booking.totalPrice}
              {(booking.status === 'confirmed' || booking.status === 'pending') && (
                <button className="notify-btn" style={{ marginLeft: '0.8rem' }} onClick={() => handleCancel(booking.id)}>
                  Cancel
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
