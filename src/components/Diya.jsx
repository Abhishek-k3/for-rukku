import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Diya() {
  const [isLit, setIsLit] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleDiyaTap = () => {
    setIsLit(!isLit)
    if (!isLit) {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
    }
  }

  return (
    <section className="py-20 md:py-32 px-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-cream to-yellow-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl text-maroon mb-4 font-bold">
          Light Our Path
        </h2>
        <p className="font-body text-lg text-maroon mb-12 opacity-75">
          Tap the diya to light our way
        </p>
      </motion.div>

      <motion.button
        onClick={handleDiyaTap}
        className={`relative text-9xl sm:text-[150px] md:text-[200px] cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isLit ? 'filter drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]' : ''
        }`}
        style={{
          textShadow: isLit
            ? '0 0 40px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.5)'
            : 'none',
        }}
        animate={{
          scale: isLit ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: isLit ? 2 : 0.3,
          repeat: isLit ? Infinity : 0,
          repeatType: 'loop',
        }}
      >
        🪔
      </motion.button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-12 px-6 py-4 bg-gold/20 border-2 border-gold rounded-2xl backdrop-blur-sm"
          >
            <p className="font-display text-xl md:text-2xl text-maroon font-semibold">
              ✨ May our path always be lit ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-20 max-w-md px-4 text-center">
        <p className="font-body text-maroon text-sm md:text-base opacity-70">
          In the soft glow of this sacred flame, we find warmth in our bond and light in our future together.
        </p>
      </div>
    </section>
  )
}
