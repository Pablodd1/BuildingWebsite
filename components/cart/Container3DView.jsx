"use client"
import React from "react"
import { motion } from "framer-motion"

/**
 * TetrisContainer – a gamified, Tetris‑style representation of container loading.
 * It uses the fillPercent to render a visual block representation out of 100%.
 */
export default function Container3DView({
  size = "40ft",
  width = 2.35,
  height = 2.39,
  length = 12.03,
  items = [],
  fillPercent = 0,
  isInteractive = false,
  onSelect,
  className = "",
  scale = 1,
}) {
  // Grid configuration: 10 columns, 10 rows (100 blocks = 100%)
  const COLUMNS = 10
  const ROWS = 10
  
  const blocksToFill = Math.min(100, Math.ceil(fillPercent))

  // Determine colors from items (fallback to default blue)
  const colors = items.length > 0 
    ? items.map(item => item.color || "#3b82f6") 
    : ["#3b82f6"]

  // Generate blocks
  const blocks = Array.from({ length: blocksToFill }).map((_, idx) => {
    const col = (idx % COLUMNS) + 1
    const rowFromBottom = Math.floor(idx / COLUMNS) + 1
    const row = ROWS - rowFromBottom + 1
    
    // Assign a color cyclically based on the items to make it look diverse
    const color = colors[idx % colors.length]
    
    return { id: idx, col, row, color }
  })

  const handleClick = () => {
    if (isInteractive && onSelect) onSelect()
  }

  return (
    <div
      className={`relative ${className} group h-full w-full p-4`}
      style={{
        cursor: isInteractive ? "pointer" : "default",
      }}
      onClick={handleClick}
    >
      {/* Grid background */}
      <div
        className="grid gap-1 bg-[#0a0f18] p-2 rounded-xl border border-white/5 shadow-2xl h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {/* Empty cells background (faint) */}
        {Array.from({ length: 100 }).map((_, idx) => {
           const col = (idx % COLUMNS) + 1
           const rowFromBottom = Math.floor(idx / COLUMNS) + 1
           const row = ROWS - rowFromBottom + 1
           return (
             <div 
               key={`bg-${idx}`} 
               className="bg-white/5 rounded-[2px]" 
               style={{ gridColumnStart: col, gridRowStart: row }}
             />
           )
        })}

        {/* Filled blocks with falling animation */}
        {blocks.map(block => (
          <motion.div
            key={block.id}
            className="rounded-[2px] shadow-sm relative z-10"
            style={{
              backgroundColor: block.color,
              gridColumnStart: block.col,
              gridRowStart: block.row,
              boxShadow: `0 0 10px ${block.color}40`
            }}
            initial={{ y: -50, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: (block.row * 0.02) + (Math.random() * 0.05),
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          />
        ))}
      </div>
    </div>
  )
}