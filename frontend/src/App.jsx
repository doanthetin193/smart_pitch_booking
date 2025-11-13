import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PitchDetail from './pages/PitchDetail';
import MyPitches from './pages/MyPitches';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main App content with routing
const AppContent = () => {
  return (
    <div style={styles.app}>
      <Navbar />
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pitch/:id" element={<PitchDetail />} />
          
          <Route
            path="/my-pitches"
            element={
              <ProtectedRoute requiredRole="OWNER">
                <MyPitches />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#ecf0f1',
  },
  main: {
    paddingTop: '70px', // Navbar height
  },
};

export default App
