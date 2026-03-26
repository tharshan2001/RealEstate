import { useEffect, useState } from 'react';
import { blogsApi } from '../../utils/api';
import { Link } from 'react-router-dom';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await blogsApi.getBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    setDeleteLoading(id);
    try {
      await blogsApi.deleteBlog(id);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
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
        <h1 className="text-2xl font-serif font-bold text-slate-900">Blogs</h1>
        <Link
          to="/admin/blogs/new"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          + Add Blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Published</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {blog.image && (
                      <img src={blog.image} alt={blog.title} className="w-12 h-12 object-cover rounded-lg" />
                    )}
                    <span className="font-medium text-slate-900">{blog.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 capitalize">{blog.category || '-'}</td>
                <td className="px-6 py-4 text-slate-600">{blog.author}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    blog.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/blogs/${blog._id}`}
                      className="px-3 py-1 text-sm text-amber-600 hover:bg-amber-50 rounded-lg"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      disabled={deleteLoading === blog._id}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                    >
                      {deleteLoading === blog._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
          <div className="text-center py-12 text-slate-500">No blogs found</div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;