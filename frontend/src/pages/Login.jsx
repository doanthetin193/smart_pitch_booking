import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Đăng Nhập</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p style={styles.footer}>
          Chưa có tài khoản?{' '}
          <Link to="/register" style={styles.link}>
            Đăng ký ngay
          </Link>
        </p>

        <div style={styles.testAccounts}>
          <p style={styles.testTitle}>Tài khoản test:</p>
          <p>👤 Owner: owner1 / 123456</p>
          <p>👤 User: user1 / 123456</p>
          <p>🔐 Admin: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#ecf0f1',
  },
  formCard: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    color: '#2c3e50',
    fontWeight: '500',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  submitBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.875rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#7f8c8d',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600',
  },
  testAccounts: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    fontSize: '0.85rem',
    color: '#7f8c8d',
  },
  testTitle: {
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  },
};

export default Login;
