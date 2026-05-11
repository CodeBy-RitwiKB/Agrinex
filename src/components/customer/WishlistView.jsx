import React from 'react';
import { ShoppingCart, Trash2, Heart, Star } from 'lucide-react';

const WishlistView = ({ isDarkMode }) => {
  const savedItems = [
    { id: 1, name: "Wild Organic Honey", price: "₹1,299", img: "https://res.cloudinary.com/demo/image/upload/v1/agrinex/honey", rating: 4.8 },
    { id: 2, name: "Malabar Cardamom", price: "₹950", img: "https://res.cloudinary.com/demo/image/upload/v1/agrinex/seeds", rating: 4.9 },
    { id: 3, name: "Precision Tiller", price: "₹85,000", img: "https://res.cloudinary.com/demo/image/upload/v1/agrinex/machinery", rating: 4.7 }
  ];

  return (
    <div className="space-y-10 admin-reveal">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-yatra">Saved <span className="text-[#FF9933]">Treasures</span></h3>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{savedItems.length} Items Saved</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedItems.map((item) => (
          <div 
            key={item.id} 
            className={`group p-6 rounded-[3.5rem] border transition-all duration-500 hover:scale-[1.02] ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm hover:shadow-xl'
            }`}
          >
            {/* Image Box */}
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-8">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <button className="absolute top-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-hind font-bold text-lg uppercase tracking-tight">{item.name}</h4>
                <div className="flex items-center gap-1 text-[#FF9933]">
                  <Star size={14} fill="#FF9933" />
                  <span className="text-xs font-black">{item.rating}</span>
                </div>
              </div>
              <p className="text-2xl font-yatra text-[#FF9933] mb-8">{item.price}</p>
              
              <button className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-hind text-[10px] font-black uppercase tracking-widest transition-all ${
                isDarkMode 
                  ? 'bg-white text-[#1A0F05] hover:bg-[#FF9933]' 
                  : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05]'
              }`}>
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistView;
