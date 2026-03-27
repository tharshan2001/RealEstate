import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { EnquiryProvider } from './context/EnquiryContext';
import EnquiryModal from './components/EnquiryModal';
import Toast from './components/Toast';
import Home from './pages/Home';
import Lands from './pages/Lands';
import LandDetail from './pages/LandDetail';
import Blog from './pages/Blog';
import About from './pages/About';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLands from './pages/admin/AdminLands';
import LandForm from './pages/admin/LandForm';
import AdminBlogs from './pages/admin/AdminBlogs';
import BlogForm from './pages/admin/BlogForm';
import AdminCustomers from './pages/admin/AdminCustomers';
import PageTransition from './components/PageTransition';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <HelmetProvider>
      <EnquiryProvider>
        <Router
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route element={<PageTransition />}>
              <Route path="/" element={<Home />} />
              <Route path="/lands" element={<Lands />} />
              <Route path="/lands/:slug" element={<LandDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
            </Route>
            
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="lands" element={<AdminLands />} />
              <Route path="lands/:id" element={<LandForm />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="blogs/:id" element={<BlogForm />} />
              <Route path="customers" element={<AdminCustomers />} />
            </Route>
          </Routes>
          <WhatsAppButton />
          <EnquiryModal />
          <Toast />
        </Router>
      </EnquiryProvider>
    </HelmetProvider>
  );
}

export default App;
