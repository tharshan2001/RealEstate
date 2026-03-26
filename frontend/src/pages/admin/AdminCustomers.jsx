import { useEffect, useState } from 'react';
import { customersApi } from '../../utils/api';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await customersApi.getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    setDeleteLoading(id);
    try {
      await customersApi.deleteCustomer(id);
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer');
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
      <h1 className="text-2xl font-serif font-bold text-slate-900 mb-6">Customers</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-slate-900">{customer.name}</td>
                <td className="px-6 py-4 text-slate-600">{customer.email || '-'}</td>
                <td className="px-6 py-4 text-slate-600">{customer.phone}</td>
                <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{customer.message || '-'}</td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(customer._id)}
                    disabled={deleteLoading === customer._id}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                  >
                    {deleteLoading === customer._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <div className="text-center py-12 text-slate-500">No customers found</div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;