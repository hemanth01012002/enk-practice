import React from 'react';
import Layout from '../layout/Index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import User from '../pages/User';
import Mail from '../pages/Mail';
import DataPage from '../pages/DataPage'; // Import DataPage

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/userpage" element={<Layout><User /></Layout>} />
        <Route path="/user" element={<Layout><User /></Layout>} />
        <Route path="/mail" element={<Layout><Mail /></Layout>} />
        <Route path="/user/datapage/:id" element={<Layout><DataPage /></Layout>} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;
