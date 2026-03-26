import { useEffect, useState } from 'react';
import { landsApi, blogsApi, customersApi } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ lands: 0, blogs: 0, customers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [landsRes, blogsRes, customersRes] = await Promise.all([
          landsApi.getLands(),
          blogsApi.getBlogs(),
          customersApi.getCustomers(),
        ]);
        setStats({
          lands: landsRes.data.length,
          blogs: blogsRes.data.length,
          customers: customersRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Lands', value: stats.lands, icon: '🏞️', color: 'bg-emerald-500' },
    { title: 'Total Blogs', value: stats.blogs, icon: '📝', color: 'bg-blue-500' },
    { title: 'Total Customers', value: stats.customers, icon: '👥', color: 'bg-amber-500' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-slate-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-2xl`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>
                <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;