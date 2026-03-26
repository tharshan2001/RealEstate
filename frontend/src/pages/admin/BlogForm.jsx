import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogsApi } from '../../utils/api';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    isPublished: true,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchBlog = async () => {
        try {
          const response = await blogsApi.getBlog(id);
          const blog = response.data;
          setFormData({
            title: blog.title || '',
            slug: blog.slug || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            category: blog.category || '',
            author: blog.author || '',
            isPublished: blog.isPublished ?? true,
          });
        } catch (error) {
          console.error('Error fetching blog:', error);
          alert('Failed to load blog');
          navigate('/admin/blogs');
        } finally {
          setFetching(false);
        }
      };
      fetchBlog();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (image) {
      data.append('image', image);
    }

    try {
      if (isEdit) {
        await blogsApi.updateBlog(id, data);
      } else {
        await blogsApi.createBlog(data);
      }
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert(error.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-serif font-bold text-slate-900 mb-8">
        {isEdit ? 'Edit Blog' : 'Add New Blog'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Real Estate, Investment"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Published</label>
              <select
                name="isPublished"
                value={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'true' })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Blog' : 'Create Blog'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-6 py-3 border border-gray-200 text-slate-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;