import { Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';

function Register() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-sub">Join CineBook to start booking your seats</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <Input label="Full Name" type="text" placeholder="Your name" icon={<User size={18} />} required />
          <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail size={18} />} required />
          <Input label="Password" type="password" placeholder="••••••••" icon={<Lock size={18} />} required />
          <Button variant="primary" fullWidth type="submit">Create Account</Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
