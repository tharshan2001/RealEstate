import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminLayout = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 ml-64">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
