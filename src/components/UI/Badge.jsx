import { Star } from 'lucide-react';

export function NowShowingBadge() {
  return <span className="now-showing-badge">NOW SHOWING</span>;
}

export function RatingBadge({ rating }) {
  return (
    <span className="rating-badge">
      <Star size={14} fill="#f59e0b" strokeWidth={0} />
      {rating}
    </span>
  );
}

export function CardRating({ rating }) {
  return (
    <span className="card-rating">
      <Star size={12} fill="#f59e0b" strokeWidth={0} />
      {rating}
    </span>
  );
}

export default NowShowingBadge;
