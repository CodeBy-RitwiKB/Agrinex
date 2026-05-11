import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, ExternalLink, MoreVertical, Search, Check, X, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import TabHeading from './TabHeading';

const InventoryView = ({ isDarkMode, onAddNew }) => {
  const { token } = useStore();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/merchant/inventory', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setInventory(data);
        } else {
          setInventory([]);
        }
      } catch (err) {
        console.error('Failed to fetch inventory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [token]);

  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredInventory = Array.isArray(inventory) ? inventory.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    (item.category_name && item.category_name.toLowerCase().includes(search.toLowerCase())) ||
    (item.category && item.category.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  const handleEditStart = (item) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/merchant/inventory/${editingId}`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: editForm.name,
            price: parseFloat(editForm.price),
            stock_quantity: parseInt(editForm.stock_quantity)
        })
      });

      if (res.ok) {
        setInventory(prev => prev.map(item => 
          item.id === editingId ? { 
            ...editForm, 
            status: editForm.stock_quantity <= 0 ? 'out_of_stock' : editForm.stock_quantity < 10 ? 'low_stock' : 'active' 
          } : item
        ));
        setEditingId(null);
      }
    } catch (err) {
        console.error('Update failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/merchant/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setInventory(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
        console.error('Delete failed:', err);
    }
  };

  return (
    <div className="space-y-12 dash-reveal">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <TabHeading 
          title="Product"
          highlight="Inventory"
          subtitle="Manage your listed products and stock levels"
          isDarkMode={isDarkMode}
        />
        <div className="flex gap-4">
            <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border transition-all ${
            isDarkMode ? 'bg-white/5 border-white/10 focus-within:border-[#FF9933]/50' : 'bg-black/5 border-black/5 focus-within:border-black/20'
            }`}>
                <Search size={18} className="opacity-40" />
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-none outline-none font-hind text-sm w-40 placeholder:opacity-40"
                />
            </div>
            <button className="p-4 rounded-2xl bg-[#FF9933] text-[#1A0F05] hover:scale-105 transition-transform shadow-lg shadow-[#FF9933]/20">
                <Plus size={20} />
            </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-[#FF9933] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className={`p-10 rounded-[3rem] border overflow-hidden ${
          isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
        }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-hind">
            <thead>
              <tr className="opacity-40 text-[10px] font-black uppercase tracking-[0.3em] border-b border-current border-opacity-5">
                <th className="pb-6 pl-8">Product</th>
                <th className="pb-6">Category</th>
                <th className="pb-6">Price</th>
                <th className="pb-6">Stock</th>
                <th className="pb-6">Status</th>
                <th className="pb-6 pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredInventory.map((item) => (
                  <motion.tr 
                    layout
                    key={item.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`group transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.02]'
                    } ${editingId === item.id ? 'bg-[#FF9933]/5' : ''}`}
                  >
                    <td className="py-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-black/10">
                          <img src={item.image_url || 'https://via.placeholder.com/200'} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        {editingId === item.id ? (
                            <input 
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="bg-white/10 border-none rounded-lg px-2 py-1 text-sm font-bold w-40 outline-none focus:ring-1 ring-[#FF9933]"
                            />
                        ) : (
                            <span className="font-bold">{item.name}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-6 text-sm opacity-70 uppercase tracking-widest">{item.category_name}</td>
                    <td className="py-6 font-bold">
                        {editingId === item.id ? (
                            <div className="flex items-center">
                                <span>₹</span>
                                <input 
                                    type="text"
                                    value={editForm.price}
                                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                                    className="bg-white/10 border-none rounded-lg px-2 py-1 text-sm font-bold w-20 outline-none focus:ring-1 ring-[#FF9933]"
                                />
                            </div>
                        ) : (
                            `₹${Number(item.price).toLocaleString()}`
                        )}
                    </td>
                    <td className="py-6 font-mono text-sm">
                        {editingId === item.id ? (
                             <input 
                                type="number"
                                value={editForm.stock_quantity}
                                onChange={(e) => setEditForm({...editForm, stock_quantity: parseInt(e.target.value) || 0})}
                                className="bg-white/10 border-none rounded-lg px-2 py-1 text-sm font-bold w-20 outline-none focus:ring-1 ring-[#FF9933]"
                            />
                        ) : (
                            `${item.stock_quantity} ${item.unit || 'Units'}`
                        )}
                    </td>
                    <td className="py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                        item.status === 'pending_approval' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-6 pr-8 text-right">
                      {editingId === item.id ? (
                          <div className="flex items-center justify-end gap-2">
                             <button onClick={handleSave} className="p-2 bg-green-500/20 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all">
                                <Check size={16} />
                            </button>
                            <button onClick={() => setEditingId(null)} className="p-2 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                <X size={16} />
                            </button>
                          </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2 transition-opacity">
                            <button onClick={() => handleEditStart(item)} className="p-2 bg-[#FF9933]/5 hover:bg-[#FF9933]/20 rounded-xl text-[#FF9933] transition-colors">
                                <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/5 hover:bg-red-500/20 rounded-xl text-red-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                                <ExternalLink size={16} />
                            </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
};

export default InventoryView;
