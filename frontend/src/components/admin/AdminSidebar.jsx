import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/lands', label: 'Lands', icon: '🏞️' },
    { path: '/admin/blogs', label: 'Blogs', icon: '📝' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-serif font-bold">7hilax RealAgro</h1>
        <p className="text-sm text-slate-400">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-slate-800 text-amber-500'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <p className="font-medium">{user?.name}</p>
            <p className="text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;