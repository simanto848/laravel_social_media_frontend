import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import Profile from '../pages/Profile';
import Account from '../pages/Account';
import FindFriend from '../pages/FindFriend';

export default function AppRoutes() {
  const { user } = useContext(AppContext);

  return (
    <Routes>
      {/* Protected Route */}
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/profile/:username"
        element={user ? <Profile /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/find-friends"
        element={user ? <FindFriend /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/account"
        element={user ? <Account /> : <Navigate replace />}
      />

      {/* <Route
        path="/profile/posts"
        element={user ? <Posts /> : <Navigate to={'/login'} replace />}
      /> */}

      {/* Guest Routes */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
