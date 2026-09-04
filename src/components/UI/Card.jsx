import { Bell, Star } from 'lucide-react';
import Button from './Button';
import { formatDuration } from '../../utils/format';

export function ComingSoonCard({ movie }) {
  const { title, poster, genre, releaseDate } = movie;

  return (
    <div className="coming-soon-card">
      <div className="coming-soon-poster">
        {poster ? <img src={poster} alt={title} /> : <div className="card-poster-placeholder">{title}</div>}
      </div>
      <div className="coming-soon-info">
        <h3>{title}</h3>
        <p className="meta">{[genre, formatDuration(movie.duration)].filter(Boolean).join(' · ')}</p>
        {releaseDate && <p className="release-date">{releaseDate}</p>}
        <button className="notify-btn">
          <Bell size={14} />
          Notify Me
        </button>
      </div>
    </div>
  );
}

export function CinemaCard({ cinema }) {
  const { name, image, area, address, screens, distance, rating, amenities } = cinema;
  const visibleAmenities = amenities.slice(0, 3);
  const extraCount = amenities.length - visibleAmenities.length;

  return (
    <div className="cinema-card">
      <div className="cinema-image">
        <img src={image} alt={name} />
        <span className="card-rating">
          <Star size={12} fill="#f59e0b" strokeWidth={0} />
          {rating}
        </span>
      </div>
      <div className="cinema-body">
        <h3>{name}</h3>
        <p className="cinema-address">{area}, {address}</p>
        <p className="cinema-meta">{screens} screens · {distance}</p>
        <div className="cinema-tags">
          {visibleAmenities.map((item) => (
            <span className="tag-small" key={item}>{item}</span>
          ))}
          {extraCount > 0 && <span className="tag-small">+{extraCount} more</span>}
        </div>
        <Button variant="outline" fullWidth>View Cinema</Button>
      </div>
    </div>
  );
}

export default CinemaCard;
