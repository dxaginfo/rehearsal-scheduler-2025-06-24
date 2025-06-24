import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import BandListPage from './pages/bands/BandListPage';
import BandDetailPage from './pages/bands/BandDetailPage';
import CreateBandPage from './pages/bands/CreateBandPage';
import RehearsalListPage from './pages/rehearsals/RehearsalListPage';
import RehearsalDetailPage from './pages/rehearsals/RehearsalDetailPage';
import CreateRehearsalPage from './pages/rehearsals/CreateRehearsalPage';
import SetlistListPage from './pages/setlists/SetlistListPage';
import SetlistDetailPage from './pages/setlists/SetlistDetailPage';
import CreateSetlistPage from './pages/setlists/CreateSetlistPage';
import SongListPage from './pages/songs/SongListPage';
import ProfilePage from './pages/profile/ProfilePage';
import AvailabilityPage from './pages/availability/AvailabilityPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth guard for protected routes
import ProtectedRoute from './components/auth/ProtectedRoute';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Band routes */}
              <Route path="/bands" element={<BandListPage />} />
              <Route path="/bands/new" element={<CreateBandPage />} />
              <Route path="/bands/:bandId" element={<BandDetailPage />} />
              
              {/* Rehearsal routes */}
              <Route path="/rehearsals" element={<RehearsalListPage />} />
              <Route path="/rehearsals/new" element={<CreateRehearsalPage />} />
              <Route path="/rehearsals/:rehearsalId" element={<RehearsalDetailPage />} />
              
              {/* Setlist routes */}
              <Route path="/setlists" element={<SetlistListPage />} />
              <Route path="/setlists/new" element={<CreateSetlistPage />} />
              <Route path="/setlists/:setlistId" element={<SetlistDetailPage />} />
              
              {/* Song routes */}
              <Route path="/songs" element={<SongListPage />} />
              
              {/* User routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/availability" element={<AvailabilityPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;