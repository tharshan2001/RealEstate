import { useState, useEffect, useRef } from 'react';
import { landsApi } from '../../utils/api';
import { toast } from '../Toast';

const LandModalForm = ({ onClose, onSuccess, land: existingLand }) => {
  const isEdit = Boolean(existingLand);

  const [formData, setFormData] = useState({
    title: '',
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

  const [existingGallery, setExistingGallery] = useState([]);
  const [existingHeroImg, setExistingHeroImg] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (existingLand) {
      setFormData({
        title: existingLand.title || '',
        location: existingLand.location || '',
        region: existingLand.region || 'Jaffna',
        size: existingLand.size || '',
        type: existingLand.type || 'residential',
        price: existingLand.price || '',
        description: existingLand.description || '',
        features: existingLand.features?.join(', ') || '',
        coordinates: { 
          lat: existingLand.coordinates?.lat || '', 
          lng: existingLand.coordinates?.lng || '' 
        },
        status: existingLand.status || 'available',
        isPublished: existingLand.isPublished ?? true,
      });
      setLocationSearch(existingLand.location || '');
      setExistingGallery(existingLand.gallery || []);
      setExistingHeroImg(existingLand.heroImg || '');
    }
  }, [existingLand]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchLocation = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Sri Lanka')}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleLocationSearch = (e) => {
    const value = e.target.value;
    setLocationSearch(value);
    setFormData((prev) => ({ ...prev, location: value }));
    searchLocation(value);
    setShowResults(true);
  };

  const selectLocation = (result) => {
    const displayName = result.display_name.split(',').slice(0, 3).join(', ');
    setLocationSearch(displayName);
    setFormData((prev) => ({
      ...prev,
      location: displayName,
      coordinates: {
        lat: parseFloat(result.lat).toFixed(6),
        lng: parseFloat(result.lon).toFixed(6),
      },
    }));
    setSearchResults([]);
    setShowResults(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (isEdit) {
      data.append('existingGallery', JSON.stringify(existingGallery));
      data.append('existingHeroImg', existingHeroImg);
    }

    images.forEach((image) => {
      data.append('images', image);
    });

    try {
      if (isEdit) {
        await landsApi.updateLand(existingLand._id, data);
        toast.success('Land updated successfully');
      } else {
        await landsApi.createLand(data);
        toast.success('Land created successfully');
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save land');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Land title"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            required
          />
        </div>

        <div className="col-span-2 relative" ref={searchRef}>
          <input
            type="text"
            value={locationSearch}
            onChange={handleLocationSearch}
            placeholder="Search location..."
            className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {searching ? (
              <svg className="animate-spin h-4 w-4 text-slate-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            )}
          </div>
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectLocation(result)}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
                >
                  <p className="font-medium text-slate-800 text-xs">{result.display_name.split(',').slice(0, 2).join(', ')}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="Jaffna">Jaffna</option>
          <option value="Kilinochchi">Kilinochchi</option>
          <option value="Mannar">Mannar</option>
          <option value="Mullaitivu">Mullaitivu</option>
          <option value="Vanni">Vanni</option>
        </select>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="agricultural">Agricultural</option>
          <option value="industrial">Industrial</option>
        </select>

        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="Size"
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required
        />

        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required
        />

        <div className="col-span-2">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>

        <div className="col-span-2">
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma separated)"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {isEdit && existingGallery.length > 0 && (
          <div className="col-span-2">
            <label className="block text-xs text-slate-500 mb-1">Current Images</label>
            <div className="flex flex-wrap gap-2">
              {existingGallery.map((img, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="col-span-2">
          <label className="block text-xs text-slate-500 mb-1">{isEdit ? 'Add More Images' : 'Images'}</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700"
          />
        </div>

        <div className="col-span-2 flex items-center gap-3">
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
            isEdit ? 'Update Land' : 'Create Land'
          )}
        </button>
      </div>
    </form>
  );
};

export default LandModalForm;
