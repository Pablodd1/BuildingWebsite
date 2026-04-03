"use client"
import { motion, AnimatePresence } from "framer-motion"

/**
 * PHASE SYSTEM
 * Each phase has colors, label, and a threshold.
 */
const PHASES = [
  {
    min: 0, max: 25,
    label: "Iniciando Carga",
    labelEn: "Loading Started",
    trackBg: "#1e293b",
    fillFrom: "#1d4ed8",
    fillTo: "#3b82f6",
    glow: "rgba(59,130,246,0.6)",
    textColor: "#60a5fa",
    icon: "📦",
  },
  {
    min: 25, max: 60,
    label: "Llenando Contenedor",
    labelEn: "Filling Container",
    trackBg: "#1e293b",
    fillFrom: "#4338ca",
    fillTo: "#818cf8",
    glow: "rgba(129,140,248,0.6)",
    textColor: "#a5b4fc",
    icon: "🚢",
  },
  {
    min: 60, max: 90,
    label: "Casi Completo",
    labelEn: "Almost Full",
    trackBg: "#1c1917",
    fillFrom: "#b45309",
    fillTo: "#f59e0b",
    glow: "rgba(245,158,11,0.7)",
    textColor: "#fbbf24",
    icon: "⚡",
  },
  {
    min: 90, max: 100,
    label: "Optimizando Espacio",
    labelEn: "Optimizing Space",
    trackBg: "#1c1917",
    fillFrom: "#ea580c",
    fillTo: "#f97316",
    glow: "rgba(249,115,22,0.8)",
    textColor: "#fb923c",
    icon: "🔥",
  },
  {
    min: 100, max: 101,
    label: "¡Contenedor Sellado!",
    labelEn: "Container Sealed!",
    trackBg: "#052e16",
    fillFrom: "#16a34a",
    fillTo: "#4ade80",
    glow: "rgba(74,222,128,0.8)",
    textColor: "#4ade80",
    icon: "✅",
  },
]

function getPhase(pct) {
  return PHASES.find(p => pct >= p.min && pct < p.max) || PHASES[PHASES.length - 1]
}

/**
 * LiquidBar — the animated fill strip with wave effect
 */
function LiquidBar({ pct, phase }) {
  const clamped = Math.min(pct, 100)
  return (
    <div
      className="relative w-full rounded-full overflow-hidden"
      style={{ height: 18, background: phase.trackBg, boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)" }}
    >
      {/* Filled track */}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${phase.fillFrom}, ${phase.fillTo})`,
          boxShadow: `0 0 16px ${phase.glow}`,
        }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      />

      {/* Wave shimmer on top of fill */}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
        style={{
          width: `${clamped}%`,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Foam bubble at the leading edge */}
      {clamped > 2 && clamped < 100 && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `calc(${clamped}% - 8px)`,
            width: 10, height: 10,
            background: phase.fillTo,
            boxShadow: `0 0 12px ${phase.glow}`,
            filter: "blur(1px)",
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Percent text inside bar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[10px] font-black tracking-widest mix-blend-overlay"
          style={{ color: "white", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
        >
          {clamped.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

/**
 * SegmentedMilestones — small tick marks at 25 / 50 / 75 / 100%
 */
function Milestones({ pct }) {
  const marks = [25, 50, 75, 100]
  return (
    <div className="relative w-full flex items-center mt-1 px-0">
      {marks.map(m => (
        <div
          key={m}
          className="absolute flex flex-col items-center"
          style={{ left: `${m}%`, transform: "translateX(-50%)" }}
        >
          <div
            className="w-px h-2 mb-0.5 transition-colors duration-500"
            style={{ backgroundColor: pct >= m ? "#4ade80" : "rgba(255,255,255,0.2)" }}
          />
          <span
            className="text-[8px] font-bold transition-colors duration-500"
            style={{ color: pct >= m ? "#4ade80" : "rgba(255,255,255,0.3)" }}
          >
            {m}%
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * StatChip — a single stat pill
 */
function StatChip({ label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm font-black font-mono"
        style={{ color }}
      >
        {value}
      </motion.span>
    </div>
  )
}

/**
 * ContainerProgressHUD
 * Props:
 *   fillPercent   - number 0–100
 *   usableVolume  - total usable m³ of the container
 *   usedVolume    - m³ already loaded
 *   remainingVolume - m³ left
 *   itemCount     - number of line items
 *   size          - "20ft" | "40ft"
 *   lang          - "es" | "en"
 */
export default function ContainerProgressHUD({
  fillPercent = 0,
  usableVolume = 0,
  usedVolume = 0,
  remainingVolume = 0,
  itemCount = 0,
  size = "40ft",
  lang = "es",
}) {
  const pct = Math.min(Math.max(fillPercent, 0), 100)
  const phase = getPhase(pct)
  const isFull = pct >= 100

  return (
    <div
      className="w-full rounded-2xl px-5 py-4 flex flex-col gap-3"
      style={{
        background: "linear-gradient(135deg, rgba(10,10,20,0.97) 0%, rgba(15,20,40,0.97) 100%)",
        border: `1px solid ${phase.glow.replace('0.6','0.25')}`,
        boxShadow: `0 0 30px ${phase.glow.replace('0.6','0.12')}, inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Header row: phase icon + label + size badge */}
      <div className="flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2"
          >
            <span className="text-lg leading-none">{phase.icon}</span>
            <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: phase.textColor }}>
              {lang === "es" ? phase.label : phase.labelEn}
            </span>
          </motion.div>
        </AnimatePresence>

        <div
          className="px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest border"
          style={{
            color: phase.textColor,
            borderColor: phase.glow.replace('0.6','0.3'),
            background: phase.glow.replace('0.6','0.1'),
          }}
        >
          {size.toUpperCase()} HC
        </div>
      </div>

      {/* Liquid progress bar */}
      <LiquidBar pct={pct} phase={phase} />

      {/* Milestone ticks */}
      <Milestones pct={pct} />

      {/* Stats row */}
      <div
        className="flex items-center justify-between pt-2 border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <StatChip
          label={lang === "es" ? "Cargado" : "Loaded"}
          value={`${usedVolume.toFixed(1)}m³`}
          color={phase.textColor}
        />
        <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />
        <StatChip
          label={lang === "es" ? "Disponible" : "Available"}
          value={isFull ? "0.0m³" : `${remainingVolume.toFixed(1)}m³`}
          color={isFull ? "#4ade80" : "rgba(255,255,255,0.5)"}
        />
        <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />
        <StatChip
          label={lang === "es" ? "Total HC" : "Total Cap"}
          value={`${usableVolume.toFixed(1)}m³`}
          color="rgba(255,255,255,0.4)"
        />
        <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />
        <StatChip
          label={lang === "es" ? "Productos" : "Items"}
          value={String(itemCount)}
          color="rgba(255,255,255,0.6)"
        />
      </div>

      {/* Full seal banner */}
      <AnimatePresence>
        {isFull && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8, y: 6 }}
            animate={{ opacity: 1, scaleX: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="rounded-xl py-2.5 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(90deg, #14532d, #166534)",
              border: "1px solid rgba(74,222,128,0.4)",
              boxShadow: "0 0 20px rgba(74,222,128,0.25)",
            }}
          >
            <span className="text-green-400 font-black text-xs tracking-[0.2em] uppercase">
              ✦ {lang === "es" ? "Contenedor Sellado — Listo para Cotizar" : "Container Sealed — Ready for Quote"} ✦
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
