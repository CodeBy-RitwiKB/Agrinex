import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, Smartphone, Eye, EyeOff, Save } from 'lucide-react';

const SecuritySection = ({ isDarkMode, inputClasses, labelClasses }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 ml-2">Change Password</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="space-y-3">
            <label className={labelClasses}>Current Password</label>
            <div className="relative group">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••"
                className={`${inputClasses} pr-24`}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                <Lock size={18} className="opacity-20 group-focus-within:opacity-100 transition-opacity" />
                <button
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="text-[#FF9933] transition-all hover:scale-110"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className={labelClasses}>New Password</label>
            <div className="relative group">
              <input
                type={showNew ? "text" : "password"}
                placeholder="••••••••"
                className={`${inputClasses} pr-24`}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                <ShieldCheck size={18} className="opacity-20 group-focus-within:opacity-100 transition-opacity" />
                <button
                  onClick={() => setShowNew(!showNew)}
                  className="text-[#FF9933] transition-all hover:scale-110"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#FF9933] text-[#1A0F05] font-hind text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FF9933]/20">
            <Save size={18} />
            Update Password
          </button>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-[#FF9933]/5 border border-[#FF9933]/10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FF9933]/10 flex items-center justify-center text-[#FF9933]">
            <Smartphone size={28} />
          </div>
          <div>
            <h4 className="font-bold font-hind text-lg">Two-Factor Authentication</h4>
            <p className="text-sm opacity-50 font-hind">Add an extra layer of security to your merchant account.</p>
          </div>
        </div>
        <button className="px-8 py-4 rounded-xl bg-[#1A0F05] text-white dark:bg-white dark:text-[#1A0F05] font-hind text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
          Enable 2FA
        </button>
      </div>

      <div className="pt-6">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-4 ml-3">Danger Zone</h4>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-8 py-4 rounded-xl border border-red-500/30 text-red-500 font-hind text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
        >
          Delete Merchant Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-md p-10 rounded-[3rem] border border-red-500/20 shadow-2xl ${isDarkMode ? 'bg-[#1A0F05] text-white' : 'bg-white text-[#1A0F05]'
                }`}
            >
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-8">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-3xl font-yatra text-center mb-4">Are you sure?</h3>
              <p className="text-sm opacity-60 font-hind text-center mb-10 leading-relaxed">
                This action is permanent and cannot be undone. All your products, order history, and customer data will be wiped from Agrinex.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`py-5 rounded-2xl font-hind text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                    }`}
                >
                  Cancel
                </button>
                <button className="py-5 rounded-2xl bg-red-500 text-white font-hind text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20">
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecuritySection;
