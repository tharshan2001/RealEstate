import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { landsApi } from '../../utils/api';

const LandForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: '',
    region: 'Jaffna',
    size: '',
    type: 'residential',
    price: '',
    description: '',
    features: '',
    coordinates: { lat: '', lng: '' },
    status: 'available',
    isPublished: true,
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchLand = async () => {
        try {
          const response = await landsApi.getLand(id);
          const land = response.data;
          setFormData({
            title: land.title || '',
            slug: land.slug || '',
            location: land.location || '',
            region: land.region || 'Jaffna',
            size: land.size || '',
            type: land.type || 'residential',
            price: land.price || '',
            description: land.description || '',
            features: land.features?.join(', ') || '',
            coordinates: { lat: land.coordinates?.lat || '', lng: land.coordinates?.lng || '' },
            status: land.status || 'available',
            isPublished: land.isPublished ?? true,
          });
        } catch (error) {
          console.error('Error fetching land:', error);
          alert('Failed to load land');
          navigate('/admin/lands');
        } finally {
          setFetching(false);
        }
      };
      fetchLand();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'coordinates') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'features') {
        const featuresArray = formData.features.split(',').map((f) => f.trim()).filter(Boolean);
        data.append(key, JSON.stringify(featuresArray));
      } else {
        data.append(key, formData[key]);
      }
    });

    images.forEach((image) => {
      data.append('images', image);
    });

    try {
      if (isEdit) {
        await landsApi.updateLand(id, data);
      } else {
        await landsApi.createLand(data);
      }
      navigate('/admin/lands');
    } catch (error) {
      console.error('Error saving land:', error);
      alert(error.response?.data?.message || 'Failed to save land');
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
        {isEdit ? 'Edit Land' : 'Add New Land'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
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

          <div className="md:col-span-2">
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="Jaffna">Jaffna</option>
              <option value="Kilinochchi">Kilinochchi</option>
              <option value="Mannar">Mannar</option>
              <option value="Mullaitivu">Mullaitivu</option>
              <option value="Vanni">Vanni</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="agricultural">Agricultural</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="e.g., 2.5 acres"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., LKR 45,000,000"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Features (comma separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Electricity, Water Supply, Road Access"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Latitude</label>
            <input
              type="text"
              name="lat"
              value={formData.coordinates.lat}
              onChange={handleChange}
              placeholder="9.7309"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Longitude</label>
            <input
              type="text"
              name="lng"
              value={formData.coordinates.lng}
              onChange={handleChange}
              placeholder="80.0081"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>

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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Images {isEdit && '(add more)'}
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500"
            />
            <p className="text-xs text-slate-500 mt-1">Upload up to 8 images</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Land' : 'Create Land'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/lands')}
            className="px-6 py-3 border border-gray-200 text-slate-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandForm;