import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Typewriter from './Typewriter'
import FallingHearts from './FallingHearts'
import sealImage from './images/seal.png'
import letterBgImage from './images/letter-bg.png'

const letterText = `Dear Rukku,

Every moment with you feels like a beautiful chapter in our story. From the first time we met to now, every laugh, every tear, every quiet moment—they all matter.

You've turned my world into something magical. The way you smile, the way you care, the way you make even ordinary days feel extraordinary.

This collection of memories is just a glimpse of the love and happiness you've brought into my life. Each photo, each moment captured here, represents a promise—a promise to cherish every second with you.

Thank you for being my person. Thank you for choosing us. Thank you for making life so beautifully worth living.

Forever yours,
Abhishek ❤️`

export default function WaxSeal() {
  const [isOpen, setIsOpen] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)
  const [fullLetterRead, setFullLetterRead] = useState(false)
  const [isLetterRead, setIsLetterRead] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)

  const handleSealClick = () => {
    setIsOpen(true)
  }

  const handleCloseAndFadeOut = () => {
    setIsOpen(false)
    setIsLetterRead(true)
    // Show final message after hearts animation completes (~8.5 seconds)
    setTimeout(() => {
      setShowFinalMessage(true)
    }, 8500)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 md:py-32 px-4">
      {/* Top Message Container - Only before letter is read */}
      {!isLetterRead && (
        <div className="absolute top-10 md:top-20 text-center max-w-2xl px-4 pointer-events-none">
          {!isOpen && (
            <motion.p
              key="locked"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-base text-maroon opacity-80 pointer-events-auto"
            >
              Developer (Your Husband) doesn't allow you to open the gift until the letter is opened 💌
            </motion.p>
          )}
        </div>
      )}

      {/* Centered Message Container - During letter and after letter is read */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <div className="text-center max-w-2xl">
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center pointer-events-auto"
            >
              <p className="text-sm md:text-base text-maroon mb-4">Build Successful. Deployment to 'Marriage' scheduled for 2026.</p>
              <p className="valentine-glow font-display text-3xl md:text-5xl text-gold font-bold">
                Happy Valentine's Day!
              </p>
            </motion.div>
          ) : showFinalMessage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="pointer-events-auto"
            >
              <p className="heartbeat-glow font-display text-3xl md:text-5xl font-bold" style={{ color: '#000' }}>
                Happy Valentine's Day! Here's to many more chapters in our love story. I love you, Rukku ❤️
              </p>
            </motion.div>
          ) : isLetterRead ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="pointer-events-auto"
            >
              <p className="text-6xl md:text-7xl">💌</p>
            </motion.div>
          ) : null}
        </div>
      </div>

      {/* Wax Seal Button */}
      <AnimatePresence>
        {!isLetterRead && (
          <motion.button
            onClick={handleSealClick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ 
              enter: { duration: 0.6 },
              exit: { delay: 1.5, duration: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-32 h-32 md:w-40 md:h-40 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow rounded-full overflow-hidden"
            disabled={isOpen}
          >
            {/* Seal Image */}
            <img
              src={sealImage}
              alt="Wax Seal"
              className="w-full h-full object-cover"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Letter Unroll Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/20"
            onClick={handleCloseAndFadeOut}
          >
            {/* Letter Container - Full Width with minimal margins */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-1 md:inset-2 flex flex-col rounded-xl shadow-2xl overflow-hidden"
              style={{
                backgroundImage: `url(${letterBgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            >
              {/* Content Container - fits within letter */}
              <div className="relative z-10 h-full w-full flex flex-col p-6 md:p-12 lg:p-16 overflow-hidden">
                {/* Close Button */}
                <motion.button
                  onClick={handleCloseAndFadeOut}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-2xl text-maroon hover:text-red-700 transition-colors flex-shrink-0 bg-white/30 p-2 rounded-full"
                >
                  ✕
                </motion.button>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto pr-4 flex flex-col">
                  {/* Starting margin for letter - positioned lower */}
                  <div className="h-20 md:h-32" />

                  {/* Typewriter or Full Text */}
                  {fullLetterRead ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="font-typewriter text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words"
                      style={{ color: '#333', fontFamily: '"Courier Prime", monospace' }}
                    >
                      {letterText}
                    </motion.div>
                  ) : (
                    <Typewriter
                      text={letterText}
                      onComplete={() => setTypewriterComplete(true)}
                    />
                  )}
                </div>

                {/* Bottom Section - Button and Footer */}
                <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-maroon/20">
                  {/* Read Full Letter Button */}
                  {!fullLetterRead && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => setFullLetterRead(true)}
                      className="px-6 py-2 bg-maroon text-white rounded-lg hover:bg-red-900 transition-colors text-sm md:text-base font-display"
                    >
                      Read Full Letter
                    </motion.button>
                  )}

                  {/* Footer Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: typewriterComplete || fullLetterRead ? 1 : 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-maroon opacity-75"
                  >
                    💌 Sealed with love
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Hearts Animation */}
      <AnimatePresence>
        {isLetterRead && <FallingHearts />}
      </AnimatePresence>
    </div>
  )
}
