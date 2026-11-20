'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Auto-hide after 3 seconds (was 5)
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            playsInline
            onEnded={() => setShow(false)}
            onLoadedMetadata={(e) => {
              e.target.playbackRate = 1.5; // Make video play 50% faster
            }}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          >
            <source src="/videos/splash-luxuries.mp4" type="video/mp4" />
          </video>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4"
            >
              Building Innovation
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl"
            >
              We Design the Future
            </motion.p>

            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              onClick={() => setShow(false)}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 font-medium"
            >
              Enter Site
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
