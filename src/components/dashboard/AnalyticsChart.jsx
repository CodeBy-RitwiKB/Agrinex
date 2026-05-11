import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MoreVertical,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react';

const AnalyticsChart = ({
  chartData,
  categoryData,
  isDarkMode,
  selectedBar,
  setSelectedBar,
  selectedCategory,
  setSelectedCategory,
  hoveredBar,
  setHoveredBar,
  isDual = false,
  chartPage = 0,
  setChartPage = () => { }
}) => {
  const [chartType, setChartType] = useState('bar');
  const [isChartMenuOpen, setIsChartMenuOpen] = useState(false);

  return (
    <div className={`dash-reveal lg:col-span-8 p-10 rounded-[3rem] border relative overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
      }`}>
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex items-center gap-6">
          <div>
            <h3 className="text-2xl font-yatra mb-1 text-[#FF9933]">Sales Performance</h3>
            <p className="text-xs font-hind opacity-40 uppercase tracking-[0.2em]">Growth metrics for the last 15 days</p>
          </div>

          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl">
            <button
              onClick={() => setChartPage(p => Math.min(p + 1, 2))}
              disabled={chartPage === 2}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chartPage === 2 ? 'opacity-10 cursor-not-allowed' : 'opacity-40 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              Prev
            </button>
            <div className="flex items-center gap-1 px-2">
              {[2, 1, 0].map(p => (
                <div key={p} className={`w-1 h-1 rounded-full transition-all ${chartPage === p ? 'w-4 bg-[#FF9933]' : 'bg-current opacity-20'}`} />
              ))}
            </div>
            <button
              onClick={() => setChartPage(p => Math.max(p - 1, 0))}
              disabled={chartPage === 0}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chartPage === 0 ? 'opacity-10 cursor-not-allowed' : 'opacity-40 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              Next
            </button>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsChartMenuOpen(!isChartMenuOpen)}
            className={`p-3 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} ${isChartMenuOpen ? 'bg-[#FF9933] text-[#1A0F05]' : ''}`}
          >
            <MoreVertical size={20} />
          </button>

          <AnimatePresence>
            {isChartMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className={`absolute right-0 mt-4 w-56 rounded-2xl border p-2 z-[100] shadow-2xl backdrop-blur-3xl ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/90 border-black/10'
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
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chartType === opt.id
                        ? (isDarkMode ? 'bg-[#FF9933] text-[#1A0F05]' : 'bg-[#1A0F05] text-white')
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
        {chartData.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-hind text-xs font-black uppercase tracking-widest opacity-20 italic">No activity recorded for this period</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {chartType === 'bar' && (
              <motion.div
                key="bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <div className={`h-64 flex items-end justify-between relative ${isDual ? 'gap-1' : 'gap-4'}`}>
                  <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                    {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-current w-full" />)}
                  </div>

                  {chartData.map((data, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full flex flex-col justify-end relative group/bar cursor-pointer"
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                      onClick={() => {
                        setSelectedBar(selectedBar === i ? null : i);
                        setSelectedCategory(null);
                      }}
                    >
                      <AnimatePresence>
                        {(hoveredBar === i || selectedBar === i) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: -10, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap z-50 shadow-2xl border flex flex-col items-center gap-1 ${(hoveredBar === i && selectedBar !== i)
                                ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-[#1A0F05] text-white border-black')
                                : 'bg-[#FF9933] text-[#1A0F05] border-[#FF9933]'
                              }`}
                          >
                            {isDual ? (
                              <>
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                                  <span>TOTAL: {data.value}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                  <span>SHARE: {data.itemValue}</span>
                                </div>
                              </>
                            ) : (
                              <span>{data.value}</span>
                            )}
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${(hoveredBar === i && selectedBar !== i)
                                ? (isDarkMode ? 'border-t-white' : 'border-t-[#1A0F05]')
                                : 'border-t-[#FF9933]'
                              }`} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-end justify-center gap-1.5 w-full h-full">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{
                            height: `${data.h}%`,
                            backgroundColor: selectedBar === i ? (isDual ? '#FF993366' : '#FF9933') : (hoveredBar === i ? (isDual ? '#FF993366' : '#FF9933') : (isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,15,5,0.05)'))
                          }}
                          transition={{
                            height: { duration: 1, delay: 0.5 + (i * 0.05) },
                            backgroundColor: { duration: 0.3 }
                          }}
                          className={`${isDual ? 'w-5' : 'w-10'} rounded-t-2xl relative overflow-hidden transition-all`}
                        />

                        {isDual && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{
                              height: `${data.h_items}%`,
                              backgroundColor: selectedBar === i ? '#FF9933' : (hoveredBar === i ? '#FF9933' : (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,15,5,0.1)'))
                            }}
                            transition={{
                              height: { duration: 1, delay: 0.7 + (i * 0.05) },
                              backgroundColor: { duration: 0.3 }
                            }}
                            className="w-5 rounded-t-2xl relative overflow-hidden shadow-[0_0_15px_rgba(255,153,51,0.2)]"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8 px-2 opacity-20 text-[8px] font-black uppercase tracking-[0.4em]">
                  {chartData.filter((_, i) => i % 3 === 0 || i === chartData.length - 1).map((data, i) => (
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
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF9933" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#FF9933" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M ${chartData.map((d, i) => `${(i / (chartData.length - 1)) * 100} ${100 - d.h}`).join(' L ')} L 100 100 L 0 100 Z`}
                    fill="url(#lineGrad)"
                    className="transition-all duration-1000"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d={`M ${chartData.map((d, i) => `${(i / (chartData.length - 1)) * 100} ${100 - d.h}`).join(' L ')}`}
                    fill="none"
                    stroke="#FF9933"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                    className="drop-shadow-[0_0_15px_rgba(255,153,51,0.4)]"
                  />
                </svg>

                {chartData.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      left: `${(i / (chartData.length - 1)) * 100}%`,
                      bottom: `${d.h}%`
                    }}
                    className="absolute -translate-x-1/2 translate-y-1/2 z-20"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => {
                      setSelectedBar(selectedBar === i ? null : i);
                      setSelectedCategory(null);
                    }}
                  >
                    <AnimatePresence>
                      {(hoveredBar === i || selectedBar === i) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: -10, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap z-50 shadow-2xl border ${(hoveredBar === i && selectedBar !== i)
                              ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-[#1A0F05] text-white border-black')
                              : 'bg-[#FF9933] text-[#1A0F05] border-[#FF9933]'
                            }`}
                        >
                          {d.value}
                          <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${(hoveredBar === i && selectedBar !== i)
                              ? (isDarkMode ? 'border-t-white' : 'border-t-[#1A0F05]')
                              : 'border-t-[#FF9933]'
                            }`} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + (i * 0.05) }}
                      className={`w-3 h-3 rounded-full border-2 shadow-[0_0_15px_rgba(255,153,51,0.5)] cursor-pointer transition-all hover:scale-150 ${selectedBar === i ? 'bg-[#FF9933] border-white scale-125' : (isDarkMode ? 'bg-[#0D0D0D] border-[#FF9933]' : 'bg-white border-[#FF9933]')
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
                          onClick={() => {
                            setSelectedCategory(selectedCategory?.label === cat.label ? null : cat);
                            setSelectedBar(null);
                          }}
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
                    <span className="text-xl font-yatra">
                      {selectedCategory ? `${selectedCategory.value}%` : '100%'}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {categoryData.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedCategory(selectedCategory?.label === cat.label ? null : cat);
                        setSelectedBar(null);
                      }}
                      className={`flex items-center gap-4 transition-all hover:translate-x-2 ${selectedCategory && selectedCategory.label !== cat.label ? 'opacity-30' : 'opacity-100'
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
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;
