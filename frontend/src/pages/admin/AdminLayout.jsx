import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useEffect } from 'react';

const AdminLayout = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;