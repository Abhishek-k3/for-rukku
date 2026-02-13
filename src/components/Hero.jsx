import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background blur effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 50%, transparent 100%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center px-4 md:px-8"
      >
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-maroon mb-4 tracking-tight">
          Rukku & Abhishek
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="font-body text-lg sm:text-xl md:text-2xl text-maroon mb-8 italic"
        >
          Our story, one chapter at a time
        </motion.p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl mt-12"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
