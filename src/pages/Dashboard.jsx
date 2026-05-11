import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  Search,
  Bell,
  Sun,
  Moon
} from 'lucide-react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

// Modular Components
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TabHeading from '../components/dashboard/TabHeading';
import StatsCard from '../components/dashboard/StatsCard';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import OrdersTable from '../components/dashboard/OrdersTable';
import SpotlightCard from '../components/dashboard/SpotlightCard';

// New Views
import InventoryView from '../components/dashboard/InventoryView';
import OrdersView from '../components/dashboard/OrdersView';
import CustomersView from '../components/dashboard/CustomersView';
import AnalyticsView from '../components/dashboard/AnalyticsView';
import SettingsView from '../components/dashboard/SettingsView';
import NewListingView from '../components/dashboard/NewListingView';
import MerchantOnboarding from './MerchantOnboarding';

const Dashboard = () => {
  const { 
    token,
    isDarkMode, 
    toggleDarkMode, 
    activeTab,
    setActiveTab, 
    merchantName,
    hasCompletedOnboarding
  } = useStore();

  const containerRef = useRef(null);

  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [selectedBar, setSelectedBar] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chartPage, setChartPage] = useState(0); // 0 = Latest 10, 1 = Mid 10, 2 = Oldest 10

  const displayedChartData = useMemo(() => {
    if (chartPage === 0) return chartData.slice(20);
    if (chartPage === 1) return chartData.slice(10, 20);
    return chartData.slice(0, 10);
  }, [chartData, chartPage]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      try {
        // Fetch Stats
        const statsRes = await fetch('http://localhost:5000/api/merchant/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const statsData = await statsRes.json();
        
        const revenueVal = Number(statsData.revenue) || 0;
        const ordersVal = Number(statsData.orders) || 0;
        const listingsVal = Number(statsData.listings) || 0;
        const customersVal = Number(statsData.customers) || 0;

        setStats([
          { label: 'Total Revenue', value: `₹${revenueVal.toLocaleString('en-IN')}`, change: '+12.5%', icon: <TrendingUp className="text-[#FF9933]" />, trend: 'up', progress: 85 },
          { label: 'Total Orders', value: ordersVal.toString(), change: '+8.2%', icon: <ShoppingCart className="text-[#FF9933]" />, trend: 'up', progress: 65 },
          { label: 'Total Products', value: listingsVal.toString(), change: '+2', icon: <Package className="text-[#FF9933]" />, trend: 'up', progress: 45 },
          { label: 'Unique Customers', value: customersVal.toString(), change: '+15.4%', icon: <Users className="text-[#FF9933]" />, trend: 'up', progress: 75 },
        ]);

        // Fetch Analytics (Chart)
        const analyticsRes = await fetch('http://localhost:5000/api/merchant/analytics', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const rawAnalytics = await analyticsRes.json();
        
        // Generate last 30 days timeline
        const timeline = [];
        for (let i = 29; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
          
          const existingData = rawAnalytics.find(d => d.date === formattedDate);
          timeline.push(existingData || {
            date: formattedDate,
            value: '₹0',
            numeric: 0,
            orders: 0,
            products: 0,
            customers: 0,
            items: []
          });
        }

        // Calculate relative heights for chart (based on full 30 days for consistent scale)
        const maxVal = Math.max(...timeline.map(d => d.numeric), 1);
        const dataWithHeight = timeline.map(d => ({
          ...d,
          h: Math.max((d.numeric / maxVal) * 100, 2)
        }));
        
        setChartData(dataWithHeight);

        // Fetch Recent Orders
        const ordersRes = await fetch('http://localhost:5000/api/merchant/orders/recent', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const ordersData = await ordersRes.json();
        setRecentOrders(ordersData);

      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const currentStats = useMemo(() => {
    if (selectedBar !== null && displayedChartData[selectedBar]) {
        const data = displayedChartData[selectedBar];
        return [
            { label: `Revenue • ${data.date}`, value: data.value, change: 'Selected Day', icon: <TrendingUp className="text-[#FF9933]" />, trend: 'up', progress: 100 },
            { label: `Orders • ${data.date}`, value: data.orders.toString(), change: 'Selected Day', icon: <ShoppingCart className="text-[#FF9933]" />, trend: 'up', progress: 100 },
            { label: `Products • ${data.date}`, value: data.products.toString(), change: 'Selected Day', icon: <Package className="text-[#FF9933]" />, trend: 'up', progress: 100 },
            { label: `Customers • ${data.date}`, value: data.customers.toString(), change: 'Selected Day', icon: <Users className="text-[#FF9933]" />, trend: 'up', progress: 100 },
        ];
    }
    return stats.length > 0 ? stats : [
        { label: 'Total Revenue', value: '...', change: '+0%', icon: <TrendingUp className="text-[#FF9933]" />, trend: 'up', progress: 0 },
        { label: 'Total Orders', value: '...', change: '+0%', icon: <ShoppingCart className="text-[#FF9933]" />, trend: 'up', progress: 0 },
        { label: 'Total Products', value: '...', change: '+0%', icon: <Package className="text-[#FF9933]" />, trend: 'up', progress: 0 },
        { label: 'Unique Customers', value: '...', change: '+0%', icon: <Users className="text-[#FF9933]" />, trend: 'up', progress: 0 },
    ];
  }, [selectedBar, stats, chartData]);

  const categoryData = [
    { label: 'Precision Tools', value: 45, color: '#FF9933' },
    { label: 'Organic Seeds', value: 30, color: '#10B981' },
    { label: 'Drip Kits', value: 25, color: '#3B82F6' },
  ];

  useLayoutEffect(() => {
    if (!hasCompletedOnboarding) return;
    
    const ctx = gsap.context((self) => {
      const targets = self.selector(".dash-reveal");
      if (targets.length > 0) {
        gsap.fromTo(targets, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2, ease: "power3.out" }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab, hasCompletedOnboarding]);

  const handleResetFilters = () => {
    setSelectedBar(null);
    setSelectedCategory(null);
  };

  if (!hasCompletedOnboarding) {
    return <MerchantOnboarding />;
  }

  return (
    <div ref={containerRef} className={`flex min-h-screen ${isDarkMode ? 'bg-[#0D0D0D] text-white' : 'bg-[#FAFAFA] text-[#1A0F05]'}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
      
      <main className="flex-1">
        <DashboardHeader 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={toggleDarkMode} 
        />

        <div className="px-12 pb-20 space-y-12">
          {activeTab === 'overview' && (
            <>
              <TabHeading 
                title="Market"
                highlight="Insights"
                subtitle={selectedBar !== null 
                  ? `Viewing analytics for ${chartData[selectedBar].date}` 
                  : selectedCategory !== null 
                    ? `Market breakdown for ${selectedCategory.label}`
                    : 'Overall Performance (Last 10 Days)'}
                showReset={selectedBar !== null || selectedCategory !== null}
                onReset={handleResetFilters}
                isDarkMode={isDarkMode}
              />

              <div className="dash-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentStats.map((stat, i) => (
                  <StatsCard 
                    key={i} 
                    stat={stat} 
                    i={i} 
                    isDarkMode={isDarkMode} 
                    isSelected={selectedBar !== null || selectedCategory !== null} 
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <AnalyticsChart 
                  chartData={displayedChartData}
                  categoryData={categoryData}
                  isDarkMode={isDarkMode}
                  selectedBar={selectedBar}
                  setSelectedBar={setSelectedBar}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  hoveredBar={hoveredBar}
                  setHoveredBar={setHoveredBar}
                  chartPage={chartPage}
                  setChartPage={setChartPage}
                />
                <SpotlightCard isDarkMode={isDarkMode} />
              </div>

              <OrdersTable orders={recentOrders} isDarkMode={isDarkMode} />
            </>
          )}
          
          {activeTab === 'inventory' && (
            <InventoryView 
              isDarkMode={isDarkMode} 
              onAddNew={() => setActiveTab('new_listing')} 
            />
          )}

          {activeTab === 'new_listing' && (
            <NewListingView 
              isDarkMode={isDarkMode} 
              onCancel={() => setActiveTab('inventory')}
              onSuccess={() => setActiveTab('inventory')}
            />
          )}

          {activeTab === 'orders' && <OrdersView isDarkMode={isDarkMode} />}
          {activeTab === 'customers' && <CustomersView isDarkMode={isDarkMode} />}
          {activeTab === 'analytics' && <AnalyticsView isDarkMode={isDarkMode} />}
          {activeTab === 'settings' && <SettingsView isDarkMode={isDarkMode} />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
