import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pitchAPI } from '../services/api';
import SearchFilter from '../components/SearchFilter';

const Home = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPitches();
  }, []);

  const fetchPitches = async () => {
    try {
      setLoading(true);
      const response = await pitchAPI.getAll();
      setPitches(response.data);
      setSearchPerformed(false);
    } catch {
      setPitches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      const response = await pitchAPI.search(filters);
      setPitches(response.data);
      setSearchPerformed(true);
      // Scroll đến section kết quả
      document.getElementById('pitches-section')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Search error:', error);
      setPitches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    fetchPitches();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const getPitchTypeLabel = (type) => {
    const types = {
      'PITCH_5': 'Sân 5',
      'PITCH_7': 'Sân 7',
      'PITCH_11': 'Sân 11',
    };
    return types[type] || type;
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
        {/* Search Filter */}
        <SearchFilter onSearch={handleSearch} onReset={handleReset} />
        
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            {searchPerformed ? `Kết quả tìm kiếm (${pitches.length} sân)` : 'Tất cả sân bóng'}
          </h2>
          {searchPerformed && (
            <button onClick={handleReset} style={styles.showAllBtn}>
              Xem tất cả sân
            </button>
          )}
        </div>
        
        {loading ? (
          <div style={styles.loadingInline}>Đang tìm kiếm...</div>
        ) : pitches.length === 0 ? (
          <div style={styles.noPitches}>
            <span style={styles.noPitchesIcon}>😢</span>
            <p>Không tìm thấy sân nào phù hợp</p>
            <button onClick={handleReset} style={styles.resetSearchBtn}>
              Xem tất cả sân
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {pitches.map((pitch) => (
              <div key={pitch.id} style={styles.card}>
                <div style={styles.imageWrapper}>
                  <img
                    src={pitch.images || 'https://picsum.photos/400/300'}
                    alt={pitch.name}
                    style={styles.image}
                  />
                  <span style={styles.pitchTypeBadge}>
                    {getPitchTypeLabel(pitch.type)}
                  </span>
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.pitchName}>{pitch.name}</h3>
                  <p style={styles.pitchLocation}>
                    📍 {pitch.district}, {pitch.city}
                  </p>
                  <p style={styles.pitchPrice}>
                    💰 {formatPrice(pitch.pricePerHour)}/giờ
                  </p>
                  <p style={styles.pitchTime}>
                    🕐 {pitch.openTime} - {pitch.closeTime}
                  </p>
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
  loadingInline: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.1rem',
    color: '#7f8c8d',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    color: '#333',
    fontWeight: '600',
    margin: 0,
  },
  showAllBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  },
  noPitches: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#7f8c8d',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
  },
  noPitchesIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem',
  },
  resetSearchBtn: {
    marginTop: '1rem',
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  pitchTypeBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#00b894',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  cardContent: {
    padding: '1.25rem',
  },
  pitchName: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '0.75rem',
    fontWeight: '600',
  },
  pitchLocation: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.5rem',
  },
  pitchPrice: {
    fontSize: '1rem',
    color: '#00b894',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  pitchTime: {
    fontSize: '0.85rem',
    color: '#888',
    marginBottom: '1rem',
  },
  cardActions: {
    display: 'flex',
    gap: '0.75rem',
  },
  detailBtn: {
    flex: 1,
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  bookBtn: {
    flex: 1,
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  footer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '3rem 2rem',
    marginTop: '3rem',
  },
  footerColumn: {
    color: '#ecf0f1',
  },
  footerTitle: {
    fontSize: '1.2rem',
    color: 'white',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  footerText: {
    fontSize: '0.9rem',
    lineHeight: '1.8',
    color: '#bdc3c7',
  },
};

export default Home;
