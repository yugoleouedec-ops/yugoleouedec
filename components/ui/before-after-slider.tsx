"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Avant",
  afterLabel = "Après",
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) updatePosition(e.clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-3xl cursor-ew-resize aspect-[4/5] ${className || ""}`}
      style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After image (full background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw", maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <motion.div
        className="absolute top-5 left-5 px-3 py-1 rounded-full bg-[#1A1A1A]/60 backdrop-blur-sm text-white text-xs font-semibold"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: sliderPosition > 15 ? 1 : 0, x: 0 }}
      >
        {beforeLabel}
      </motion.div>
      <motion.div
        className="absolute top-5 right-5 px-3 py-1 rounded-full bg-[#1A1A1A]/60 backdrop-blur-sm text-white text-xs font-semibold"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: sliderPosition < 85 ? 1 : 0, x: 0 }}
      >
        {afterLabel}
      </motion.div>

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Vertical line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />

        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: -6 }}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
