import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Play, ArrowRight } from 'lucide-react';
import { NowShowingBadge, RatingBadge } from '../UI/Badge';
import GenreLabel from '../UI/GenreLabel';
import Button from '../UI/Button';
import MovieCard from '../UI/MovieCard';
import Loading from '../UI/Loading';
import { ComingSoonCard, CinemaCard } from '../UI/Card';
import { formatDuration } from '../../utils/format';
import { getMovies } from '../../services/Movies';
import { cinemas } from '../../data/movies';

const SLIDE_INTERVAL = 6000;

function Home() {
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    Promise.all([
      getMovies({ status: 'now_showing' }),
      getMovies({ status: 'coming_soon' }),
    ])
      .then(([shown, soon]) => {
        setNowShowing(shown);
        setComingSoon(soon);
      })
      .catch(() => setError('Could not load data. Is the API running?'))
      .finally(() => setLoading(false));
  }, []);

  const featured = nowShowing.slice(0, 5);

  useEffect(() => {
    if (!featured.length) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featured.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (loading) return <Loading />;
  if (error) return <p className="page-container form-error">{error}</p>;
  if (!featured.length) return <p className="page-container hero-desc">No movies to show yet.</p>;

  const movie = featured[activeSlide];
  const bgImage = movie.backdrop || movie.poster;

  return (
    <>
      <section
        className="hero-section"
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
      >
        <div className="hero-content fade-in" key={movie.id}>
          <div className="hero-badges">
            <NowShowingBadge />
            {movie.rating > 0 && <RatingBadge rating={movie.rating} />}
            {movie.duration > 0 && <span className="runtime-badge">{formatDuration(movie.duration)}</span>}
          </div>

          <h1>{movie.title}</h1>

          <div className="genre-tags">
            {movie.genre && <GenreLabel>{movie.genre}</GenreLabel>}
          </div>

          <p className="hero-desc">{movie.description}</p>

          <div className="hero-actions">
            <Link to={`/book/${movie.id}`}>
              <Button variant="primary" icon={<Ticket size={18} />}>Book Now</Button>
            </Link>
            <Button variant="secondary" icon={<Play size={18} />}>Watch Trailer</Button>
          </div>

          <div className="slider-indicators">
            {featured.map((item, index) => (
              <button
                key={item.id}
                className={`indicator ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${item.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="now-showing-section">
        <div className="section-header">
          <h2>Now Showing</h2>
          <Link to="/movies" className="see-all">
            See all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="movies-grid">
          {nowShowing.slice(0, 5).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {comingSoon.length > 0 && (
        <section className="coming-soon-section">
          <div className="section-header">
            <h2>Coming Soon</h2>
          </div>
          <div className="coming-soon-grid">
            {comingSoon.slice(0, 4).map((movie) => (
              <ComingSoonCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {cinemas && cinemas.length > 0 && (
        <section className="cinemas-section">
          <div className="section-header">
            <h2>Popular Cinemas</h2>
          </div>
          <div className="cinemas-grid">
            {cinemas.map((cinema) => (
              <CinemaCard key={cinema.id} cinema={cinema} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;