import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pitchAPI } from '../services/api';

const Home = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPitches();
  }, []);

  const fetchPitches = async () => {
    try {
      const response = await pitchAPI.getAll();
      setPitches(response.data);
    } catch {
      setPitches([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Đang tải...</div>;
  }

  return (
    <div>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Đặt Sân Bóng Dễ Dàng</h1>
          <p style={styles.heroSubtitle}>
            Chọn Sân, Chọn giờ, nâng cao sức khỏe - Chỉ vài cú Click!
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.guideBtn}>Hướng Dẫn</button>
            <button style={styles.listBtn} onClick={() => {
              document.getElementById('pitches-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Danh Sách Sân
            </button>
          </div>
        </div>
      </div>

      {/* Pitches Section */}
      <div style={styles.container} id="pitches-section">
        <h2 style={styles.sectionTitle}>Sân Bóng</h2>
        
        {pitches.length === 0 ? (
          <p style={styles.noPitches}>Chưa có sân nào</p>
        ) : (
          <div style={styles.grid}>
            {pitches.map((pitch) => (
              <div key={pitch.id} style={styles.card}>
                <img
                  src={pitch.images || 'https://picsum.photos/400/300'}
                  alt={pitch.name}
                  style={styles.image}
                />
                <div style={styles.cardContent}>
                  <h3 style={styles.pitchName}>
                    {pitch.type.replace('PITCH_', 'Sân ')}
                  </h3>
                  <div style={styles.cardActions}>
                    <button
                      onClick={() => navigate(`/pitch/${pitch.id}`)}
                      style={styles.detailBtn}
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => navigate(`/pitch/${pitch.id}`)}
                      style={styles.bookBtn}
                    >
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Section: 3 Columns */}
      <div style={styles.footer}>
        <div style={styles.footerColumn}>
          <h3 style={styles.footerTitle}>Giới thiệu</h3>
          <p style={styles.footerText}>
            Cung cấp các tiện ích thông minh giúp bạn tìm sân bãi và đặt sân một cách hiệu quả nhất.
          </p>
        </div>
        
        <div style={styles.footerColumn}>
          <h3 style={styles.footerTitle}>Thông tin</h3>
          <p style={styles.footerText}>
            Công ty cổ phần gmail
          </p>
        </div>
        
        <div style={styles.footerColumn}>
          <h3 style={styles.footerTitle}>Liên hệ</h3>
          <p style={styles.footerText}>
            912012901192
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    backgroundColor: '#d5d5d5',
    padding: '4rem 2rem',
    textAlign: 'center',
    marginTop: '60px',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '2.5rem',
    color: '#a94442',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '2rem',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  guideBtn: {
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    padding: '0.875rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  listBtn: {
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    padding: '0.875rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginTop: '60px',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    color: '#333',
    marginBottom: '2rem',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  noPitches: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
    fontSize: '1.1rem',
  },
  card: {
    backgroundColor: '#e8e8e8',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '1rem',
  },
  pitchName: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '1rem',
    fontWeight: '500',
  },
  cardActions: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  detailBtn: {
    flex: 1,
    backgroundColor: '#999',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  bookBtn: {
    flex: 1,
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  footer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    backgroundColor: '#d5d5d5',
    padding: '2rem',
    borderRadius: '4px',
    marginTop: '3rem',
  },
  footerColumn: {
    color: '#666',
  },
  footerTitle: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.75rem',
    fontWeight: '600',
  },
  footerText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
};

export default Home;
