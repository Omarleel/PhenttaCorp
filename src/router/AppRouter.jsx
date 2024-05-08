import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminRoutes } from '../modulos/routes/AdminRoutes';
import { CustomerRoutes } from '../modulos/routes/CustomerRoutes';
import { useAuthStore } from '../hooks/useAuthStore';
// import { LoginPage } from '../modulos/autentication/LoginPage';
import { CustomLoading } from '../components/CustomLoading';
export const AppRouter = () => {
  //  const { status, user, checkAuthToken } = useAuthStore();
  const status = "authenticated";
  const user = {};
  user['name'] = "Juan";
  user['role'] = "customer";
  // useEffect(() => {
  //   checkAuthToken();
  // },
  //   []);

  if (status === 'checking') {
    return (
      <section className="background-section">
        <div className="flex items-center justify-center h-screen">
          <CustomLoading />
        </div>
      </section>
    )
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          {/* <Route path="/auth/*" element={<LoginPage />} />
          <Route path="*" element={<Navigate to='/auth/login' />} /> */}
        </>
      ) : user['role'] === 'customer' ? (
        <>
          <Route path='/*' element={<CustomerRoutes />} />
          <Route path='*' element={<Navigate to='/' />} />
        </>
      ) : (
        <>
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='*' element={<Navigate to='/admin/dashboard' />} />
        </>
      )}
    </Routes>
  );
};