import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import Seat from '../UI/Seat';
import Button from '../UI/Button';
import { getMovieById } from '../../data/movies';
import NotFound from './NotFound';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 10;
const TAKEN_SEATS = ['A3', 'A4', 'C6', 'C7', 'D2', 'E8', 'E9', 'F5'];
const TICKET_PRICE = 12;

function Booking() {
  const { id } = useParams();
  const movie = getMovieById(id);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = useMemo(() => ROWS, []);

  if (!movie) return <NotFound />;

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const total = selectedSeats.length * TICKET_PRICE;

  return (
    <div className="page-container">
      <h1 className="page-title">Book Tickets · {movie.title}</h1>

      <div className="booking-layout">
        <div>
          <div className="screen-bar" />
          <p className="screen-label">SCREEN</p>

          <div className="seat-map">
            {rows.map((row) => (
              <div className="seat-row" key={row}>
                <span className="seat-row-label">{row}</span>
                {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const status = TAKEN_SEATS.includes(seatId)
                    ? 'taken'
                    : selectedSeats.includes(seatId)
                    ? 'selected'
                    : 'available';
                  return <Seat key={seatId} status={status} onClick={() => toggleSeat(seatId)} />;
                })}
              </div>
            ))}
          </div>

          <div className="seat-legend">
            <span className="legend-swatch"><Seat status="available" /> Available</span>
            <span className="legend-swatch"><Seat status="selected" /> Selected</span>
            <span className="legend-swatch"><Seat status="taken" /> Taken</span>
          </div>
        </div>

        <div className="booking-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Movie</span>
            <span>{movie.title}</span>
          </div>
          <div className="summary-row">
            <span>Seats</span>
            <span>{selectedSeats.length ? selectedSeats.join(', ') : '—'}</span>
          </div>
          <div className="summary-row">
            <span>Price / seat</span>
            <span>${TICKET_PRICE}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Button variant="primary" fullWidth icon={<Ticket size={18} />} disabled={!selectedSeats.length}>
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Booking;
