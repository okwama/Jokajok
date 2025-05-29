
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from '@/pages/Admin';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
