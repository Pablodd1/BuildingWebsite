'use client'
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MultiSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  function toggle(val) {
    onChange(value.includes(val) ? value.filter(v => v !== val) : [...value, val]);
  }

  return (
    <div ref={dropdownRef} className="relative col-span-2 md:col-span-1">
      <motion.button
        ref={buttonRef}
        aria-label="Toggle selection"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm flex justify-between items-center bg-white hover:border-gray-400 transition-colors"
      >
        <span className="truncate font-medium">
          {value.length ? `${value.length} selected` : label}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
      
      {open && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              width: Math.max(position.width, 350),
              zIndex: 9999,
            }}
            className="rounded-xl border-2 border-gray-200 bg-white shadow-2xl overflow-hidden"
          >
            <div className="max-h-[400px] overflow-auto p-3">
              {options.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">No options available</p>
              ) : (
                options.map(opt => (
                  <motion.label
                    key={opt}
                    whileHover={{ scale: 1.01, backgroundColor: "#f3f4f6" }}
                    className="flex items-center gap-4 text-sm py-3 px-4 rounded-lg cursor-pointer transition-colors mb-1"
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${value.includes(opt) ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
                      {value.includes(opt) && <Check size={14} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={value.includes(opt)}
                      onChange={() => toggle(opt)}
                      className="hidden"
                    />
                    <span className={`truncate ${value.includes(opt) ? "font-semibold" : "text-gray-700"}`}>{opt}</span>
                  </motion.label>
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
