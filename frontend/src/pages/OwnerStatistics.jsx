import { useState, useEffect } from 'react';
import { statisticsAPI } from '../services/api';

function OwnerStatistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const response = await statisticsAPI.getOwnerStats();
      setStats(response.data);
    } catch (err) {
      setError('Không thể tải thống kê. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Đang tải thống kê...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>Không có dữ liệu thống kê</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Thống kê doanh thu</h1>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <div style={{ ...styles.summaryCard, ...styles.primaryCard }}>
          <div style={styles.cardIcon}>💰</div>
          <div style={styles.cardContent}>
            <div style={styles.cardValue}>{formatCurrency(stats.totalRevenue)}</div>
            <div style={styles.cardLabel}>Tổng doanh thu</div>
          </div>
        </div>

        <div style={{ ...styles.summaryCard, ...styles.successCard }}>
          <div style={styles.cardIcon}>📅</div>
          <div style={styles.cardContent}>
            <div style={styles.cardValue}>{stats.totalBookings}</div>
            <div style={styles.cardLabel}>Tổng đặt sân</div>
          </div>
        </div>

        <div style={{ ...styles.summaryCard, ...styles.infoCard }}>
          <div style={styles.cardIcon}>⚽</div>
          <div style={styles.cardContent}>
            <div style={styles.cardValue}>{stats.totalPitches}</div>
            <div style={styles.cardLabel}>Số sân</div>
          </div>
        </div>

        <div style={{ ...styles.summaryCard, ...styles.warningCard }}>
          <div style={styles.cardIcon}>⏳</div>
          <div style={styles.cardContent}>
            <div style={styles.cardValue}>{stats.pendingBookings}</div>
            <div style={styles.cardLabel}>Chờ xác nhận</div>
          </div>
        </div>
      </div>

      {/* Time-based Stats */}
      <div style={styles.timeStatsGrid}>
        <div style={styles.timeCard}>
          <h3 style={styles.timeCardTitle}>📆 Hôm nay</h3>
          <div style={styles.timeStats}>
            <div style={styles.timeStat}>
              <span style={styles.timeStatValue}>{stats.todayBookings}</span>
              <span style={styles.timeStatLabel}>đơn đặt</span>
            </div>
            <div style={styles.timeStat}>
              <span style={styles.timeStatValue}>{formatCurrency(stats.todayRevenue)}</span>
              <span style={styles.timeStatLabel}>doanh thu</span>
            </div>
          </div>
        </div>

        <div style={styles.timeCard}>
          <h3 style={styles.timeCardTitle}>📅 Tháng này</h3>
          <div style={styles.timeStats}>
            <div style={styles.timeStat}>
              <span style={styles.timeStatValue}>{stats.thisMonthBookings}</span>
              <span style={styles.timeStatLabel}>đơn đặt</span>
            </div>
            <div style={styles.timeStat}>
              <span style={styles.timeStatValue}>{formatCurrency(stats.thisMonthRevenue)}</span>
              <span style={styles.timeStatLabel}>doanh thu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Status */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📋 Trạng thái đơn đặt</h2>
        <div style={styles.statusGrid}>
          <div style={styles.statusItem}>
            <div style={{ ...styles.statusDot, backgroundColor: '#f59e0b' }}></div>
            <span style={styles.statusLabel}>Chờ xác nhận</span>
            <span style={styles.statusValue}>{stats.pendingBookings}</span>
          </div>
          <div style={styles.statusItem}>
            <div style={{ ...styles.statusDot, backgroundColor: '#3b82f6' }}></div>
            <span style={styles.statusLabel}>Đã xác nhận</span>
            <span style={styles.statusValue}>{stats.confirmedBookings}</span>
          </div>
          <div style={styles.statusItem}>
            <div style={{ ...styles.statusDot, backgroundColor: '#10b981' }}></div>
            <span style={styles.statusLabel}>Hoàn thành</span>
            <span style={styles.statusValue}>{stats.completedBookings}</span>
          </div>
          <div style={styles.statusItem}>
            <div style={{ ...styles.statusDot, backgroundColor: '#ef4444' }}></div>
            <span style={styles.statusLabel}>Đã từ chối</span>
            <span style={styles.statusValue}>{stats.rejectedBookings}</span>
          </div>
          <div style={styles.statusItem}>
            <div style={{ ...styles.statusDot, backgroundColor: '#6b7280' }}></div>
            <span style={styles.statusLabel}>Đã hủy</span>
            <span style={styles.statusValue}>{stats.cancelledBookings}</span>
          </div>
        </div>
      </div>

      {/* Top Pitches */}
      {stats.topPitches && stats.topPitches.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🏆 Top sân được đặt nhiều nhất</h2>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Tên sân</th>
                  <th style={styles.th}>Số đặt</th>
                  <th style={styles.th}>Doanh thu</th>
                  <th style={styles.th}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPitches.map((pitch, index) => (
                  <tr key={pitch.pitchId}>
                    <td style={styles.td}>
                      <span style={styles.rankBadge}>{index + 1}</span>
                    </td>
                    <td style={styles.td}>{pitch.pitchName}</td>
                    <td style={styles.td}>{pitch.totalBookings}</td>
                    <td style={styles.td}>{formatCurrency(pitch.totalRevenue)}</td>
                    <td style={styles.td}>
                      {pitch.avgRating ? (
                        <span style={styles.rating}>⭐ {pitch.avgRating}</span>
                      ) : (
                        <span style={styles.noRating}>Chưa có</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly Revenue Chart */}
      {stats.monthlyRevenues && stats.monthlyRevenues.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📈 Doanh thu 12 tháng gần nhất</h2>
          <div style={styles.chartContainer}>
            <div style={styles.barChart}>
              {stats.monthlyRevenues.map((month, index) => {
                const maxRevenue = Math.max(...stats.monthlyRevenues.map(m => m.revenue || 0));
                const heightPercent = maxRevenue > 0 ? ((month.revenue || 0) / maxRevenue) * 100 : 0;
                
                return (
                  <div key={index} style={styles.barWrapper}>
                    <div style={styles.barValueLabel}>
                      {month.bookingCount > 0 ? formatCurrency(month.revenue) : '-'}
                    </div>
                    <div 
                      style={{
                        ...styles.bar,
                        height: `${Math.max(heightPercent, 5)}%`,
                        backgroundColor: heightPercent > 0 ? '#3b82f6' : '#e5e7eb'
                      }}
                    >
                      <span style={styles.barCount}>{month.bookingCount}</span>
                    </div>
                    <div style={styles.barLabel}>{month.monthName}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#1f2937',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#6b7280',
  },
  error: {
    textAlign: 'center',
    padding: '50px',
    color: '#ef4444',
    backgroundColor: '#fef2f2',
    borderRadius: '8px',
  },
  empty: {
    textAlign: 'center',
    padding: '50px',
    color: '#6b7280',
  },

  // Summary Cards
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  summaryCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  primaryCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  successCard: {
    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    color: 'white',
  },
  infoCard: {
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    color: 'white',
  },
  warningCard: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
  },
  cardIcon: {
    fontSize: '36px',
    marginRight: '15px',
  },
  cardContent: {
    flex: 1,
  },
  cardValue: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: '14px',
    opacity: 0.9,
  },

  // Time Stats
  timeStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  timeCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  timeCardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#374151',
  },
  timeStats: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  timeStat: {
    textAlign: 'center',
  },
  timeStatValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  timeStatLabel: {
    fontSize: '14px',
    color: '#6b7280',
  },

  // Sections
  section: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1f2937',
  },

  // Status Grid
  statusGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: '12px 20px',
    borderRadius: '8px',
    minWidth: '150px',
  },
  statusDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  statusLabel: {
    flex: 1,
    fontSize: '14px',
    color: '#374151',
  },
  statusValue: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#1f2937',
  },

  // Table
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #e5e7eb',
    color: '#6b7280',
    fontWeight: '600',
    fontSize: '14px',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    color: '#374151',
  },
  rankBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  rating: {
    color: '#f59e0b',
    fontWeight: '500',
  },
  noRating: {
    color: '#9ca3af',
    fontStyle: 'italic',
    fontSize: '14px',
  },

  // Bar Chart
  chartContainer: {
    padding: '20px 0',
  },
  barChart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '250px',
    gap: '8px',
    paddingTop: '40px',
  },
  barWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  barValueLabel: {
    fontSize: '10px',
    color: '#6b7280',
    marginBottom: '5px',
    textAlign: 'center',
    minHeight: '30px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bar: {
    width: '100%',
    maxWidth: '60px',
    borderRadius: '4px 4px 0 0',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    transition: 'height 0.3s ease',
    position: 'relative',
  },
  barCount: {
    position: 'absolute',
    bottom: '5px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  barLabel: {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '8px',
    textAlign: 'center',
  },
};

export default OwnerStatistics;
