import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../UI/MovieCard';
import Loading from '../UI/Loading';
import { getMovies } from '../../services/Movies';
import NotFound from './NotFound';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    getMovies()
      .then(setMovies)
      .catch(() => setError('Could not load movies. Is the API running?'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="page-container"><p className="form-error">{error}</p></div>;

  const filteredMovies = movies.filter((movie) => {
    if (!searchParam) return true;
    const query = searchParam.trim().toLowerCase();

    const titleMatch = movie.title ? movie.title.toLowerCase().includes(query) : false;
    const singleGenreMatch = movie.genre ? movie.genre.toLowerCase().includes(query) : false;
    const arrayGenresMatch = Array.isArray(movie.genres)
      ? movie.genres.some((g) => g.toLowerCase().includes(query))
      : false;

    return titleMatch || singleGenreMatch || arrayGenresMatch;
  });

  if (searchParam && filteredMovies.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">
        {searchParam ? `Search Results for "${searchParam}"` : 'All Movies'}
      </h1>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;