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
      } catch (error) {
        console.error('Error fetching blogs:', error);
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
        <header className="mb-10 md:mb-14 text-center">
          <span className="font-label text-tertiary uppercase tracking-[0.3em] text-xs font-semibold">Blog</span>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-secondary mt-2">Latest Updates</h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg max-w-md mx-auto mt-4">
            News, insights and guides about real estate in Northern Province.
          </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="mb-10 md:mb-14">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                <img 
                  className="w-full h-64 md:h-80 lg:h-96 object-cover" 
                  src={blogs[0].image || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80'} 
                  alt={blogs[0].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium uppercase tracking-wider">{blogs[0].category || 'Blog'}</span>
                  <h2 className="font-headline text-xl md:text-2xl lg:text-3xl text-white mt-3 md:mt-4 mb-2">{blogs[0].title}</h2>
                  <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-2xl">{blogs[0].excerpt}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.slice(1).map((blog) => (
                <article key={blog._id} className="group">
                  <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-5">
                    <img 
                      className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-700" 
                      src={blog.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'} 
                      alt={blog.title}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-variant">{blog.category || 'Blog'}</span>
                      <span className="font-body text-xs text-on-surface-variant">{formatDate(blog.publishedAt)}</span>
                    </div>
                    <h3 className="font-headline text-lg md:text-xl text-secondary group-hover:text-tertiary transition-colors">{blog.title}</h3>
                    <p className="font-body text-sm text-on-surface-variant line-clamp-2">{blog.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 md:py-20">
            <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4 block">article</span>
            <p className="font-body text-on-surface-variant">No blogs found.</p>
          </div>
        )}

        <div className="mt-12 md:mt-16 p-8 md:p-12 bg-surface-container-low rounded-xl text-center">
          <h3 className="font-headline text-xl md:text-2xl text-secondary mb-3 md:mb-4">Stay Updated</h3>
          <p className="text-on-surface-variant mb-5 md:mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest property listings and market insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Your Email"
              className="flex-1 bg-surface border border-outline-variant rounded-full px-5 py-3 focus:outline-none focus:border-secondary"
              required
            />
            <button 
              type="submit"
              className="bg-secondary text-white px-6 py-3 rounded-full font-label text-sm uppercase tracking-widest hover:bg-sage-dark transition-all"
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
