import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, ShoppingBag, Download, Package } from 'lucide-react';
import TabHeading from './TabHeading';
import StatsCard from './StatsCard';
import AnalyticsChart from './AnalyticsChart';
import { useStore } from '../../store/useStore';

const AnalyticsView = ({ isDarkMode }) => {
  const { token } = useStore();
  const [selectedBar, setSelectedBar] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartPage, setChartPage] = useState(0); // 0 = Latest 10, 1 = Mid 10, 2 = Oldest 10

  const displayedChartData = useMemo(() => {
    if (chartPage === 0) return chartData.slice(20);
    if (chartPage === 1) return chartData.slice(10, 20);
    return chartData.slice(0, 10);
  }, [chartData, chartPage]);

  const [baseStats, setBaseStats] = useState([
    { label: 'Net Revenue', value: '...', change: '+0%', icon: <TrendingUp className="text-[#FF9933]" />, trend: 'up', progress: 0 },
    { label: 'Total Orders', value: '...', change: '+0%', icon: <ShoppingBag className="text-[#FF9933]" />, trend: 'up', progress: 0 },
    { label: 'Total Products', value: '...', change: '+0%', icon: <Package className="text-[#FF9933]" />, trend: 'up', progress: 0 },
    { label: 'Unique Customers', value: '...', change: '+0%', icon: <Users className="text-[#FF9933]" />, trend: 'up', progress: 0 },
  ]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, categoryRes, statsRes] = await Promise.all([
          fetch('http://localhost:5000/api/merchant/analytics', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:5000/api/merchant/categories/stats', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:5000/api/merchant/stats', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        const [rawAnalytics, categories, stats] = await Promise.all([
          analyticsRes.json(),
          categoryRes.json(),
          statsRes.json()
        ]);
        
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
            itemValue: '₹0',
            itemNumeric: 0,
            orders: 0,
            products: 0,
            customers: 0,
            items: []
          });
        }

        // Calculate relative heights for chart
        const maxVal = Math.max(...timeline.map(d => d.numeric), 1);
        const analyticsWithHeight = timeline.map(d => ({
          ...d,
          h: Math.max((d.numeric / maxVal) * 100, 2),
          h_items: Math.max((d.itemNumeric / maxVal) * 100, 2)
        }));

        setChartData(analyticsWithHeight);
        setCategoryData(categories);
        
        const rev = parseFloat(stats.revenue || 0);
        const ord = parseInt(stats.orders || 0);
        setBaseStats([
          { label: 'Net Revenue', value: `₹${rev.toLocaleString()}`, change: '+12.5%', icon: <TrendingUp className="text-[#FF9933]" />, trend: 'up', progress: 85 },
          { label: 'Total Orders', value: ord.toString(), change: '+8.2%', icon: <ShoppingBag className="text-[#FF9933]" />, trend: 'up', progress: 65 },
          { label: 'Total Products', value: stats.listings.toString(), change: '+2', icon: <Package className="text-[#FF9933]" />, trend: 'up', progress: 45 },
          { label: 'Unique Customers', value: stats.customers.toString(), change: '+15.4%', icon: <Users className="text-[#FF9933]" />, trend: 'up', progress: 75 },
        ]);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Derive reactive stats based on selection ONLY
  const activeStats = useMemo(() => {
    if (selectedBar !== null && displayedChartData[selectedBar]) {
      const data = displayedChartData[selectedBar];
      return [
        { ...baseStats[0], value: data.value, label: `Revenue (${data.date})`, change: 'Selected Day', progress: 100 },
        { ...baseStats[1], value: data.orders.toString(), label: `Orders (${data.date})`, change: 'Selected Day', progress: 100 }, 
        { ...baseStats[2], value: data.products.toString(), label: `Items (${data.date})`, change: 'Selected Day', progress: 100 },
        { ...baseStats[3], value: data.customers.toString(), label: `Customers (${data.date})`, change: 'Selected Day', progress: 100 },
      ];
    }

    if (selectedCategory) {
        return [
            { ...baseStats[0], value: `${selectedCategory.value} items`, label: `${selectedCategory.label} Vol`, change: 'Category Share', progress: 100 },
            { ...baseStats[1], value: 'N/A', change: 'N/A', trend: 'up', progress: 0 },
            { ...baseStats[2], value: selectedCategory.value.toString(), label: `${selectedCategory.label} Count`, progress: 100 },
            { ...baseStats[3], value: 'N/A', change: 'N/A', progress: 0 },
        ];
    }

    return baseStats;
  }, [selectedBar, selectedCategory, baseStats, displayedChartData]);

  return (
    <div className="space-y-12 dash-reveal">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <TabHeading 
          title="Deep"
          highlight="Analytics"
          subtitle={
            selectedBar !== null ? `Viewing data for ${displayedChartData[selectedBar].date}` : 
            selectedCategory ? `Focusing on ${selectedCategory.label}` :
            "Uncover hidden trends (Last 10 Days)"
          }
          isDarkMode={isDarkMode}
        />
        <button className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-[#FF9933] text-[#1A0F05] font-hind text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#FF9933]/20`}>
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {activeStats.map((stat, i) => (
          <StatsCard key={`${stat.label}-${i}`} stat={stat} i={i} isDarkMode={isDarkMode} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 h-full">
            <AnalyticsChart 
                chartData={displayedChartData}
                categoryData={categoryData}
                isDarkMode={isDarkMode}
                selectedBar={selectedBar}
                setSelectedBar={setSelectedBar}
                hoveredBar={hoveredBar}
                setHoveredBar={setHoveredBar}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isDual={true}
                chartPage={chartPage}
                setChartPage={setChartPage}
            />
        </div>
        
        <div className="lg:col-span-4 h-full">
            <div className={`p-10 rounded-[3rem] border h-full transition-all flex flex-col ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
            } ${selectedBar !== null ? 'border-[#FF9933]/40 ring-4 ring-[#FF9933]/5' : ''}`}>
                <h3 className="text-xl font-yatra mb-8 flex items-center justify-between">
                    <span>Order Details</span>
                    {selectedBar !== null && (
                      <span className="text-[10px] font-hind font-black uppercase tracking-widest opacity-40 px-3 py-1 rounded-full bg-current/5">
                        {displayedChartData[selectedBar].date}
                      </span>
                    )}
                </h3>
                
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {selectedBar !== null ? (
                    <div className="space-y-4">
                      {displayedChartData[selectedBar].items.length > 0 ? (
                        displayedChartData[selectedBar].items.map((item, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx} 
                            className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#FF9933]/20 transition-all group"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-hind text-xs font-bold uppercase tracking-wide opacity-80 group-hover:text-[#FF9933] transition-colors">{item.name}</span>
                              <span className="font-hind text-[10px] font-black text-[#FF9933]">x{item.qty}</span>
                            </div>
                            <div className="flex justify-between items-center opacity-40">
                              <span className="font-hind text-[10px] uppercase tracking-widest">Unit Price</span>
                              <span className="font-hind text-[10px] font-bold">₹{item.price.toLocaleString()}</span>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-40 opacity-20 text-center space-y-4">
                          <ShoppingBag size={48} strokeWidth={1} />
                          <p className="font-hind text-xs uppercase tracking-widest">No items sold on this day</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-20 text-center space-y-4 px-6">
                      <BarChart3 size={48} strokeWidth={1} />
                      <p className="font-hind text-xs uppercase tracking-widest leading-relaxed">Select a bar on the chart to view specific items sold</p>
                    </div>
                  )}
                </div>

                {selectedBar !== null && (
                  <div className="mt-8 pt-8 border-t border-current/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-hind text-xs uppercase tracking-widest opacity-40">Orders</span>
                      <span className="font-hind text-xs font-black">{displayedChartData[selectedBar].orders} Trans.</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-hind text-xs uppercase tracking-widest opacity-40">Avg. Order Value</span>
                      <span className="font-hind text-xs font-black text-[#FF9933]">
                        ₹{displayedChartData[selectedBar].orders > 0 ? (displayedChartData[selectedBar].numeric / displayedChartData[selectedBar].orders).toFixed(0) : 0}
                      </span>
                    </div>
                  </div>
                )}
            </div>
        </div>
      </div>

      {/* Performance Hub & Metrics moved down */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className={`p-10 rounded-[3rem] border transition-all ${
              isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
          }`}>
              <h3 className="text-xl font-yatra mb-8">Performance Hub</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                      { label: 'Direct Traffic', value: '45%', color: '#FF9933' },
                      { label: 'Referral', value: '25%', color: '#10B981' },
                      { label: 'Social Media', value: '30%', color: '#3B82F6' }
                  ].map((item, i) => (
                      <div key={i} className="space-y-4">
                          <div className="flex items-center justify-between font-hind text-xs font-bold uppercase tracking-widest opacity-60">
                              <span>{item.label}</span>
                              <span>{item.value}</span>
                          </div>
                          <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: item.value }}
                                  transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: "circOut" }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: item.color }}
                              />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className={`p-10 rounded-[3rem] border h-full transition-all ${
              isDarkMode ? 'bg-[#FF9933]/5 border-[#FF9933]/20' : 'bg-white border-black/5 shadow-sm'
          }`}>
              <div className="flex items-center gap-4 text-[#FF9933] mb-6">
                  <TrendingUp size={24} />
                  <span className="font-yatra text-lg">AI Suggestion</span>
              </div>
              <p className="font-hind text-sm opacity-70 leading-relaxed italic">
                  {selectedBar !== null ? 
                    `Selection Locked: Analyzing ${displayedChartData[selectedBar].date}. Items like ${displayedChartData[selectedBar].items[0]?.name || 'these'} are driving 15% higher conversion than average.` :
                    "Your revenue is up by 18% this month. Focusing on 'Precision Tools' could yield another 5% growth by June."
                  }
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
