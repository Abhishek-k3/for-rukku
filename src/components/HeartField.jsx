import React, { useMemo, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function seededRandom(i) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function Heart({ h, idx, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -120 * h.speed])
  const ySpring = useSpring(y, { damping: 30, stiffness: 120 })

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <motion.div
      style={{ top: h.top, left: h.left, y: ySpring, zIndex: -60, fontSize: h.sizePx, filter: `blur(${h.blur}px)`, opacity: h.opacity }}
      className={`absolute transform-gpu will-change-transform`}
      aria-hidden
    >
      <motion.div
        animate={prefersReduced ? {} : { y: [0, -h.amplitude, 0], x: [0, h.sideways, 0] }}
        transition={prefersReduced ? {} : { duration: h.duration, repeat: Infinity, repeatType: 'mirror', ease: 'linear', delay: h.delay }}
      >
        {h.char}
      </motion.div>
    </motion.div>
  )
}

export default function HeartField({ maxCount = 60 }) {
  const { scrollYProgress } = useScroll()
  const [count, setCount] = useState(maxCount)

  useEffect(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200
    if (w < 640) setCount(Math.min(14, maxCount))
    else if (w < 1024) setCount(Math.min(30, maxCount))
    else setCount(maxCount)
  }, [maxCount])

  // split hearts into three depth layers
  const hearts = useMemo(() => {
    const arr = []
    const fgCount = Math.round(count * 0.35)
    const midCount = Math.round(count * 0.45)
    const bgCount = Math.max(1, count - fgCount - midCount)

    let idx = 0
    const make = (n, layer) => {
      return Array.from({ length: n }).map(() => {
        const i = idx++
        const r = seededRandom(i + 1)
        const top = Math.round(r * 10000) % 92 + 4
        const left = Math.round(seededRandom(i + 7) * 10000) % 96
        const char = seededRandom(i + 11) > 0.6 ? '💖' : '❤️'
        // more varied sizes
        const sizePxBase = 14 + Math.round(seededRandom(i + 19) * 46) // 14px - 60px

        // layer-specific properties - stronger DoF
        let speed, blurPx, opacity, baseScale
        if (layer === 'fg') {
          speed = 1.4 + seededRandom(i + 13) * 1.1
          blurPx = 0.5 + seededRandom(i + 17) * 1.2 // ~0.5 - 1.7px
          opacity = 0.85 + seededRandom(i + 23) * 0.15
          baseScale = 1.03 + seededRandom(i + 27) * 0.12
        } else if (layer === 'mid') {
          speed = 0.95 + seededRandom(i + 13) * 0.7
          blurPx = 3 + seededRandom(i + 17) * 1.6 // ~3 - 4.6px
          opacity = 0.6 + seededRandom(i + 23) * 0.25
          baseScale = 0.92 + seededRandom(i + 27) * 0.18
        } else {
          speed = 0.35 + seededRandom(i + 13) * 0.6
          blurPx = 6 + seededRandom(i + 17) * 3 // ~6 - 9px
          opacity = 0.18 + seededRandom(i + 23) * 0.22
          baseScale = 0.78 + seededRandom(i + 27) * 0.17
        }

        const amplitude = 4 + Math.round(seededRandom(i + 31) * 28)
        const sideways = Math.round(seededRandom(i + 37) * 24) - 12
        const duration = 2 + seededRandom(i + 41) * 6
        const delay = seededRandom(i + 43) * 5
        return {
          top: `${top}%`,
          left: `${left}%`,
          char,
          speed,
          sizePx: Math.round(sizePxBase * baseScale),
          blurPx: Math.round(blurPx * 10) / 10,
          opacity,
          amplitude,
          sideways,
          duration,
          delay,
          layer,
          baseScale,
          key: `h-${i}`,
        }
      })
    }

    return [
      ...make(fgCount, 'fg'),
      ...make(midCount, 'mid'),
      ...make(bgCount, 'bg'),
    ]
  }, [count])

  // create three y transforms for depth (more exaggerated ranges)
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -1400])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -700])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -300])

  const yFastS = useSpring(yFast, { stiffness: 120, damping: 30 })
  const yMidS = useSpring(yMid, { stiffness: 120, damping: 30 })
  const ySlowS = useSpring(ySlow, { stiffness: 120, damping: 30 })

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
      {hearts.map((h, i) => {
        const layerY = h.layer === 'fg' ? yFastS : h.layer === 'mid' ? yMidS : ySlowS
        const z = h.layer === 'fg' ? -40 : h.layer === 'mid' ? -50 : -60
        return (
          <motion.div
            key={h.key}
            style={{ top: h.top, left: h.left, y: layerY, zIndex: z, fontSize: `${h.sizePx}px`, opacity: h.opacity, filter: `blur(${h.blurPx}px)` }}
            className={`fixed transform-gpu will-change-transform`}
            aria-hidden
          >
            <span className="select-none" style={{ display: 'block', transform: `scale(${h.baseScale})` }}>{h.char}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
