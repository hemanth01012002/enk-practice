import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import User from '../pages/User';
import Mail from '../pages/Mail';
import DataPage from '../pages/DataPage';
import Layout from '../layout/Index';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check localStorage


  return (
    <Router>
      <Routes>
        {/* public authenticated */}
        <Route path="/" element={isAuthenticated ? 
                        <Navigate to="/user" replace /> : <LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/user"     element={
            isAuthenticated ? (
              <Layout>
                <User />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/mail"    element={
            isAuthenticated ? (
              <Layout>
                <Mail />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/user/datapage/:id"
          element={
                         isAuthenticated ? (
              <Layout>
                <DataPage />
              </Layout>
            ) : (      <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
