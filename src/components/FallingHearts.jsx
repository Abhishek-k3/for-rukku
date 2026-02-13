import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function FallingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    let heartCount = 0
    const interval = setInterval(() => {
      if (heartCount < 80) {
        const angle = Math.random() * 360
        const distance = Math.random() * 300 + 100
        const xOffset = Math.cos((angle * Math.PI) / 180) * distance
        const yOffset = Math.sin((angle * Math.PI) / 180) * distance

        const newHeart = {
          id: Date.now() + heartCount,
          size: Math.random() * 20 + 20, // 20-40px
          angle: angle,
          duration: Math.random() * 2 + 3, // 3-5s animation
          delay: heartCount * 0.05, // Faster stagger
          xOffset: xOffset, // Random horizontal spread in all directions
          yOffset: yOffset, // Random vertical spread in all directions
        }
        setHearts((prev) => [...prev, newHeart])
        heartCount++
      } else {
        clearInterval(interval)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            opacity: 1,
            y: 0,
            x: 0,
            scale: heart.size / 30,
            filter: 'blur(0px)',
          }}
          animate={{
            opacity: 0,
            y: heart.yOffset,
            x: heart.xOffset,
            scale: 0.05,
            filter: `blur(${heart.duration * 5}px)`, // Blur increases linearly
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay + 1, // 1 second delay before starting
            ease: 'easeOut',
          }}
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-12px',
            marginTop: '-12px',
          }}
          className="absolute text-2xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
