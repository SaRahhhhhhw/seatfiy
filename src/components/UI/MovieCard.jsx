import { useNavigate } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { CardRating } from './Badge';
import Button from './Button';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { id, title, poster, rating, genres, duration } = movie;

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${id}`)}>
      <div className="card-poster">
        <img src={poster} alt={title} />
        <CardRating rating={rating} />
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
        <p className="meta">{genres.join(' · ')} · {duration}</p>
      </div>
    </div>
  );
}

export default MovieCard;
