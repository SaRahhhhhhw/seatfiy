import { useNavigate } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { CardRating } from './Badge';
import Button from './Button';
import { formatDuration } from '../../utils/format';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { id, title, poster, rating, genre, duration } = movie;

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${id}`)}>
      <div className="card-poster">
        {poster ? (
          <img src={poster} alt={title} />
        ) : (
          <div className="card-poster-placeholder">{title}</div>
        )}
        {rating > 0 && <CardRating rating={rating} />}
        <div className="card-book-btn">
          <Button
            variant="primary"
            fullWidth
            icon={<Ticket size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/book/${id}`);
            }}
          >
            Book Now
          </Button>
        </div>
      </div>
      <div className="card-info">
        <h3>{title}</h3>
        <p className="meta">
          {[genre, formatDuration(duration)].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
