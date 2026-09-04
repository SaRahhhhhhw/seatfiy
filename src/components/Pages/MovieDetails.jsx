import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Ticket, Play } from 'lucide-react';
import { NowShowingBadge, RatingBadge } from '../UI/Badge';
import GenreLabel from '../UI/GenreLabel';
import Button from '../UI/Button';
import Loading from '../UI/Loading';
import { getMovie } from '../../services/Movies';
import { formatDuration } from '../../utils/format';
import NotFound from './NotFound';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMovie(id)
      .then(setMovie)
      .catch(() => setError('Could not load this movie.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error || !movie) return <NotFound />;

  const bgImage = movie.backdrop || movie.poster;

  return (
    <section
      className="hero-section"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      <div className="hero-content">
        <div className="hero-badges">
          {movie.status === 'now_showing' && <NowShowingBadge />}
          {movie.rating > 0 && <RatingBadge rating={movie.rating} />}
          {movie.duration > 0 && <span className="runtime-badge">{formatDuration(movie.duration)}</span>}
          {movie.releaseDate && <span className="runtime-badge">{movie.releaseDate}</span>}
        </div>

        <h1>{movie.title}</h1>

        <div className="genre-tags">
          {movie.genre && <GenreLabel>{movie.genre}</GenreLabel>}
        </div>

        {movie.description && <p className="hero-desc">{movie.description}</p>}

        <div className="hero-actions">
          {movie.status === 'now_showing' && (
            <Link to={`/book/${movie.id}`}>
              <Button variant="primary" icon={<Ticket size={18} />}>Book Now</Button>
            </Link>
          )}
          <Button variant="secondary" icon={<Play size={18} />}>Watch Trailer</Button>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;