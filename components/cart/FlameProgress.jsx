import React from "react"

// HQ flame progress indicator that grows with fill percentage
export default function FlameProgress({ percent = 0 }) {
  const p = Math.max(0, Math.min(100, percent || 0))
  // Flame height scales with percentage (roughly 0..52px height)
  const flameHeight = Math.max(6, Math.min(52, p * 0.52))
  const yClip = 60 - flameHeight
  const gradId = `gradFlame${p.toFixed(0)}`
  const clipId = `clipFlame${p.toFixed(0)}`
  const glowId = `glowFlame${p.toFixed(0)}`

  return (
    <svg width="120" height="60" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg" aria-label={`Flame progress ${p.toFixed(0)}%`} role="img">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD54A" />
          <stop offset="60%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#FF6F00" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
        <rect x="0" y={yClip} width="80" height={flameHeight} rx="8" ry="8" />
      </clipPath>
      <g clipPath={`url(#${clipId})`} filter={`url(#${glowId})`}>
        <path d="M40 8 C52 14 60 26 46 34 C40 42 28 34 24 26 C28 20 32 14 40 8 Z" fill={`url(#${gradId})`} />
        <path d="M40 2 C50 6, 60 12, 60 20 C60 28, 50 34, 40 40 C28 34, 32 24, 32 20 C32 12, 36 6, 40 2 Z" fill={`url(#${gradId})`} opacity="0.6" />
      </g>
    </svg>
  )
}
