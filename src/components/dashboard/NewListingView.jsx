import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Info, Check, ArrowRight, ArrowLeft, Image as ImageIcon, Trash2 } from 'lucide-react';
import TabHeading from './TabHeading';
import PremiumDropdown from './PremiumDropdown';
import { useStore } from '../../store/useStore';

const NewListingView = ({ isDarkMode, onCancel, onSuccess }) => {
  const { token } = useStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([null, null, null, null]);
  const [dbCategories, setDbCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'kg',
    category_id: '',
    stock_quantity: '',
    tag: 'Premium',
    image_url: 'https://res.cloudinary.com/demo/image/upload/v1/agrinex/machinery'
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setDbCategories(data);
    };
    fetchCategories();
  }, []);

  const totalSteps = 3;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handlePublish = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/merchant/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        if (onSuccess) onSuccess();
        else onCancel();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create listing');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[index] = url;
      setImages(newImages);
      // For now, we'll just set the first image as the main image_url
      if (index === 0) setFormData({...formData, image_url: url});
    }
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  return (
    <div className="space-y-12 dash-reveal">
      <div className="flex items-center justify-between">
        <TabHeading 
          title="New"
          highlight="Listing"
          subtitle="Add a new agricultural product to the marketplace"
          isDarkMode={isDarkMode}
        />
        <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
                <div 
                    key={s}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-hind text-sm transition-all duration-500 ${
                        s === step 
                        ? 'bg-[#FF9933] text-[#1A0F05] scale-110 shadow-lg shadow-[#FF9933]/30' 
                        : s < step 
                            ? 'bg-green-500 text-white' 
                            : (isDarkMode ? 'bg-white/5 opacity-30' : 'bg-black/5 opacity-30')
                    }`}
                >
                    {s < step ? <Check size={16} /> : s}
                </div>
            ))}
        </div>
      </div>

      <div className={`p-10 rounded-[3rem] border min-h-[500px] flex flex-col ${
        isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
      }`}>
        <AnimatePresence mode="wait">
            {step === 1 && (
                <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 flex-1"
                >
                    <h3 className="text-xl font-yatra">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Product Name</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="e.g. Premium Basmati Seeds"
                                className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-hind ${
                                    isDarkMode ? 'bg-white/5 border-white/5 focus:border-[#FF9933]/50' : 'bg-black/5 border-black/5 focus:border-[#FF9933]/50'
                                }`}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Category</label>
                            <select 
                                required
                                value={formData.category_id}
                                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                                className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-hind appearance-none ${
                                    isDarkMode ? 'bg-[#1A1A1A] border-white/5 focus:border-[#FF9933]/50' : 'bg-black/5 border-black/5 focus:border-[#FF9933]/50'
                                }`}
                            >
                                <option value="">Select Category</option>
                                {dbCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Description</label>
                        <textarea 
                            rows={6}
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Describe your product's features, benefits, and usage instructions..."
                            className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-hind resize-none ${
                                isDarkMode ? 'bg-white/5 border-white/5 focus:border-[#FF9933]/50' : 'bg-black/5 border-black/5 focus:border-[#FF9933]/50'
                            }`}
                        />
                    </div>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 flex-1"
                >
                    <h3 className="text-xl font-yatra">Pricing & Inventory</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Base Price (₹)</label>
                            <input 
                                type="number" 
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                placeholder="0.00"
                                className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-hind ${
                                    isDarkMode ? 'bg-white/5 border-white/5 focus:border-[#FF9933]/50' : 'bg-black/5 border-black/5 focus:border-[#FF9933]/50'
                                }`}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Unit</label>
                            <select 
                                value={formData.unit}
                                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                                className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-hind appearance-none ${
                                    isDarkMode ? 'bg-[#1A1A1A] border-white/5 focus:border-[#FF9933]/50' : 'bg-black/5 border-black/5 focus:border-[#FF9933]/50'
                                }`}
                            >
                                <option value="kg">per kg</option>
                                <option value="unit">per unit</option>
                                <option value="pack">per pack</option>
                                <option value="litre">per litre</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Initial Stock</label>
                            <input 
                                type="number" 
                                required
                                value={formData.stock_quantity}
                                onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                                placeholder="0"
                                className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-hind ${
                                    isDarkMode ? 'bg-white/5 border-white/5 focus:border-[#FF9933]/50' : 'bg-black/5 border-black/5 focus:border-[#FF9933]/50'
                                }`}
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 flex-1"
                >
                    <h3 className="text-xl font-yatra">Product Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {images.map((img, i) => (
                            <label 
                                key={i}
                                className={`aspect-square rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all cursor-pointer relative overflow-hidden group ${
                                    img 
                                    ? (isDarkMode ? 'border-white/5' : 'border-black/5') 
                                    : (isDarkMode ? 'border-white/10 hover:border-[#FF9933]/50 hover:bg-[#FF9933]/5' : 'border-black/10 hover:border-[#FF9933]/50 hover:bg-[#FF9933]/5')
                                }`}
                            >
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={(e) => handleImageChange(e, i)} 
                                />
                                
                                {img ? (
                                    <>
                                        <img src={img} alt={`preview-${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <button 
                                                onClick={(e) => removeImage(e, i)}
                                                className="p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:scale-110 transition-transform"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/10 flex items-center justify-center text-[#FF9933]">
                                            {i === 0 ? <Upload size={24} /> : <ImageIcon size={24} className="opacity-40" />}
                                        </div>
                                        <div className="text-center px-4">
                                            <span className="block text-[10px] font-black uppercase tracking-widest opacity-40">
                                                {i === 0 ? 'Main Image' : `View ${i + 1}`}
                                            </span>
                                            <span className="block text-[8px] font-hind opacity-20 mt-1">
                                                Click to upload
                                            </span>
                                        </div>
                                    </>
                                )}
                            </label>
                        ))}
                    </div>
                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
                        <Info className="text-blue-500 shrink-0" size={20} />
                        <p className="text-xs font-hind opacity-60 leading-relaxed">
                            Upload high-quality images (min 800x800px) to increase your chances of being featured in the spotlight. White backgrounds work best.
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-10 mt-auto border-t border-current border-opacity-5">
            <button 
                onClick={step === 1 ? onCancel : prevStep}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl font-hind text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all"
            >
                <ArrowLeft size={16} />
                {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <button 
                onClick={step === totalSteps ? handlePublish : nextStep}
                disabled={loading}
                className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#FF9933] text-[#1A0F05] font-hind text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FF9933]/20 disabled:opacity-50"
            >
                {loading ? <div className="w-5 h-5 border-2 border-[#1A0F05] border-t-transparent rounded-full animate-spin" /> : (
                    <>
                        {step === totalSteps ? 'Publish Listing' : 'Continue'}
                        {step !== totalSteps && <ArrowRight size={16} />}
                        {step === totalSteps && <Check size={16} />}
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default NewListingView;
