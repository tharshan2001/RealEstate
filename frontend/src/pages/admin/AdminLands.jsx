import { useEffect, useState } from 'react';
import { landsApi } from '../../utils/api';
import { Link } from 'react-router-dom';

const AdminLands = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchLands = async () => {
    try {
      const response = await landsApi.getLands();
      setLands(response.data);
    } catch (error) {
      console.error('Error fetching lands:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this land?')) return;
    setDeleteLoading(id);
    try {
      await landsApi.deleteLand(id);
      setLands(lands.filter((l) => l._id !== id));
    } catch (error) {
      console.error('Error deleting land:', error);
      alert('Failed to delete land');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Lands</h1>
        <Link
          to="/admin/lands/new"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          + Add Land
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {lands.map((land) => (
              <tr key={land._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {land.heroImg && (
                      <img src={land.heroImg} alt={land.title} className="w-12 h-12 object-cover rounded-lg" />
                    )}
                    <span className="font-medium text-slate-900">{land.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{land.location}</td>
                <td className="px-6 py-4 text-slate-600 capitalize">{land.type}</td>
                <td className="px-6 py-4 text-slate-600">{land.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    land.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {land.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/lands/${land._id}`}
                      className="px-3 py-1 text-sm text-amber-600 hover:bg-amber-50 rounded-lg"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(land._id)}
                      disabled={deleteLoading === land._id}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                    >
                      {deleteLoading === land._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {lands.length === 0 && (
          <div className="text-center py-12 text-slate-500">No lands found</div>
        )}
      </div>
    </div>
  );
};

export default AdminLands;