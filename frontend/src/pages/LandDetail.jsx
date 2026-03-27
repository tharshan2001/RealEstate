import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
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
        <div className="flex items-center justify-center h-[50vh]">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-2 border-surface-container-high rounded-full"></div>
            <div className="absolute inset-0 border-2 border-transparent rounded-full border-t-secondary animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!land) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[50vh] fade-in">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">error</span>
          <p className="text-on-surface-variant text-lg">Land not found</p>
          <Link to="/lands" className="mt-4 text-secondary hover:text-tertiary transition-colors">Back to Lands</Link>
        </div>
      </Layout>
    );
  }

  const images = land.gallery?.length > 0 ? land.gallery : land.heroImg ? [land.heroImg] : [];
  const hasCoordinates = land.coordinates?.lat && land.coordinates?.lng;

  return (
    <>
      <SEO 
        title={land.title}
        description={`${land.title} - ${land.size} ${land.type} land in ${land.location}, ${land.region}. ${land.description?.substring(0, 150)}...`}
        keywords={`${land.title}, ${land.type} land, ${land.location}, ${land.region}, real estate sri lanka`}
        image={land.heroImg}
        url={`/lands/${land.slug}`}
      />
      <Layout>
        <main className="fade-in">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pb-16 md:pb-20">
            <div className="space-y-8 md:space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 fade-in-up">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-secondary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">{land.type}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      land.status === 'available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {land.status === 'available' ? 'Available' : 'Sold'}
                    </span>
                  </div>
                  <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-secondary tracking-tight">
                    {land.title}
                  </h1>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">place</span>
                      <span className="font-body text-sm">{land.location}</span>
                    </div>
                    <span className="text-outline">|</span>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">straighten</span>
                      <span className="font-body text-sm">{land.size}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline text-2xl md:text-3xl text-secondary">LKR {land.price}</p>
                  <p className="text-xs text-tertiary uppercase tracking-wider mt-1">{land.region} Region</p>
                </div>
              </div>

              {land.features?.length > 0 && (
                <div className="fade-in-up" style={{ animationDelay: '100ms' }}>
                  <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {land.features.map((feature, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 bg-surface-container-low rounded-full text-sm text-on-surface-variant border border-outline-variant/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <article className="fade-in-up" style={{ animationDelay: '150ms' }}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl group">
                  <img 
                    src={images[activeImage] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'} 
                    alt={land.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </article>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 fade-in-up" style={{ animationDelay: '200ms' }}>
                  {images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                        activeImage === idx 
                          ? 'ring-2 ring-secondary ring-offset-2 shadow-lg' 
                          : 'opacity-60 hover:opacity-100 hover:shadow-md'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <p className="font-body text-on-surface-variant leading-relaxed text-base md:text-lg fade-in-up" style={{ animationDelay: '250ms' }}>
                {land.description}
              </p>

              <div className="flex flex-col lg:flex-row gap-8 fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="w-full lg:w-2/3">
                  <div className="h-72 md:h-96 rounded-2xl overflow-hidden border border-outline-variant/20 shadow-inner">
                    {hasCoordinates ? (
                      <MapContainer 
                        center={[land.coordinates.lat, land.coordinates.lng]} 
                        zoom={13} 
                        className="w-full h-full"
                        zoomControl={true}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[land.coordinates.lat, land.coordinates.lng]}>
                          <Popup>
                            <div className="text-center p-2">
                              <p className="font-bold text-sm">{land.title}</p>
                              <p className="text-xs text-secondary font-medium">LKR {land.price}</p>
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
                        <div className="text-center">
                          <span className="material-symbols-outlined text-on-surface-variant text-4xl mb-2 block">map</span>
                          <p className="text-on-surface-variant">Location not available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/20">
                    <h3 className="font-headline text-lg text-secondary mb-5">Property Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-outline-variant/30">
                        <span className="font-body text-sm text-on-surface-variant">Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          land.status === 'available' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {land.status === 'available' ? 'Available' : 'Sold'}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-3 border-b border-outline-variant/30">
                        <span className="font-body text-sm text-on-surface-variant">Location</span>
                        <span className="text-sm text-secondary text-right max-w-[60%] leading-snug">{land.location}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-outline-variant/30">
                        <span className="font-body text-sm text-on-surface-variant">Region</span>
                        <span className="text-sm text-secondary capitalize">{land.region}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-outline-variant/30">
                        <span className="font-body text-sm text-on-surface-variant">Type</span>
                        <span className="text-sm text-secondary capitalize">{land.type}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="font-body text-sm text-on-surface-variant">Size</span>
                        <span className="text-sm text-secondary">{land.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default LandDetail;
