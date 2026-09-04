import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { getCurrentUser } from '../../services/Auth';
import { getMovies, addMovie, deleteMovie } from '../../services/Movies';

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Animation'];
const STATUSES = ['now_showing', 'coming_soon', 'ended'];

const EMPTY_FORM = {
  title: '',
  description: '',
  director: '',
  genre: GENRES[0],
  duration: '',
  ticketPrice: '',
  rating: '',
  releaseDate: '',
  status: STATUSES[0],
  poster: '',
};

function Admin() {
  const user = getCurrentUser();
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && user.role === 'Admin') {
      loadMovies();
    }
  }, []);

  if (!user || user.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  function loadMovies() {
    getMovies()
      .then(setMovies)
      .catch(() => setError('Could not load movies.'));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await addMovie(form);
      setForm(EMPTY_FORM);
      loadMovies();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add movie.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMovie(id);
      loadMovies();
    } catch (err) {
      setError('Could not delete movie.');
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Admin · Manage Movies</h1>

      <div className="admin-tabs">
        <Link to="/admin" className="active">Movies</Link>
        <Link to="/admin/users">Users</Link>
      </div>
      {error && <p className="form-error">{error}</p>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
        <Input label="Director" name="director" value={form.director} onChange={handleChange} required />

        <div className="input-group">
          <label>Genre</label>
          <div className="input-field">
            <select name="genre" value={form.genre} onChange={handleChange}>
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Status</label>
          <div className="input-field">
            <select name="status" value={form.status} onChange={handleChange}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <Input label="Duration (minutes)" name="duration" type="number" min="1" value={form.duration} onChange={handleChange} required />
        <Input label="Ticket Price" name="ticketPrice" type="number" min="0" step="0.01" value={form.ticketPrice} onChange={handleChange} required />
        <Input label="Rating (0-10)" name="rating" type="number" min="0" max="10" step="0.1" value={form.rating} onChange={handleChange} />
        <Input label="Release Date" name="releaseDate" type="date" value={form.releaseDate} onChange={handleChange} />
        <Input label="Poster URL" name="poster" value={form.poster} onChange={handleChange} />

        <div className="input-group" style={{ flexBasis: '100%' }}>
          <label>Description</label>
          <div className="input-field">
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              required
              style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.95rem' }}
            />
          </div>
        </div>

        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? 'Adding...' : 'Add Movie'}
        </Button>
      </form>

      <div className="admin-list">
        {movies.map((movie) => (
          <div className="admin-list-row" key={movie.id}>
            <span>
              {movie.title} — {movie.genre} — ${movie.ticketPrice} — {movie.duration}m — {movie.status}
            </span>
            <button className="icon-btn" onClick={() => handleDelete(movie.id)} aria-label="Delete movie">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {!movies.length && <p className="hero-desc">No movies yet.</p>}
      </div>
    </div>
  );
}

export default Admin;
