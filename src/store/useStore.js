import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth State
      user: null,
      token: null,
      isAuthenticated: false,

      // Merchant State
      merchantName: '',
      gstin: '',
      merchantType: 'Standard Merchant',
      businessType: 'Retailer',
      hasCompletedOnboarding: false,

      // Auth Actions
      setAuth: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: !!token,
        merchantName: user.role === 'merchant' ? user.full_name : '' 
      }),
      setUser: (user) => set({ user }),
      logout: () => {

        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('agrinex-storage');
      },

      // Actions
      setMerchantName: (name) => set({ merchantName: name }),
      setGstin: (gstin) => set({ 
        gstin,
        merchantType: gstin ? 'Premium Merchant' : 'Standard Merchant'
      }),
      setBusinessType: (type) => set({ businessType: type }),
      
      // Future DB Connection: Call this to sync with MongoDB/SQL
      updateProfile: async (data) => {
        // Here you would do: await api.patch('/profile', data)
        set((state) => ({ 
          ...state, 
          ...data,
          merchantType: (data.gstin || state.gstin) ? 'Premium Merchant' : 'Standard Merchant'
        }));
      },

      completeOnboarding: () => {
        const state = get();
        set({ 
          hasCompletedOnboarding: true,
          merchantType: state.gstin ? 'Premium Merchant' : 'Standard Merchant'
        });
      },

      // Dashboard Navigation State
      activeTab: 'overview',
      settingsSection: 'profile',
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSettingsSection: (section) => set({ settingsSection: section }),

      // Theme State
      isDarkMode: true,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'agrinex-storage', // key in localStorage
    }
  )
);
