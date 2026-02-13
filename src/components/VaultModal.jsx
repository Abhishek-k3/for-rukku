import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function VaultModal({ onClose, onUnlock, isUnlocked }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(!isUnlocked)

  // Anniversary date - using a placeholder that can be customized
  // Format: DDMM (e.g., "1202" for December 12)
  const correctPin = '1202'

  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit)
      setError('')
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
    setError('')
  }

  const handleUnlock = () => {
    if (pin === correctPin) {
      setIsLocked(false)
      onUnlock()
      setError('')
    } else {
      setAttempts(attempts + 1)
      setError('Incorrect PIN. Try again.')
      setPin('')
      if (attempts >= 2) {
        setError('Too many attempts. Please try again later.')
      }
    }
  }

  if (!isLocked && isUnlocked) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-cream rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border-2 border-gold"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gold/20 rounded-full transition-colors z-10"
            >
              <X size={24} className="text-maroon" />
            </button>

            {/* Letter Content */}
            <div className="p-8 md:p-12 pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="font-display text-4xl text-maroon mb-8 font-bold">
                  For My Rukku
                </h2>

                <div className="space-y-6 text-left font-body text-maroon text-lg leading-relaxed">
                  <p className="italic">Dear Rukku,</p>

                  <p>
                    Every moment with you feels like a gentle dream I never want to wake from. From the day our paths crossed to this very moment, you've painted my world with the colors of love and joy.
                  </p>

                  <p>
                    The way you laugh, the kindness in your eyes, and the warmth of your presence—these are the treasures that make my heart complete. You're not just my love; you're my home.
                  </p>

                  <p>
                    Our journey through life together is my greatest blessing. From quiet moments shared over chai to the sacred grounds of Madurai where we sought blessings, every chapter with you is written in gold.
                  </p>

                  <p>
                    I promise to love you with the same intensity of this eternal flame, to stand by you through every season, and to make every day an adventure worth remembering.
                  </p>

                  <p>
                    Thank you for choosing me. Thank you for being mine.
                  </p>

                  <p className="text-right pt-4">
                    Forever yours,
                    <br />
                    <span className="font-display text-2xl">❤️ Abhishek</span>
                  </p>
                </div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-12 text-5xl"
                >
                  💌
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-cream rounded-3xl max-w-sm w-full shadow-2xl border-2 border-gold overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gold/20 rounded-full transition-colors"
          >
            <X size={24} className="text-maroon" />
          </button>

          <div className="p-8 md:p-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="font-display text-3xl text-maroon font-bold">
                Secret Vault
              </h2>
              <p className="font-body text-maroon opacity-75 mt-2">
                Enter the 4-digit code to reveal the letter
              </p>
            </motion.div>

            {/* PIN Display */}
            <motion.div className="my-8 flex justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1 }}
                  animate={pin.length > i ? { scale: [1, 1.2, 1] } : {}}
                  className="w-12 h-12 md:w-14 md:h-14 border-2 border-gold rounded-xl flex items-center justify-center text-2xl font-bold text-maroon bg-gold/10"
                >
                  {pin[i] ? '●' : ''}
                </motion.div>
              ))}
            </motion.div>

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 font-body mb-4 text-sm"
              >
                {error}
              </motion.p>
            )}

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  onClick={() => handlePinInput(String(num))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 px-2 bg-gold/20 hover:bg-gold/30 border border-gold text-maroon font-display text-lg rounded-lg transition-colors"
                  disabled={attempts >= 3}
                >
                  {num}
                </motion.button>
              ))}

              <motion.button
                onClick={() => handlePinInput('0')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="col-span-2 py-3 px-2 bg-gold/20 hover:bg-gold/30 border border-gold text-maroon font-display text-lg rounded-lg transition-colors"
                disabled={attempts >= 3}
              >
                0
              </motion.button>

              <motion.button
                onClick={handleDelete}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 px-2 bg-red-100 hover:bg-red-200 border border-red-400 text-red-600 font-display text-lg rounded-lg transition-colors"
              >
                ⌫
              </motion.button>
            </div>

            {/* Unlock Button */}
            <motion.button
              onClick={handleUnlock}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={pin.length !== 4 || attempts >= 3}
              className={`w-full py-3 px-4 font-display text-lg rounded-xl transition-all ${
                pin.length === 4 && attempts < 3
                  ? 'bg-gold hover:bg-yellow-600 text-maroon cursor-pointer'
                  : 'bg-gold/30 text-maroon/50 cursor-not-allowed'
              }`}
            >
              {attempts >= 3 ? 'Too Many Attempts' : 'Unlock'}
            </motion.button>

            <p className="font-body text-maroon text-xs opacity-60 mt-4">
              Hint: Use the date of the anniversary (DDMM format)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
