import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { getCurrentUser } from '../../services/Auth';
import { getUsers, addUser, updateUserStatus, updateUserRole, deleteUser } from '../../services/Users';

const ROLES = ['Admin', 'Staff', 'Customer'];
const EMPTY_FORM = { name: '', email: '', role: 'Customer' };

function AdminUsers() {
  const currentUser = getCurrentUser();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.role === 'Admin') {
      loadUsers();
    }
  }, []);

  if (!currentUser || currentUser.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  function loadUsers() {
    getUsers().then(setUsers).catch(() => setError('Could not load users.'));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await addUser(form);
      setForm(EMPTY_FORM);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add user.');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleStatus(user) {
    try {
      await updateUserStatus(user.id);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update status.');
    }
  }

  async function handleRoleChange(user, role) {
    try {
      await updateUserRole(user.id, role);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update role.');
    }
  }

  async function handleDelete(user) {
    try {
      await deleteUser(user.id);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete user.');
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Admin · Manage Users</h1>

      <div className="admin-tabs">
        <Link to="/admin">Movies</Link>
        <Link to="/admin/users" className="active">Users</Link>
      </div>

      {error && <p className="form-error">{error}</p>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <div className="input-group">
          <label>Role</label>
          <div className="input-field">
            <select name="role" value={form.role} onChange={handleChange}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? 'Adding...' : 'Add User'}
        </Button>
      </form>

      <div className="admin-list">
        {users.map((user) => (
          <div className="admin-list-row" key={user.id}>
            <span>
              {user.name} — {user.email} — {user.status}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user, e.target.value)}
                disabled={user.id === currentUser.id}
                style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: '6px', padding: '0.3rem 0.5rem' }}
              >
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <button
                className="notify-btn"
                onClick={() => handleToggleStatus(user)}
                disabled={user.id === currentUser.id}
              >
                {user.status === 'Active' ? 'Suspend' : 'Activate'}
              </button>
              <button
                className="icon-btn"
                onClick={() => handleDelete(user)}
                disabled={user.id === currentUser.id}
                aria-label="Delete user"
              >
                <Trash2 size={18} />
              </button>
            </span>
          </div>
        ))}
        {!users.length && <p className="hero-desc">No users yet.</p>}
      </div>
    </div>
  );
}

export default AdminUsers;
