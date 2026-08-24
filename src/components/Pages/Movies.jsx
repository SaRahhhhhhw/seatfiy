import MovieCard from '../UI/MovieCard';
import { nowShowing } from '../../data/movies';

function Movies() {
  return (
    <div className="page-container">
      <h1 className="page-title">All Movies</h1>
      <div className="movies-grid">
        {nowShowing.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
