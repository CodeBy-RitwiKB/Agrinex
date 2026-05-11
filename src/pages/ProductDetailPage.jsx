import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';


const ProductDetailPage = ({ isDarkMode }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        
        // Fetch related products
        if (data.category_id) {
          const relatedRes = await fetch(`http://localhost:5000/api/products/related/${data.category_id}?exclude=${id}`);
          const relatedData = await relatedRes.json();
          setRelatedProducts(relatedData);
        }

        // Fetch reviews
        const reviewsRes = await fetch(`http://localhost:5000/api/products/${id}/reviews`);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);

      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const ratingDist = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percent: reviews.length > 0 ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 : 0
  }));

  const handleAdd = () => {
    addToCart(product);
    setIsFlying(true);
    setTimeout(() => setIsFlying(false), 800);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#0D0804]' : 'bg-[#EFEDE8]'}`}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#FF9933] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#0D0804] text-white' : 'bg-[#EFEDE8] text-[#1A0F05]'}`}>
        <div className="text-center space-y-6">
          <h2 className="font-yatra text-4xl">Product Not Found</h2>
          <Link to="/" className="inline-block px-8 py-4 bg-[#FF9933] text-white rounded-2xl font-bold uppercase tracking-widest text-[10px]">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      isDarkMode ? 'bg-[#0D0804] text-white' : 'bg-[#EFEDE8] text-[#1A0F05]'
    }`}>
      {/* Product Detail Section */}
      <section className="pt-48 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="flex items-center gap-2 mb-12 group w-fit"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
              isDarkMode ? 'border-white/10 group-hover:bg-[#FF9933]' : 'border-[#1A0F05]/10 group-hover:bg-[#1A0F05] group-hover:text-white'
            }`}>
              <ChevronLeft size={18} />
            </div>
            <span className="font-hind font-bold uppercase tracking-widest text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">Back to Marketplace</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left: Premium Image Gallery */}
            <div className="space-y-8 sticky top-32">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`relative rounded-[4rem] overflow-hidden border aspect-square ${
                  isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-2xl'
                }`}
              >
                <img 
                  src={product.image_url || 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80'} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                />
                
                {/* Product Badge */}
                <div className="absolute top-8 left-8 px-6 py-2 rounded-full bg-[#FF9933] text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {product.tag || 'Premium Choice'}
                </div>

                {/* Like Button */}
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`absolute top-8 right-8 p-4 rounded-full backdrop-blur-xl border transition-all duration-500 ${
                    isDarkMode ? 'bg-black/40 border-white/10 hover:bg-[#FF9933]' : 'bg-white/40 border-black/5 hover:bg-[#1A0F05] hover:text-white'
                  }`}
                >
                  <Heart size={20} fill={liked ? "currentColor" : "none"} className={liked ? 'text-red-500' : ''} />
                </button>
              </motion.div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-6 rounded-[2rem] border text-center space-y-2 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}>
                  <ShieldCheck size={20} className="mx-auto text-[#FF9933]" />
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Verified Origin</p>
                </div>
                <div className={`p-6 rounded-[2rem] border text-center space-y-2 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}>
                  <Truck size={20} className="mx-auto text-[#FF9933]" />
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Express Delivery</p>
                </div>
                <div className={`p-6 rounded-[2rem] border text-center space-y-2 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}>
                  <RefreshCw size={20} className="mx-auto text-[#FF9933]" />
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Purity Guarantee</p>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex text-[#FF9933]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">(48 Reviews)</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-yatra tracking-tighter leading-none">
                  {product.name}
                </h1>
                <p className="text-sm font-hind opacity-40 uppercase tracking-[0.4em] font-black">
                  Distributed by {product.merchants?.store_name || 'Agrinex Premium Merchants'}
                </p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black font-hind tracking-tighter text-[#FF9933]">₹{Number(product.price).toFixed(2)}</span>
                <span className="text-sm font-bold opacity-40 uppercase tracking-widest">/ {product.unit}</span>
              </div>

              <p className="text-xl font-hind leading-relaxed opacity-70">
                {product.description || "Indulge in the finest quality harvests from across India. Our products are sourced directly from sustainable farms, ensuring maximum nutrient retention and traditional taste that respects nature's rhythm."}
              </p>

              {/* Purchase Actions */}
              <div className="space-y-6 pt-12 border-t border-current/10">
                <div className="flex gap-4">
                  <button 
                    onClick={handleAdd}
                    className={`flex-grow py-8 rounded-3xl flex items-center justify-center gap-4 transition-all duration-500 font-black font-hind uppercase tracking-[0.2em] text-xs shadow-2xl ${
                      isDarkMode 
                        ? 'bg-[#FF9933] text-[#1A0F05] hover:bg-white' 
                        : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05]'
                    }`}
                  >
                    <ShoppingBag size={18} /> Add to Collection
                  </button>
                </div>
                <p className="text-[10px] text-center font-hind opacity-40 uppercase tracking-[0.2em]">
                  🔒 Secured Transaction • 🛡️ 100% Quality Assurance
                </p>
              </div>

              {/* Seller Information Card - Amazon Style */}
              <div className={`p-8 rounded-[3rem] border ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-xl'
              }`}>
                <div className="flex items-center gap-6 mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-yatra text-2xl ${
                    isDarkMode ? 'bg-[#FF9933]/20 text-[#FF9933]' : 'bg-[#1A0F05] text-white'
                  }`}>
                    {product.merchants?.store_name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-yatra text-2xl">{product.merchants?.store_name}</h4>
                      {product.merchants?.is_verified && (
                        <ShieldCheck size={18} className="text-blue-500" />
                      )}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Verified Agrinex Partner</p>
                  </div>
                </div>
                
                <p className="text-sm font-hind leading-relaxed opacity-60 mb-8 italic">
                  "{product.merchants?.bio || 'Dedicated to bringing the purest agricultural products directly from Indian soil to your doorstep. Our farming practices respect ancient traditions while leveraging modern quality standards.'}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-current/5">
                  <div className="text-center px-4">
                    <p className="text-xl font-yatra">4.9/5</p>
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Seller Rating</p>
                  </div>
                  <div className="w-[1px] h-8 bg-current/10"></div>
                  <div className="text-center px-4">
                    <p className="text-xl font-yatra">100%</p>
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40">On-Time</p>
                  </div>
                  <div className="w-[1px] h-8 bg-current/10"></div>
                  <div className="text-center px-4">
                    <button className="text-[#FF9933] text-[10px] font-black uppercase tracking-widest hover:underline">Visit Store</button>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="space-y-6">
                <h3 className="font-yatra text-3xl">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Shelf Life', value: '12 Months' },
                    { label: 'Storage', value: 'Cool & Dry Place' },
                    { label: 'Packaging', value: 'Eco-Friendly Bio-Bag' },
                    { label: 'Origin', value: 'Maharashtra, India' }
                  ].map((spec, i) => (
                    <div key={i} className={`p-4 rounded-2xl flex justify-between items-center ${
                      isDarkMode ? 'bg-white/5' : 'bg-black/5'
                    }`}>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{spec.label}</span>
                      <span className="text-xs font-bold font-hind">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 border-t border-current/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            {/* Left: Rating Summary */}
            <div className="space-y-8">
              <h3 className="font-yatra text-4xl">Customer <span className="text-[#FF9933]">Reviews</span></h3>
              <div className="flex items-center gap-6">
                <span className="text-7xl font-black font-hind text-[#FF9933]">{avgRating}</span>
                <div>
                  <div className="flex text-[#FF9933] mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.round(avgRating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Based on {reviews.length} ratings</p>
                </div>
              </div>

              {/* Distribution Bars */}
              <div className="space-y-3">
                {ratingDist.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4">
                    <span className="text-[10px] font-black w-12">{item.stars} Star</span>
                    <div className="flex-grow h-2 bg-current/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        className="h-full bg-[#FF9933]"
                      />
                    </div>
                    <span className="text-[10px] font-black opacity-40 w-8">{Math.round(item.percent)}%</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-6 rounded-2xl border-2 border-current/10 font-black font-hind uppercase tracking-[0.2em] text-[10px] hover:bg-current hover:text-white transition-all`}>
                Write a Review
              </button>
            </div>

            {/* Right: Review List */}
            <div className="lg:col-span-2 space-y-12">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="space-y-4 pb-12 border-b border-current/5 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-yatra ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                          {review.users?.full_name?.charAt(0)}
                        </div>
                        <div>
                          <h5 className="text-xs font-black uppercase tracking-widest">{review.users?.full_name}</h5>
                          <p className="text-[8px] opacity-40 uppercase tracking-widest">Verified Purchase • {new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex text-[#FF9933]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="font-hind text-sm leading-relaxed opacity-70 italic">"{review.comment}"</p>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center opacity-40">
                  <p className="font-yatra text-2xl">No reviews yet.</p>
                  <p className="text-[10px] font-black uppercase tracking-widest mt-2">Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}

      <section className="py-24 border-t border-current/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-yatra text-4xl">From the same <span className="text-[#FF9933]">Category</span></h3>
            <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity underline decoration-[#FF9933] underline-offset-4">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} isDarkMode={isDarkMode} />
              ))
            ) : (
              <div className="col-span-full h-64 rounded-[3rem] border border-dashed border-current/20 flex items-center justify-center text-[10px] font-black uppercase tracking-widest opacity-40">
                Finding more premium items for you...
              </div>
            )}
          </div>

        </div>
      </section>


      <Footer isDarkMode={isDarkMode} />

      {/* Cart Animation Overlay */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{ x: 0, y: -400, scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="fixed z-[100] left-1/2 -translate-x-1/2 top-1/2 w-20 h-20 bg-[#FF9933] rounded-full shadow-2xl flex items-center justify-center pointer-events-none"
          >
            <ShoppingBag size={32} color="white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
