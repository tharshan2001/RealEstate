import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { blogsApi } from '../utils/api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogsApi.getBlogs();
        setBlogs(response.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <SEO 
        title="Blog & Updates"
        description="Read the latest news, insights and guides about real estate investment in Northern Sri Lanka's Jaffna, Kilinochchi, Mannar, and Mullaitivu regions."
        keywords="blog, real estate news, northern sri lanka, investment guide, property insights"
        url="/blog"
      />
      <Layout>
      <main className="pt-0 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <header className="mb-10 md:mb-14 text-center fade-in-up">
          <span className="font-label text-tertiary uppercase tracking-[0.3em] text-xs font-semibold">Blog</span>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-secondary mt-2">Latest Updates</h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg max-w-md mx-auto mt-4">
            News, insights and guides about real estate in Northern Province.
          </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-2 border-surface-container-high rounded-full"></div>
              <div className="absolute inset-0 border-2 border-transparent rounded-full border-t-secondary animate-spin"></div>
            </div>
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="mb-10 md:mb-14 fade-in-up">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl group">
                <img 
                  className="w-full h-72 md:h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  src={blogs[0].image || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80'} 
                  alt={blogs[0].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span className="inline-block bg-secondary/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-medium uppercase tracking-wider mb-3 md:mb-4">{blogs[0].category || 'Blog'}</span>
                  <h2 className="font-headline text-xl md:text-2xl lg:text-4xl text-white mt-2 mb-3 leading-tight">{blogs[0].title}</h2>
                  <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-2xl">{blogs[0].excerpt}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.slice(1).map((blog, index) => (
                <article key={blog._id} className="group fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-5">
                    <img 
                      className="w-full h-52 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                      src={blog.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'} 
                      alt={blog.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary">{blog.category || 'Blog'}</span>
                      <span className="font-body text-xs text-on-surface-variant">{formatDate(blog.publishedAt)}</span>
                    </div>
                    <h3 className="font-headline text-lg md:text-xl text-secondary group-hover:text-tertiary transition-colors duration-300">{blog.title}</h3>
                    <p className="font-body text-sm text-on-surface-variant line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 fade-in">
            <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-4 block">article</span>
            <p className="font-body text-on-surface-variant text-lg">No blogs found.</p>
          </div>
        )}

        <div className="mt-14 md:mt-20 p-8 md:p-12 lg:p-16 bg-surface-container-low rounded-2xl text-center fade-in-up">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-secondary text-2xl">mail</span>
          </div>
          <h3 className="font-headline text-xl md:text-2xl text-secondary mb-3 md:mb-4">Stay Updated</h3>
          <p className="text-on-surface-variant mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
            Subscribe to our newsletter for the latest property listings and market insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-surface border border-outline-variant rounded-full px-6 py-3.5 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200"
              required
            />
            <button 
              type="submit"
              className="bg-secondary text-white px-8 py-3.5 rounded-full font-label text-sm uppercase tracking-widest hover:bg-sage-dark hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </main>
    </Layout>
    </>
  );
};

export default Blog;
