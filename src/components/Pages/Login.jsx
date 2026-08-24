import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-sub">Sign in to continue booking your favorite movies</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail size={18} />} required />
          <Input label="Password" type="password" placeholder="••••••••" icon={<Lock size={18} />} required />
          <Button variant="primary" fullWidth type="submit">Sign In</Button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
