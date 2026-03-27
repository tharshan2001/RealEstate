import { useState, useEffect } from 'react';
import { blogsApi } from '../../utils/api';
import { toast } from '../Toast';

const BlogModalForm = ({ onClose, onSuccess, blog: existingBlog }) => {
  const isEdit = Boolean(existingBlog);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    isPublished: true,
  });

  const [existingImage, setExistingImage] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title || '',
        slug: existingBlog.slug || '',
        excerpt: existingBlog.excerpt || '',
        content: existingBlog.content || '',
        category: existingBlog.category || '',
        author: existingBlog.author || '',
        isPublished: existingBlog.isPublished ?? true,
      });
      setExistingImage(existingBlog.image || '');
    }
  }, [existingBlog]);

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

    if (isEdit) {
      data.append('existingImage', existingImage);
    }

    if (image) {
      data.append('image', image);
    }

    try {
      if (isEdit) {
        await blogsApi.updateBlog(existingBlog._id, data);
        toast.success('Blog updated successfully');
      } else {
        await blogsApi.createBlog(data);
        toast.success('Blog created successfully');
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="space-y-3">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog title"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required
        />

        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="URL slug"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required
        />

        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Short excerpt"
          rows={2}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog content"
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isPublished: true })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              formData.isPublished
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-slate-50 text-slate-400 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Publish
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isPublished: false })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              !formData.isPublished
                ? 'bg-slate-200 text-slate-700 border border-slate-300'
                : 'bg-slate-50 text-slate-400 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Unpublish
          </button>
        </div>

        {isEdit && existingImage && (
          <div>
            <label className="block text-xs text-slate-500 mb-1">Current Image</label>
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
              <img src={existingImage} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs text-slate-500 mb-1">{isEdit ? 'Change Image' : 'Featured Image'}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : (
            isEdit ? 'Update Blog' : 'Create Blog'
          )}
        </button>
      </div>
    </form>
  );
};

export default BlogModalForm;
