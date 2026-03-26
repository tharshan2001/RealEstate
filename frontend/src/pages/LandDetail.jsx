import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Layout from '../components/Layout';
import { landsApi } from '../utils/api';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LandDetail = () => {
  const { slug } = useParams();
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const response = await landsApi.getLand(slug);
        setLand(response.data);
      } catch (error) {
        console.error('Error fetching land:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLand();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!land) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">error</span>
          <p className="text-on-surface-variant">Land not found</p>
          <Link to="/lands" className="mt-4 text-primary hover:underline">Back to Lands</Link>
        </div>
      </Layout>
    );
  }

  const images = land.gallery?.length > 0 ? land.gallery : land.heroImg ? [land.heroImg] : [];
  const hasCoordinates = land.coordinates?.lat && land.coordinates?.lng;

  return (
    <Layout>
      <main className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pb-10 md:mt-10">
          <Link 
            to="/lands" 
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="font-label text-xs uppercase tracking-widest">Back to Lands</span>
          </Link>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="max-w-lg">
                <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-primary mb-2 tracking-tight">
                  {land.title}
                </h1>
                <p className="font-body text-sm text-tertiary uppercase tracking-widest mb-4">
                  {land.size} • {land.region} Region
                </p>
              </div>
              <div className="text-right">
                <p className="font-headline text-2xl md:text-3xl text-primary">{land.price}</p>
                <p className="font-body text-[10px] text-outline uppercase tracking-widest mt-1">Investment Grade A</p>
              </div>
            </div>

            {land.features?.length > 0 && (
              <div>
                <h3 className="font-label text-xs uppercase tracking-widest text-primary mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {land.features.map((feature, idx) => (
                    <span key={idx} className="px-4 py-2 bg-surface-container-high rounded-full text-sm text-on-surface-variant">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <article>
              <div className="relative mb-6 before:absolute before:top-4 before:left-4 before:w-full before:h-full before:bg-tertiary-fixed before:rounded-lg before:z-0">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg z-10">
                  <img 
                    src={images[activeImage] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'} 
                    alt={land.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
                  <span className="text-primary font-bold text-xs tracking-tighter">{land.type?.toUpperCase()}</span>
                </div>
              </div>
            </article>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <p className="font-body text-on-surface-variant leading-relaxed max-w-2xl">
              {land.description}
            </p>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4">
                <div className="h-64 md:h-80 rounded-xl overflow-hidden border border-outline-variant/20">
                  {hasCoordinates ? (
                    <MapContainer 
                      center={[land.coordinates.lat, land.coordinates.lng]} 
                      zoom={12} 
                      className="w-full h-full"
                      zoomControl={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[land.coordinates.lat, land.coordinates.lng]}>
                        <Popup>
                          <div className="text-center p-1">
                            <p className="font-bold text-sm">{land.title}</p>
                            <p className="text-xs">{land.price}</p>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
                      <p className="text-on-surface-variant">Location not available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-1/4">
                <div className="p-6 bg-surface-container-low rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-outline uppercase tracking-widest">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      land.status === 'available' 
                        ? 'bg-secondary-container text-on-secondary-container' 
                        : 'bg-error-container text-on-error-container'
                    }`}>
                      {land.status === 'available' ? 'Available' : 'Sold'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-outline uppercase tracking-widest">Location</span>
                    <span className="text-sm text-primary">{land.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-outline uppercase tracking-widest">Type</span>
                    <span className="text-sm text-primary capitalize">{land.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-outline uppercase tracking-widest">Size</span>
                    <span className="text-sm text-primary">{land.size}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LandDetail;