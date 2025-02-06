import React from 'react';//https://mockapi.io/projects/67a069ed24322f8329c61a33
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import User from '../pages/User';
import Mail from '../pages/Mail';
import DataPage from '../pages/DataPage';
import Layout from '../layout/Index';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Define a function to render protected routes
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/user" replace /> : <LoginPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Layout>
                <User />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mail"
          element={
            <ProtectedRoute>
              <Layout>
                <Mail />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/datapage/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <DataPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
