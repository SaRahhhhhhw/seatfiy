import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Seat from '../UI/Seat';
import Button from '../UI/Button';
import Loading from '../UI/Loading';
import { getMovie } from '../../services/Movies';
import { getScreens, getSeats } from '../../services/Bookings';
import { useCart } from '../../context/CartContext';

const SERVICE_FEE = 2;

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [movie, setMovie] = useState(null);
  const [screens, setScreens] = useState([]);
  const [showTimes, setShowTimes] = useState([]);

  const [showDate, setShowDate] = useState(new Date().toISOString().slice(0, 10));
  const [showTime, setShowTime] = useState('');
  const [screen, setScreen] = useState('');

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [loading, setLoading] = useState(true);
  const [seatsLoading, setSeatsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getMovie(id), getScreens()])
      .then(([movieData, screenData]) => {
        setMovie(movieData);
        setScreens(screenData.screens);
        setShowTimes(screenData.showTimes);
        setScreen(screenData.screens[0]);
        setShowTime(screenData.showTimes[0]);
      })
      .catch(() => setError('Could not load booking data.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!screen || !showTime || !showDate) return;
    setSeatsLoading(true);
    setSelectedSeats([]);
    getSeats(id, { date: showDate, time: showTime, screen })
      .then((res) => setSeats(res.seats))
      .catch(() => setError('Could not load the seat map.'))
      .finally(() => setSeatsLoading(false));
  }, [id, screen, showTime, showDate]);

  if (loading) return <Loading />;
  if (!movie) return <p className="page-container form-error">{error || 'Movie not found.'}</p>;

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const price = movie.ticketPrice;
  const subtotal = selectedSeats.length * price;
  const total = selectedSeats.length ? subtotal + SERVICE_FEE : 0;

  const handleAddToCart = () => {
    addItem({
      movieId: Number(id),
      movieTitle: movie.title,
      showDate,
      showTime,
      screen,
      seats: selectedSeats,
      ticketPrice: price,
      serviceFee: SERVICE_FEE,
      total,
    });
    navigate('/cart');
  };

  const rows = {};
  seats.forEach((seat) => {
    const row = seat.id[0];
    if (!rows[row]) rows[row] = [];
    rows[row].push(seat);
  });

  return (
    <div className="page-container">
      <h1 className="page-title">Book Tickets · {movie.title}</h1>

      <div className="booking-filters">
        <div className="input-group">
          <label>Date</label>
          <div className="input-field">
            <input type="date" value={showDate} onChange={(e) => setShowDate(e.target.value)} />
          </div>
        </div>
        <div className="input-group">
          <label>Time</label>
          <div className="input-field">
            <select value={showTime} onChange={(e) => setShowTime(e.target.value)}>
              {showTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-group">
          <label>Screen</label>
          <div className="input-field">
            <select value={screen} onChange={(e) => setScreen(e.target.value)}>
              {screens.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="booking-layout">
        <div>
          <div className="screen-bar" />
          <p className="screen-label">SCREEN</p>

          {seatsLoading ? (
            <Loading />
          ) : (
            <>
              <div className="seat-map">
                {Object.entries(rows).map(([row, rowSeats]) => (
                  <div className="seat-row" key={row}>
                    <span className="seat-row-label">{row}</span>
                    {rowSeats.map((seat) => {
                      const status = seat.status === 'booked'
                        ? 'taken'
                        : selectedSeats.includes(seat.id)
                        ? 'selected'
                        : 'available';
                      return <Seat key={seat.id} status={status} onClick={() => toggleSeat(seat.id)} />;
                    })}
                  </div>
                ))}
              </div>

              <div className="seat-legend">
                <span className="legend-swatch"><Seat status="available" /> Available</span>
                <span className="legend-swatch"><Seat status="selected" /> Selected</span>
                <span className="legend-swatch"><Seat status="taken" /> Taken</span>
              </div>
            </>
          )}
        </div>

        <div className="booking-summary">
          <h3>Order Summary</h3>
          {error && <p className="form-error">{error}</p>}
          <div className="summary-row">
            <span>Movie</span>
            <span>{movie.title}</span>
          </div>
          <div className="summary-row">
            <span>Showtime</span>
            <span>{showDate} · {showTime} · {screen}</span>
          </div>
          <div className="summary-row">
            <span>Seats</span>
            <span>{selectedSeats.length ? selectedSeats.join(', ') : '—'}</span>
          </div>
          <div className="summary-row">
            <span>Price / seat</span>
            <span>${price}</span>
          </div>
          <div className="summary-row">
            <span>Service fee</span>
            <span>${SERVICE_FEE}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
            variant="primary"
            fullWidth
            icon={<ShoppingCart size={18} />}
            disabled={!selectedSeats.length}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Booking;
