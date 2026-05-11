import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreVertical, 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

const PlatformChart = memo(({ 
  isDarkMode, 
  accentColor = "#6366F1",
  selectedBar,
  setSelectedBar,
  selectedCategory,
  setSelectedCategory
}) => {
  const [chartType, setChartType] = useState('bar');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [isChartMenuOpen, setIsChartMenuOpen] = useState(false);

  const platformData = [
    { date: 'JAN', value: '₹1.2 Cr', h: 40 },
    { date: 'FEB', value: '₹1.8 Cr', h: 60 },
    { date: 'MAR', value: '₹1.5 Cr', h: 50 },
    { date: 'APR', value: '₹2.4 Cr', h: 85 },
    { date: 'MAY', value: '₹2.1 Cr', h: 70 },
    { date: 'JUN', value: '₹3.2 Cr', h: 95 },
  ];

  const categoryData = [
    { label: 'Precision Tools', value: 45, color: '#6366F1' },
    { label: 'Organic Seeds', value: 10, color: '#10B981' },
    { label: 'Drip Kits', value: 45, color: '#F59E0B' },
  ];

  return (
    <div className={`dash-reveal lg:col-span-8 p-10 rounded-[3rem] border relative ${
      isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-yatra mb-1">Platform Volume</h3>
            <p className="text-xs font-hind opacity-40 uppercase tracking-[0.2em]">Transaction growth across all merchants</p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsChartMenuOpen(!isChartMenuOpen)}
            className={`p-3 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} ${isChartMenuOpen ? 'bg-indigo-600 text-white' : ''}`}
          >
            <MoreVertical size={20} />
          </button>

          <AnimatePresence>
            {isChartMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className={`absolute right-0 mt-4 w-56 rounded-2xl border p-2 z-[100] shadow-2xl backdrop-blur-3xl ${
                  isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/90 border-black/10'
                }`}
              >
                {[
                  { id: 'bar', label: 'Bar Overview', icon: <BarChartIcon size={16} /> },
                  { id: 'line', label: 'Trend Line', icon: <LineChartIcon size={16} /> },
                  { id: 'pie', label: 'Market Mix', icon: <PieChartIcon size={16} /> },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setChartType(opt.id);
                      setIsChartMenuOpen(false);
                      setSelectedBar(null);
                      setSelectedCategory(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      chartType === opt.id 
                        ? 'bg-indigo-600 text-white'
                        : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5')
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="relative min-h-[16rem]">
        <AnimatePresence mode="wait">
          {chartType === 'bar' && (
            <motion.div 
              key="bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              <div className="h-64 flex items-end justify-between gap-4 relative">
                <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                  {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-current w-full" />)}
                </div>

                {platformData.map((data, i) => (
                  <div 
                    key={i} 
                    className="flex-1 h-full flex flex-col justify-end relative group/bar cursor-pointer outline-none select-none"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => setSelectedBar(selectedBar === i ? null : i)}
                  >
                    <AnimatePresence>
                      {(hoveredBar === i || selectedBar === i) && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: -10, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap z-50 shadow-2xl border ${
                            (hoveredBar === i && selectedBar !== i) 
                              ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-indigo-950 text-white border-indigo-900')
                              : 'bg-indigo-600 text-white border-indigo-500'
                          }`}
                        >
                          {data.value}
                          <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${
                            (hoveredBar === i && selectedBar !== i) 
                              ? (isDarkMode ? 'border-t-white' : 'border-t-indigo-950')
                              : 'border-t-indigo-600'
                          }`} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ 
                        height: `${data.h}%`,
                        backgroundColor: selectedBar === i ? '#6366F1' : (hoveredBar === i ? '#6366F1' : (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.1)'))
                      }}
                      transition={{ 
                        height: { duration: 1, delay: i * 0.05 },
                        backgroundColor: { duration: 0.3 }
                      }}
                      className={`w-full rounded-t-xl relative overflow-hidden ${
                        selectedBar === i ? 'shadow-[0_0_30px_rgba(99,102,241,0.6)]' : (hoveredBar === i ? 'shadow-[0_0_20px_rgba(99,102,241,0.4)]' : '')
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity ${selectedBar === i ? 'opacity-100' : ''}`} />
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-8 px-2 opacity-20 text-[8px] font-black uppercase tracking-[0.4em]">
                {platformData.map((data, i) => (
                  <span key={i}>{data.date}</span>
                ))}
              </div>
            </motion.div>
          )}

          {chartType === 'line' && (
            <motion.div 
              key="line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-64 relative w-full"
            >
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="adminLineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d={`M ${platformData.map((d, i) => `${(i / (platformData.length - 1)) * 100} ${100 - d.h}`).join(' L ')} L 100 100 L 0 100 Z`}
                  fill="url(#adminLineGrad)"
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d={`M ${platformData.map((d, i) => `${(i / (platformData.length - 1)) * 100} ${100 - d.h}`).join(' L ')}`}
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                />
              </svg>

              {platformData.map((d, i) => (
                <div 
                  key={i}
                  style={{ 
                    left: `${(i / (platformData.length - 1)) * 100}%`, 
                    bottom: `${d.h}%` 
                  }}
                  className="absolute -translate-x-1/2 translate-y-1/2 z-20"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={() => setSelectedBar(selectedBar === i ? null : i)}
                >
                  <AnimatePresence>
                    {(hoveredBar === i || selectedBar === i) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap z-50 shadow-2xl border ${
                          (hoveredBar === i && selectedBar !== i) 
                            ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-indigo-950 text-white border-indigo-900')
                            : 'bg-indigo-600 text-white border-indigo-500'
                        }`}
                      >
                        {d.value}
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${
                          (hoveredBar === i && selectedBar !== i) 
                            ? (isDarkMode ? 'border-t-white' : 'border-t-indigo-950')
                            : 'border-t-indigo-600'
                        }`} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-3 h-3 rounded-full border-2 shadow-[0_0_15px_rgba(99,102,241,0.5)] cursor-pointer transition-all hover:scale-150 ${
                      selectedBar === i ? 'bg-indigo-600 border-white scale-125' : (isDarkMode ? 'bg-[#0D0D0D] border-indigo-600' : 'bg-white border-indigo-600')
                    }`}
                  />
                </div>
              ))}
            </motion.div>
          )}

          {chartType === 'pie' && (
            <motion.div 
              key="pie"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-64 flex items-center justify-center gap-16"
            >
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full overflow-visible">
                  {categoryData.reduce((acc, cat, i) => {
                    const offset = categoryData.slice(0, i).reduce((sum, c) => sum + c.value, 0);
                    const gap = 2;
                    acc.push(
                      <motion.circle
                        key={i}
                        cx="50" cy="50" r="40"
                        pathLength="100"
                        fill="none"
                        stroke={cat.color}
                        strokeWidth={selectedCategory?.label === cat.label ? 16 : 10}
                        strokeLinecap="round"
                        strokeDasharray={`${cat.value - gap} ${100 - (cat.value - gap)}`}
                        strokeDashoffset={-offset}
                        pointerEvents="stroke"
                        initial={{ strokeDasharray: "0 100" }}
                        animate={{ 
                          strokeDasharray: `${cat.value - gap} ${100 - (cat.value - gap)}`,
                          strokeWidth: selectedCategory?.label === cat.label ? 16 : 10,
                          opacity: selectedCategory && selectedCategory.label !== cat.label ? 0.3 : 0.9
                        }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        onClick={() => setSelectedCategory(selectedCategory?.label === cat.label ? null : cat)}
                        className="transition-all cursor-pointer hover:opacity-100"
                      />
                    );
                    return acc;
                  }, [])}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">
                    {selectedCategory ? 'Share' : 'Mix'}
                  </span>
                  <span className="text-xl font-yatra text-indigo-400">
                    {selectedCategory ? `${selectedCategory.value}%` : '100%'}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {categoryData.map((cat, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedCategory(selectedCategory?.label === cat.label ? null : cat)}
                    className={`flex items-center gap-4 transition-all hover:translate-x-2 ${
                      selectedCategory && selectedCategory.label !== cat.label ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <div className="text-left">
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-40">{cat.label}</p>
                      <p className="text-sm font-yatra">{cat.value}%</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default PlatformChart;
