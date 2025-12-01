import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data);
    } catch {
      setError('Không thể tải danh sách đặt sân');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Bạn có chắc muốn hủy đơn đặt sân này?')) return;

    try {
      await bookingAPI.cancel(id);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể hủy đơn');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'PENDING':
        return { label: 'Chờ xác nhận', color: '#f39c12', icon: '⏳' };
      case 'CONFIRMED':
        return { label: 'Đã xác nhận', color: '#27ae60', icon: '✓' };
      case 'REJECTED':
        return { label: 'Bị từ chối', color: '#e74c3c', icon: '✕' };
      case 'CANCELLED':
        return { label: 'Đã hủy', color: '#95a5a6', icon: '⊘' };
      case 'COMPLETED':
        return { label: 'Hoàn thành', color: '#3498db', icon: '★' };
      default:
        return { label: status, color: '#7f8c8d', icon: '?' };
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  if (loading) {
    return <div style={styles.loading}>Đang tải...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📋 Lịch đặt sân của tôi</h1>

      {error && <div style={styles.error}>{error}</div>}

      {/* Filter Tabs */}
      <div style={styles.filterContainer}>
        <button
          onClick={() => setFilter('all')}
          style={{
            ...styles.filterBtn,
            ...(filter === 'all' ? styles.filterBtnActive : {}),
          }}
        >
          Tất cả ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('PENDING')}
          style={{
            ...styles.filterBtn,
            ...(filter === 'PENDING' ? styles.filterBtnActive : {}),
          }}
        >
          Chờ xác nhận ({bookings.filter(b => b.status === 'PENDING').length})
        </button>
        <button
          onClick={() => setFilter('CONFIRMED')}
          style={{
            ...styles.filterBtn,
            ...(filter === 'CONFIRMED' ? styles.filterBtnActive : {}),
          }}
        >
          Đã xác nhận ({bookings.filter(b => b.status === 'CONFIRMED').length})
        </button>
        <button
          onClick={() => setFilter('CANCELLED')}
          style={{
            ...styles.filterBtn,
            ...(filter === 'CANCELLED' ? styles.filterBtnActive : {}),
          }}
        >
          Đã hủy ({bookings.filter(b => b.status === 'CANCELLED').length})
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div style={styles.emptyState}>
          <p>🔍 Không có đơn đặt sân nào</p>
          <button onClick={() => navigate('/')} style={styles.browseBtn}>
            Tìm sân ngay
          </button>
        </div>
      ) : (
        <div style={styles.bookingsList}>
          {filteredBookings.map((booking) => {
            const statusInfo = getStatusInfo(booking.status);
            return (
              <div key={booking.id} style={styles.bookingCard}>
                <div style={styles.cardHeader}>
                  <div>
                    <h3 style={styles.pitchName}>{booking.pitchName}</h3>
                    <p style={styles.pitchType}>{booking.pitchType.replace('PITCH_', 'Sân ')}</p>
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: statusInfo.color,
                  }}>
                    {statusInfo.icon} {statusInfo.label}
                  </span>
                </div>

                <div style={styles.cardBody}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>📅 Ngày:</span>
                    <span style={styles.infoValue}>{formatDate(booking.bookingDate)}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>🕐 Giờ:</span>
                    <span style={styles.infoValue}>{booking.startTime} - {booking.endTime}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>📍 Địa chỉ:</span>
                    <span style={styles.infoValue}>{booking.pitchAddress}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>👤 Chủ sân:</span>
                    <span style={styles.infoValue}>{booking.ownerName} - {booking.ownerPhone}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>💰 Tổng tiền:</span>
                    <span style={styles.priceValue}>{formatPrice(booking.totalPrice)}</span>
                  </div>
                  
                  {booking.note && (
                    <div style={styles.noteSection}>
                      <span style={styles.infoLabel}>📝 Ghi chú:</span>
                      <p style={styles.noteText}>{booking.note}</p>
                    </div>
                  )}

                  {booking.rejectReason && (
                    <div style={styles.rejectSection}>
                      <span style={styles.infoLabel}>❌ Lý do từ chối:</span>
                      <p style={styles.rejectText}>{booking.rejectReason}</p>
                    </div>
                  )}
                </div>

                <div style={styles.cardFooter}>
                  <button
                    onClick={() => navigate(`/pitch/${booking.pitchId}`)}
                    style={styles.viewBtn}
                  >
                    👁️ Xem sân
                  </button>
                  
                  {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      style={styles.cancelBtn}
                    >
                      ✕ Hủy đơn
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem 1rem',
    marginTop: '60px',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginTop: '60px',
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '2rem',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  filterContainer: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.75rem 1.25rem',
    border: '2px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.3s',
  },
  filterBtnActive: {
    backgroundColor: '#00b894',
    color: 'white',
    borderColor: '#00b894',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  browseBtn: {
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  bookingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1.25rem',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
  },
  pitchName: {
    fontSize: '1.25rem',
    color: '#2c3e50',
    margin: 0,
  },
  pitchType: {
    color: '#7f8c8d',
    margin: '0.25rem 0 0 0',
    fontSize: '0.9rem',
  },
  statusBadge: {
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  cardBody: {
    padding: '1.25rem',
  },
  infoRow: {
    display: 'flex',
    marginBottom: '0.75rem',
    alignItems: 'center',
  },
  infoLabel: {
    fontWeight: '600',
    color: '#7f8c8d',
    minWidth: '120px',
  },
  infoValue: {
    color: '#2c3e50',
  },
  priceValue: {
    color: '#e74c3c',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
  noteSection: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  noteText: {
    margin: '0.5rem 0 0 0',
    color: '#666',
  },
  rejectSection: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#fdf2f2',
    borderRadius: '4px',
    borderLeft: '3px solid #e74c3c',
  },
  rejectText: {
    margin: '0.5rem 0 0 0',
    color: '#c0392b',
  },
  cardFooter: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
    borderTop: '1px solid #dee2e6',
    backgroundColor: '#f8f9fa',
  },
  viewBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  cancelBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default MyBookings;
