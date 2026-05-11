import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Shield, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';


const CustomerSettingsView = ({ isDarkMode }) => {
  const { user, token, setUser } = useStore();
  const [editingId, setEditingId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    full_name: user?.full_name || '',
    phone_number: user?.phone_number || '',
    address: user?.address || '',
    current_password: '',
    new_password: ''
  });
  const [isSaving, setIsSaving] = React.useState(false);

  const handleUpdate = async (e, directId = null) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    const targetId = directId || editingId;
    
    try {
      const endpointMap = {
        profile: 'profile',
        address: 'profile',
        password: 'change-password',
        email: 'email',
        '2fa': '2fa',
        payment: 'payments'
      };
      
      const endpoint = endpointMap[targetId];
      const method = targetId === 'payment' ? 'POST' : 'PATCH';
      
      const body = targetId === '2fa' 
        ? { enabled: !user.two_factor_enabled }
        : formData;

      const response = await fetch(`http://localhost:5000/api/users/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (response.ok) {
        if (data.user) setUser(data.user);
        else if (data.email) setUser({ ...user, email: data.email });
        else if (targetId === '2fa') setUser({ ...user, two_factor_enabled: data.enabled });
        
        alert('Updated successfully');
        setEditingId(null);
        setFormData({ ...formData, current_password: '', new_password: '' });
      } else {
        alert(data.error || 'Failed to update');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };


  const sections = [
    { title: 'Personal Identity', items: [
      { id: 'profile', label: 'Profile Details', sub: user?.full_name || 'Update your name', icon: <User />, editable: true },
      { id: 'email', label: 'Email Preferences', sub: user?.email || 'Manage your email', icon: <Mail />, editable: true }
    ]},
    { title: 'Security & Access', items: [
      { id: 'password', label: 'Password', sub: 'Securely Encrypted', icon: <Lock />, editable: true },
      { id: '2fa', label: 'Two-Factor Auth', sub: user?.two_factor_enabled ? 'Active Protection' : 'Disabled', icon: <Shield />, editable: true, isToggle: true }
    ]},
    { title: 'Marketplace Info', items: [
      { id: 'address', label: 'Shipping Address', sub: user?.address || 'No address saved yet', icon: <MapPin />, editable: true },
      { id: 'payment', label: 'Payment Methods', sub: 'Visa Ending in 4242', icon: <CreditCard />, editable: true }
    ]}
  ];

  return (
    <div className="space-y-12 admin-reveal pb-10">
      <AnimatePresence mode="wait">
        {editingId && editingId !== '2fa' ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`p-12 rounded-[4rem] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-2xl'}`}
          >
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-yatra text-3xl">Edit <span className="text-[#FF9933]">
                {editingId === 'profile' ? 'Profile Details' : 
                 editingId === 'address' ? 'Shipping Address' : 
                 editingId === 'password' ? 'Account Password' : 
                 editingId === 'email' ? 'Email Address' : 
                 'Payment Methods'}
              </span></h3>
              <button onClick={() => setEditingId(null)} className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Cancel</button>
            </div>


            <form onSubmit={(e) => handleUpdate(e)} className="space-y-8">
              {editingId === 'profile' ? (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone_number}
                      onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                      className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                  </div>
                </>
              ) : editingId === 'email' ? (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">New Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Confirm with Password</label>
                    <input 
                      type="password" 
                      value={formData.current_password}
                      onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                      className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                  </div>
                </>
              ) : editingId === 'password' ? (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Current Password</label>
                    <input 
                      type="password" 
                      value={formData.current_password}
                      onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                      className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">New Password</label>
                    <input 
                      type="password" 
                      value={formData.new_password}
                      onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                      className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                  </div>
                </>
              ) : editingId === 'payment' ? (
                <div className="space-y-12">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#FF9933]/10 rounded-2xl flex items-center justify-center text-[#FF9933]">
                      <CreditCard size={32} />
                    </div>
                    <div>
                      <h4 className="font-yatra text-2xl">Add Secure Card</h4>
                      <p className="text-[10px] font-hind opacity-40 uppercase tracking-widest">Saved for future purchases</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Cardholder Name</label>
                      <input 
                        type="text" 
                        placeholder="AMAN KUMAR"
                        className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Card Number</label>
                      <input 
                        type="text" 
                        placeholder="•••• •••• •••• 4242"
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(-4);
                          setFormData({...formData, last4: val, provider: 'Visa', type: 'card'});
                        }}
                        className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Expiry Date</label>
                      <input 
                        type="text" 
                        autoComplete="off"
                        placeholder="MM / YY"
                        className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">CVV</label>
                      <input 
                        type="password" 
                        autoComplete="new-password"
                        placeholder="•••"
                        className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                      />
                    </div>
                  </div>





                  <div className="p-8 rounded-3xl bg-[#FF9933]/5 border border-[#FF9933]/20 flex items-center gap-6">
                    <Shield size={24} className="text-[#FF9933]" />
                    <p className="text-xs font-hind opacity-60">Your card data is encrypted and managed through our secure banking partner. We never store your full card number on our servers.</p>
                  </div>
                </div>
              ) : (

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Delivery Address</label>
                  <textarea 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows="3"
                    className={`w-full bg-transparent border-b border-current/20 py-4 px-4 font-hind text-lg focus:outline-none focus:border-[#FF9933] transition-colors resize-none ${isDarkMode ? 'text-white' : 'text-black'}`}
                  />
                </div>
              )}

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full py-6 rounded-2xl bg-[#FF9933] text-white font-hind font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#FF9933]/20 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isSaving ? 'Synchronizing with Database...' : (editingId === 'payment' ? 'Save Secure Card' : 'Save Changes')}
              </button>


            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {sections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 ml-8">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        if (!item.editable) return;
                        if (item.isToggle) {
                          handleUpdate(null, item.id);
                        } else {
                          setEditingId(item.id);
                        }
                      }}
                      className={`group p-8 rounded-[3rem] border transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
                        isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-white border-black/5 shadow-sm hover:shadow-xl'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                            isDarkMode ? 'bg-black/40 text-[#FF9933]' : 'bg-[#F5F5F3] text-[#1A0F05]'
                          }`}>
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-hind font-bold text-sm uppercase tracking-wider">{item.label}</h4>
                            <p className={`text-[10px] font-hind uppercase tracking-widest truncate max-w-[200px] ${item.id === '2fa' && user?.two_factor_enabled ? 'text-[#FF9933] font-black' : 'opacity-40'}`}>
                              {item.sub}
                            </p>
                          </div>
                        </div>
                        {item.editable && !item.isToggle && (
                          <ChevronRight size={18} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                        )}
                        {item.isToggle && (
                          <div className={`w-12 h-6 rounded-full p-1 transition-colors ${user?.two_factor_enabled ? 'bg-[#FF9933]' : 'bg-current/10'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${user?.two_factor_enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>



      {/* Danger Zone */}
      <div className={`p-12 rounded-[4rem] border border-red-500/20 bg-red-500/5 mt-20`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-xl font-yatra text-red-500 mb-2">Delete Account</h4>
            <p className="text-sm font-hind opacity-60">Permanently remove all your agricultural data and history.</p>
          </div>
          <button className="px-10 py-5 rounded-2xl bg-red-500 text-white font-hind text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20">
            Request Deletion
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSettingsView;
