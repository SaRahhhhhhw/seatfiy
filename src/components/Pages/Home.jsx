import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Play, ArrowRight } from 'lucide-react';
import { NowShowingBadge, RatingBadge } from '../UI/Badge';
import GenreLabel from '../UI/GenreLabel';
import Button from '../UI/Button';
import MovieCard from '../UI/MovieCard';
import { ComingSoonCard, CinemaCard } from '../UI/Card';
import { nowShowing, comingSoon, cinemas } from '../../data/movies';

const SLIDE_INTERVAL = 6000;

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const featured = nowShowing.slice(0, 5);
  const movie = featured[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featured.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="hero-content fade-in" key={movie.id}>
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
          {nowShowing.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="coming-soon-section">
        <div className="section-header">
          <h2>Coming Soon</h2>
          <Link to="/coming-soon" className="see-all">
            See all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="coming-soon-grid">
          {comingSoon.map((movie) => (
            <ComingSoonCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="cinemas-section">
        <div className="section-header">
          <h2>Popular Cinemas</h2>
          <Link to="/cinemas" className="see-all">
            See all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="cinemas-grid">
          {cinemas.map((cinema) => (
            <CinemaCard key={cinema.id} cinema={cinema} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
