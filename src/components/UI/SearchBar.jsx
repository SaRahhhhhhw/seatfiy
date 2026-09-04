import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  if (!isOpen) {
    return (
      <button 
        className="icon-btn" 
        aria-label="Search" 
        onClick={() => setIsOpen(true)}
      >
        <Search size={20} />
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="search-form" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        className="search-input"
        style={{
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid #444',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          outline: 'none',
          fontSize: '14px'
        }}
      />
      <button type="button" className="icon-btn" onClick={() => setIsOpen(false)}>
        <X size={18} />
      </button>
    </form>
  );
}

export default SearchBar;