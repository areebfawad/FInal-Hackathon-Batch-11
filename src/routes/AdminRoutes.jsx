import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import AdminDashboard from '../pages/AdminDashboard';
import AppointmentSchedule from '../pages/AppointmentSchedule';
import ProfilePage from '../pages/ProfilePage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/appointments" element={<AppointmentSchedule />} />
      <Route path="/admin/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AdminRoutes;
