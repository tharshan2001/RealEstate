import { useEffect, useState } from 'react';
import { landsApi, blogsApi, customersApi } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ lands: 0, blogs: 0, customers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [landsRes, blogsRes, customersRes] = await Promise.all([
          landsApi.getLandsAll(),
          blogsApi.getBlogsAll(),
          customersApi.getCustomers(),
        ]);
        setStats({
          lands: landsRes.data.length,
          blogs: blogsRes.data.length,
          customers: customersRes.data.length,
        });
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Lands', value: stats.lands, icon: LandIcon, color: 'blue' },
    { title: 'Total Blogs', value: stats.blogs, icon: BlogIcon, color: 'teal' },
    { title: 'Total Customers', value: stats.customers, icon: UsersIcon, color: 'violet' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="text-sm text-slate-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                card.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                'bg-violet-100 text-violet-600'
              }`}>
                <card.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionCard title="Add Land" href="/admin/lands/new" icon={<LandIcon className="w-5 h-5" />} color="blue" />
            <QuickActionCard title="Add Blog" href="/admin/blogs/new" icon={<BlogIcon className="w-5 h-5" />} color="teal" />
            <QuickActionCard title="View Lands" href="/admin/lands" icon={<LandIcon className="w-5 h-5" />} color="slate" />
            <QuickActionCard title="View Blogs" href="/admin/blogs" icon={<BlogIcon className="w-5 h-5" />} color="slate" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">System Status</h2>
          <div className="space-y-3">
            <StatusItem label="Database" status="online" />
            <StatusItem label="API Server" status="online" />
            <StatusItem label="File Storage" status="online" />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ title, href, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    teal: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
    slate: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
  };

  return (
    <a
      href={href}
      className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${colorClasses[color]}`}
    >
      {icon}
      <span className="font-medium text-sm">{title}</span>
    </a>
  );
};

const StatusItem = ({ label, status }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-slate-600">{label}</span>
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-sm text-green-600 font-medium">Online</span>
    </div>
  </div>
);

const LandIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const BlogIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default AdminDashboard;
