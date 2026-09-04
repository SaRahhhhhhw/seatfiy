import { get, post, put, del } from './Api';

export function getMovies(params) {
  return get('/movies', { params }).then((res) => res.movies);
}

export function getMovie(id) {
  return get(`/movies/${id}`).then((res) => res.movie);
}

export function addMovie(movieData) {
  return post('/movies', movieData).then((res) => res.movie);
}

export function updateMovie(id, movieData) {
  return put(`/movies/${id}`, movieData).then((res) => res.movie);
}

export function deleteMovie(id) {
  return del(`/movies/${id}`);
}

export function getGenres() {
  return get('/genres').then((res) => res.genres);
}