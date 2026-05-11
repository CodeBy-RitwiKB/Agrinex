import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from './pages/Home';
import DepartmentPage from './pages/DepartmentPage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import OurStory from './pages/OurStory';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import MerchantSignupPage from './pages/MerchantSignupPage';
import ProductDetailPage from './pages/ProductDetailPage';


// Components
import TopNav from './components/TopNav';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';

// Cloudinary Utility
import { getCloudinaryUrl } from './utils/cloudinary';

// Store
import { useStore } from './store/useStore';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { name: "Dairy & Animal Farming", img: getCloudinaryUrl('dairy_farming') },
  { name: "Farm Machinery & Tools", img: getCloudinaryUrl('machinery') },
  { name: "Fertilizers & Soil Health", img: getCloudinaryUrl('soil_health') },
  { name: "Greenhouse & Polyhouse", img: getCloudinaryUrl('greenhouse') },
  { name: "Irrigation & Water Mgmt", img: getCloudinaryUrl('irrigation') },
  { name: "Organic & Sustainable Farming", img: getCloudinaryUrl('organic') },
  { name: "Pesticides & Protection", img: getCloudinaryUrl('protection') },
  { name: "Seeds & Plants", img: getCloudinaryUrl('seeds') },
];

const MOCK_PRODUCTS = [
  { id: 1, name: "Organic Lacinato Kale", price: 4.99, unit: "bunch", tag: "100% Organic", img: getCloudinaryUrl('kale'), category: "Organic & Sustainable Farming" },
  { id: 2, name: "Heirloom Strawberries", price: 8.50, unit: "box", tag: "Locally Grown", img: getCloudinaryUrl('strawberries'), category: "Organic & Sustainable Farming" },
  { id: 3, name: "Sweet Golden Corn", price: 3.20, unit: "3 ears", tag: "Farm Fresh", img: getCloudinaryUrl('corn'), category: "Seeds & Plants" },
  { id: 4, name: "Vine Cherry Tomatoes", price: 5.00, unit: "per lb", tag: "Hydroponic", img: getCloudinaryUrl('tomatoes'), category: "Greenhouse & Polyhouse" },
  { id: 5, name: "Alphonso Mangoes", price: 24.00, unit: "dozen", tag: "Premium Export", img: getCloudinaryUrl('strawberries'), category: "Dairy & Animal Farming" },
  { id: 6, name: "Pearl Millet (Bajra)", price: 2.50, unit: "kg", tag: "High Fiber", img: getCloudinaryUrl('kale'), category: "Seeds & Plants" },
  { id: 7, name: "Wild Organic Honey", price: 12.99, unit: "500g", tag: "Unprocessed", img: getCloudinaryUrl('tomatoes'), category: "Organic & Sustainable Farming" },
  { id: 8, name: "Aromatic Basmati Rice", price: 18.00, unit: "5kg", tag: "Aged 2 Years", img: getCloudinaryUrl('corn'), category: "Seeds & Plants" },
  { id: 9, name: "Kashmiri Saffron", price: 15.00, unit: "gram", tag: "Grade A+", img: getCloudinaryUrl('strawberries'), category: "Organic & Sustainable Farming" },
  { id: 10, name: "Malabar Cardamom", price: 9.50, unit: "100g", tag: "Hand-picked", img: getCloudinaryUrl('kale'), category: "Organic & Sustainable Farming" },
  { id: 11, name: "Himalayan Walnuts", price: 14.00, unit: "500g", tag: "Nutrient Rich", img: getCloudinaryUrl('corn'), category: "Organic & Sustainable Farming" },
  { id: 12, name: "Premium Cashews", price: 11.00, unit: "500g", tag: "W240 Quality", img: getCloudinaryUrl('tomatoes'), category: "Organic & Sustainable Farming" },
  { id: 13, name: "Assam CTC Tea", price: 6.50, unit: "500g", tag: "Strong Blend", img: getCloudinaryUrl('kale'), category: "Organic & Sustainable Farming" },
  { id: 14, name: "Arabica Coffee Beans", price: 12.00, unit: "250g", tag: "Medium Roast", img: getCloudinaryUrl('strawberries'), category: "Organic & Sustainable Farming" },
  { id: 15, name: "Peanut Butter (Smooth)", price: 5.50, unit: "jar", tag: "No Added Sugar", img: getCloudinaryUrl('tomatoes'), category: "Dairy & Animal Farming" },
  { id: 16, name: "Cold Pressed Mustard Oil", price: 7.00, unit: "litre", tag: "Traditional Ghani", img: getCloudinaryUrl('corn'), category: "Organic & Sustainable Farming" },
  { id: 17, name: "Precision Tiller", price: 850.00, unit: "unit", tag: "Industrial", img: getCloudinaryUrl('machinery'), category: "Farm Machinery & Tools" },
  { id: 18, name: "Smart Drip Kit", price: 120.00, unit: "kit", tag: "IoT Enabled", img: getCloudinaryUrl('irrigation'), category: "Irrigation & Water Mgmt" },
  { id: 19, name: "Bio-Enriched Compost", price: 45.00, unit: "50kg", tag: "Organic", img: getCloudinaryUrl('soil_health'), category: "Fertilizers & Soil Health" },
  { id: 20, name: "Hand-Forged Scythe", price: 35.00, unit: "unit", tag: "Heritage", img: getCloudinaryUrl('machinery'), category: "Farm Machinery & Tools" },
];

