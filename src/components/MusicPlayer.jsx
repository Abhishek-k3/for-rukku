import { useState, useRef, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          console.log('Audio playback not allowed yet')
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="/garaj-garaj.mp3"
        preload="metadata"
      />

      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-8 left-8 z-40 p-4 bg-gold hover:bg-yellow-600 text-maroon rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{
            scale: isPlaying ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            repeat: isPlaying ? Infinity : 0,
            repeatType: 'loop',
          }}
        >
          <Heart
            size={28}
            fill={isPlaying ? '#4A0404' : 'none'}
            stroke="#4A0404"
            strokeWidth={2}
          />
        </motion.div>
      </motion.button>

      <style jsx>{`
        audio::-webkit-media-controls-panel {
          background-color: #fdf5e6;
        }
      `}</style>
    </>
  )
}
