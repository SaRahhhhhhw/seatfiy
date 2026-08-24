import { useParams, Link } from 'react-router-dom';
import { Ticket, Play } from 'lucide-react';
import { NowShowingBadge, RatingBadge } from '../UI/Badge';
import GenreLabel from '../UI/GenreLabel';
import Button from '../UI/Button';
import { getMovieById } from '../../data/movies';
import NotFound from './NotFound';

function MovieDetails() {
  const { id } = useParams();
  const movie = getMovieById(id);

  if (!movie) return <NotFound />;

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${movie.backdrop})` }}>
      <div className="hero-content">
        <div className="hero-badges">
          <NowShowingBadge />
          <RatingBadge rating={movie.rating} />
          <span className="runtime-badge">{movie.duration}</span>
        </div>

        <h1>{movie.title}</h1>

        <div className="genre-tags">
          {movie.genres.map((genre) => (
            <GenreLabel key={genre}>{genre}</GenreLabel>
          ))}
        </div>

        <p className="hero-desc">{movie.description}</p>

        <div className="hero-actions">
          <Link to={`/book/${movie.id}`}>
            <Button variant="primary" icon={<Ticket size={18} />}>Book Now</Button>
          </Link>
          <Button variant="secondary" icon={<Play size={18} />}>Watch Trailer</Button>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
