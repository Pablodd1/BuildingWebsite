"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { 
  getExperienceCart, 
  getVolumeStats,
  removeItemFromCart,
  updateItemQuantity
} from "lib/cart/experienceCart.core"

export default function ContainerVideoModal({ open, onClose }) {
  const [cart, setCart] = useState(null)
  const [stats, setStats] = useState({ percent: 0, totalVolume: 0 })
  const videoRef = useRef(null)

  useEffect(() => {
    let interval;
    if (open) {
      interval = setInterval(() => {
        setCart(getExperienceCart())
        const newStats = getVolumeStats()
        setStats(newStats)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [open])

  // Real-time video scrubbing based on fill percent
  useEffect(() => {
    if (videoRef.current && videoRef.current.duration) {
      // Ensure percent doesn't exceed 100
      const clampedPercent = Math.min(Math.max(stats.percent, 0), 100);
      const targetTime = (clampedPercent / 100) * videoRef.current.duration;
      
      // Scrub video to new position smoothly
      videoRef.current.currentTime = targetTime;
    }
  }, [stats.percent])

  // On mount, wait for metadata to load so we can set initial position
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const clampedPercent = Math.min(Math.max(stats.percent, 0), 100);
      videoRef.current.currentTime = (clampedPercent / 100) * videoRef.current.duration;
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-[90vw] max-w-6xl h-[85vh] rounded-[2rem] overflow-hidden flex shadow-2xl relative animate-in zoom-in-95 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 backdrop-blur-md p-3 rounded-full text-white transition-all shadow-xl border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* LEFT SIDE: Minimalist Cart Data (40%) */}
        <div className="w-[40%] bg-gray-50 flex flex-col h-full border-r border-gray-200">
          <div className="p-8 border-b border-gray-200 bg-white shadow-sm z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">??</span>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800">Your Container</h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 inline-block mt-2">
                {stats.percent.toFixed(1)}% Full
              </p>
              <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mt-2">
                {stats.totalVolume.toFixed(2)} m3 Vol
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-4">
            {cart?.items?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="text-2xl opacity-50">??</span>
                </div>
                <div className="text-center uppercase text-[10px] font-black tracking-[0.2em]">
                  Container is empty
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {cart?.items?.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="text-xs font-black uppercase tracking-tight text-slate-800 leading-tight mb-1">{item.name}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {(item.volume || 0).toFixed(4)} m3 / unit
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100 group-hover:border-blue-100 transition-colors">
                        <button 
                          onClick={() => updateItemQuantity(item.id, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white hover:text-red-500 rounded-lg text-slate-400 transition-colors hover:shadow-sm"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-black w-6 text-center text-slate-700">{item.qty}</span>
                        <button 
                          onClick={() => updateItemQuantity(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white hover:text-blue-500 rounded-lg text-slate-400 transition-colors hover:shadow-sm"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItemFromCart(item.id)}
                        className="text-[9px] font-bold text-slate-300 hover:text-red-500 uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={10} />
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="p-8 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
             <button 
                onClick={() => {
                  window.location.href = '/pagar'
                }}
                disabled={stats.percent < 99}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${stats.percent >= 99 ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
             >
                {stats.percent >= 99 ? 'Proceed to Checkout' : 'Fill container to 99%'}
             </button>
          </div>
        </div>

        {/* RIGHT SIDE: Video Player (60%) */}
        <div className="w-[60%] h-full bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <video 
            ref={videoRef}
            src="/videos/container_video.mp4"
            className="w-full h-full object-cover"
            playsInline
            muted
            onLoadedMetadata={handleLoadedMetadata}
          />
          
          {/* Overlay Stats on Video */}
          <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-2xl">
            <div className="text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
              Real-Time Simulation Feed
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}