function AnimatedRoutes({ onOpenCart, categories, products }) {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode, user, isAuthenticated } = useStore();

  const ProtectedRoute = ({ children, role }) => {
    if (!isAuthenticated) {
      return <Navigate to="/account" state={{ from: location }} replace />;
    }
    if (role && user?.role !== role) {
      const target = user?.role === 'admin' ? '/admin' : user?.role === 'merchant' ? '/dashboard' : '/';
      return <Navigate to={target} replace />;
    }
    return children;
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Home categories={categories} products={products} isDarkMode={isDarkMode} />
            </motion.div>
          } 
        />
        <Route 
          path="/department/:id" 
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <DepartmentPage products={products} categories={categories} isDarkMode={isDarkMode} />
            </motion.div>
          } 
        />
        <Route 
          path="/account" 
// ...
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <AccountPage 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={toggleDarkMode} 
              />
            </motion.div>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <CartPage 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={toggleDarkMode}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </motion.div>
          } 
        />
        <Route 
          path="/payment" 
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <PaymentPage 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={toggleDarkMode}
              />
            </motion.div>
          } 
        />
        <Route 
          path="/terms" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <TermsOfService 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={toggleDarkMode}
                onOpenCart={onOpenCart}
              />
            </motion.div>
          } 
        />
        <Route 
          path="/privacy" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <PrivacyPolicy 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={toggleDarkMode}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </motion.div>
          } 
        />
        <Route 
          path="/our-story" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <OurStory 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={toggleDarkMode}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </motion.div>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ProtectedRoute role="merchant">
                <Dashboard />
              </ProtectedRoute>
            </motion.div>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            </motion.div>
          } 
        />
        <Route 
          path="/customer/dashboard" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ProtectedRoute role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            </motion.div>
          } 
        />
        <Route 
          path="/merchant/join" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <MerchantSignupPage 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={toggleDarkMode} 
              />
            </motion.div>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ProductDetailPage isDarkMode={isDarkMode} />
            </motion.div>
          } 
        />
      </Routes>

    </AnimatePresence>
  );
}

function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState(CATEGORIES);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch('http://localhost:5000/api/products/categories');
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData.length > 0 ? catData : CATEGORIES);
        }
        
        const prodRes = await fetch('http://localhost:5000/api/products');
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData.length > 0 ? prodData : MOCK_PRODUCTS);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);
  
  const showNav = location.pathname !== '/account' && location.pathname !== '/cart' && location.pathname !== '/payment' && location.pathname !== '/terms' && location.pathname !== '/privacy' && location.pathname !== '/our-story' && location.pathname !== '/dashboard' && location.pathname !== '/admin' && location.pathname !== '/customer/dashboard' && location.pathname !== '/merchant/join';

  return (
    <div className={`no-scrollbar transition-colors duration-1000 ${isDarkMode ? 'bg-[#0D0804] text-white' : 'bg-[#EFEDE8] text-[#1A0F05]'}`}>
      {showNav && (
        <div className="relative z-[100]">
          <TopNav 
            isDarkMode={isDarkMode} 
            onToggleDarkMode={toggleDarkMode} 
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>
      )}
      
      <main className={`relative transition-colors duration-1000 ${isDarkMode ? 'dark' : ''}`}>
        <AnimatedRoutes 
          onOpenCart={() => setIsCartOpen(true)}
          categories={categories}
          products={products}
        />
      </main>
 
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
}


function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <MainLayout />
      </SmoothScroll>
    </Router>
  );
}

export default App;