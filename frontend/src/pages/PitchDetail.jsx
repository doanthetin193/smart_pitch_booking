import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pitchAPI } from '../services/api';

const PitchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPitch = useCallback(async () => {
    try {
      const response = await pitchAPI.getById(id);
      setPitch(response.data);
    } catch {
      setPitch(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPitch();
  }, [fetchPitch]);

  if (loading) {
    return <div style={styles.loading}>Đang tải...</div>;
  }

  if (!pitch) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.error}>Không tìm thấy sân</div>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* Back Button */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← 
      </button>

      {/* Page Title */}
      <h1 style={styles.pageTitle}>Thông tin sân bóng</h1>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left: Image */}
        <div style={styles.imageSection}>
          <img
            src={pitch.images || 'https://picsum.photos/800/600'}
            alt={pitch.name}
            style={styles.pitchImage}
          />
        </div>

        {/* Right: Info Box */}
        <div style={styles.infoBox}>
          <h2 style={styles.infoTitle}>Thông tin chi tiết</h2>
          <div style={styles.infoContent}>
            <p><strong>Tên sân bóng:</strong> {pitch.type.replace('PITCH_', 'Sân ')}</p>
            <p><strong>Tên chủ sân:</strong> {pitch.ownerName || 'Nguyễn Văn A'}</p>
            <p><strong>Địa chỉ:</strong> {pitch.city || 'Sài gòn'}</p>
            <p><strong>Số điện thoại:</strong> 29102019029</p>
            <button style={styles.bookBtn}>Đặt sân</button>
          </div>
        </div>
      </div>

      {/* Bottom Section: 3 Columns */}
      <div style={styles.bottomSection}>
        <div style={styles.column}>
          <h3 style={styles.columnTitle}>Giới thiệu</h3>
          <p style={styles.columnText}>
            {pitch.description || 'Cung cấp các tiện ích thông minh giúp bạn tìm sân bãi và đặt sân một cách hiệu quả nhất.'}
          </p>
        </div>
        
        <div style={styles.column}>
          <h3 style={styles.columnTitle}>Thông tin</h3>
          <p style={styles.columnText}>
            Công ty cổ phần gmail
          </p>
        </div>
        
        <div style={styles.column}>
          <h3 style={styles.columnTitle}>Liên hệ</h3>
          <p style={styles.columnText}>
            912012901192
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    marginTop: '60px',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '60px auto 0',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginTop: '60px',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  backBtn: {
    backgroundColor: 'transparent',
    color: '#333',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  pageTitle: {
    fontSize: '2rem',
    color: '#00b894',
    marginBottom: '2rem',
    fontWeight: '600',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '2rem',
    marginBottom: '3rem',
  },
  imageSection: {
    width: '100%',
  },
  pitchImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  infoBox: {
    backgroundColor: '#d5d5d5',
    padding: '1.5rem',
    borderRadius: '4px',
  },
  infoTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  infoContent: {
    fontSize: '0.95rem',
    color: '#666',
  },
  bookBtn: {
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1.5rem',
    width: '100%',
  },
  bottomSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    backgroundColor: '#d5d5d5',
    padding: '2rem',
    borderRadius: '4px',
  },
  column: {
    color: '#666',
  },
  columnTitle: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.75rem',
    fontWeight: '600',
  },
  columnText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
};

export default PitchDetail;
