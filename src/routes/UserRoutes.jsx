import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import LoanRequestForm from '../pages/LoanRequestForm';
import ProfilePage from '../pages/ProfilePage';
import LoanSlips from '../pages/LoanSlips';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/loan-request" element={<LoanRequestForm />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/loan-slips" element={<LoanSlips />} />
    </Routes>
  );
};

export default UserRoutes;
