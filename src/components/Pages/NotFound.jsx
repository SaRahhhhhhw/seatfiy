import { Link } from 'react-router-dom';
import Button from '../UI/Button';

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Scene Not Found</h2>
      <p>The page you're looking for got cut from the final edit.</p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;