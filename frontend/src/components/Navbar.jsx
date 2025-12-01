import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          ⚽ <span style={styles.logoText}>Booking Sân</span>
        </Link>
        
        <div style={styles.menu}>
          <Link to="/" style={styles.link}>Trang chủ</Link>
          
          {user ? (
            <>
              {user.role === 'USER' && (
                <Link to="/my-bookings" style={styles.link}>Lịch đặt của tôi</Link>
              )}
              {user.role === 'OWNER' && (
                <>
                  <Link to="/my-pitches" style={styles.link}>Sân của tôi</Link>
                  <Link to="/owner/bookings" style={styles.link}>Đơn đặt sân</Link>
                  <Link to="/owner/statistics" style={styles.link}>📊 Thống kê</Link>
                </>
              )}
              {user.role === 'ADMIN' && (
                <>
                  <Link to="/admin" style={styles.link}>Duyệt sân</Link>
                  <Link to="/admin/users" style={styles.link}>Quản lý Users</Link>
                </>
              )}
              <span style={styles.username}>👤 {user.fullName}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Đăng nhập</Link>
              <Link to="/register" style={styles.registerBtn}>Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'white',
    padding: '0.75rem 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  logoText: {
    color: '#00b894',
  },
  menu: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    transition: 'color 0.3s',
    fontWeight: '500',
  },
  username: {
    color: '#333',
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  registerBtn: {
    backgroundColor: '#00b894',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
};

export default Navbar;
