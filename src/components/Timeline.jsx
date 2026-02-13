import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import GalleryModal from './GalleryModal'
import { momentsConfig, fetchMomentMetadata, getHighlightImagePath } from '../config/momentsConfig'

const PolaroidCard = ({ moment, index, momentConfig, isLoading, onCardClick, expandedId, setExpandedId }) => {
  const isEven = index % 2 === 0
  const cardRef = useRef(null)
  const isCentered = useInView(cardRef, { amount: 0.5, margin: '-40% 0px -40% 0px' })
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isExpanded = expandedId === momentConfig.id

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`transform-gpu will-change-transform flex md:flex-row flex-col items-center gap-6 md:gap-8 mb-12 md:mb-16 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Image + Content Side */}
      {/* Desktop / large screens: unchanged full card */}
      <motion.div
        onClick={() => onCardClick(momentConfig.folderName)}
        className="flex-1 cursor-pointer hidden md:block"
      >
        <motion.div
          className={`rounded-2xl overflow-hidden transition-shadow transform-gpu will-change-transform ${
            isCentered ? 'shadow-[0_0_30px_rgba(255,255,255,0.5)]' : 'shadow-lg'
          } bg-white/40 backdrop-blur-md border border-white/20`}
        >
          {/* Image Container */}
          <div className="relative w-full bg-gold/10 overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gold/5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-2 border-gold border-t-maroon rounded-full"
                />
              </div>
            ) : (
              <motion.img
                src={getHighlightImagePath(momentConfig.folderName)}
                alt={moment?.title || 'Moment'}
                className="w-full h-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  e.target.src = '/placeholder-image.svg'
                }}
              />
            )}
            {/* Click Indicator */}
            <div className="absolute inset-0 bg-maroon/0 hover:bg-maroon/10 transition-colors flex items-center justify-center group">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity font-display text-white text-lg">
                👉 Click to View
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="text-5xl mb-4">{momentConfig.emoji}</div>
            <h3 className="font-display text-2xl md:text-3xl text-maroon mb-2 font-semibold">
              {isLoading ? 'Loading...' : moment?.title || 'Untitled'}
            </h3>
            {moment?.date && (
              <p className="font-body text-gold text-sm mb-3">📅 {isLoading ? 'Loading date...' : moment.date}</p>
            )}
            <p className="font-body text-maroon text-base md:text-lg opacity-90">
              {isLoading ? 'Fetching moment data...' : moment?.description || 'No description available'}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile: condensed view (title + date), expand on click to reveal full content */}
      <div className="md:hidden flex-1 w-full">
        <motion.div
          tabIndex={0}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={() => setExpandedId(isExpanded ? null : momentConfig.id)}
          whileTap={{ scale: 0.97 }}
          animate={{ scale: isFocused || isExpanded ? 1.03 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`w-full rounded-xl p-4 bg-white/30 backdrop-blur-md border border-white/10 cursor-pointer`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display text-lg font-semibold text-maroon">{isLoading ? 'Loading...' : moment?.title || 'Untitled'}</h4>
              {moment?.date && <p className="text-sm text-gold">{isLoading ? '...' : moment.date}</p>}
            </div>
            <div className="text-2xl">{momentConfig.emoji}</div>
          </div>

          {isExpanded && (
            <div className="mt-3">
              <div className="w-full rounded-md overflow-hidden mb-3">
                <img src={getHighlightImagePath(momentConfig.folderName)} alt={moment?.title || 'Moment'} className="w-full h-auto object-contain" onError={(e)=>e.target.src='/placeholder-image.svg'} />
              </div>
              <p className="text-sm text-maroon mb-3">{isLoading ? 'Loading...' : moment?.description || 'No description available'}</p>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); onCardClick(momentConfig.folderName); }} className="bg-maroon text-white px-3 py-2 rounded-md text-sm">View Gallery</button>
                <button onClick={(e) => { e.stopPropagation(); setExpandedId(null); }} className="bg-white/20 text-maroon px-3 py-2 rounded-md text-sm">Close</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <div className="flex flex-col items-center gap-4 z-20">
        <motion.div
          whileHover={{ scale: 1.3 }}
          className="w-6 h-6 md:w-8 md:h-8 bg-gold rounded-full border-4 border-maroon shadow-lg flex items-center justify-center"
        >
          <div className="w-2 h-2 md:w-3 md:h-3 bg-maroon rounded-full" />
        </motion.div>
        {index < momentsConfig.length - 1 && (
          <div className="w-1 h-12 md:h-20 bg-gradient-to-b from-transparent to-transparent" />
        )}
      </div>

      {/* Placeholder for symmetry (hidden on mobile) */}
      <div className="hidden md:flex flex-1" />
    </motion.div>
  )
}

export default function Timeline() {
  const [moments, setMoments] = useState({})
  const [loadingStates, setLoadingStates] = useState({})
  const [selectedMoment, setSelectedMoment] = useState(null)
  const [showGallery, setShowGallery] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const timelineRef = useRef(null)

  // page scroll for parallax hearts
  const { scrollYProgress } = useScroll()
  const layer1 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const layer2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const layer1Y = useSpring(layer1, { damping: 30, stiffness: 120 })
  const layer2Y = useSpring(layer2, { damping: 30, stiffness: 120 })

  // progress for timeline (fills as user scrolls through timelineRef)
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ['start end', 'end start'] })
  const fill = useTransform(timelineProgress, [0, 1], [0, 1])
  const fillY = useSpring(fill, { stiffness: 120, damping: 30 })

  // Load all moment metadata on component mount
  useEffect(() => {
    const loadAllMoments = async () => {
      const loadedMoments = {}
      const loading = {}

      for (const config of momentsConfig) {
        loading[config.id] = true
      }
      setLoadingStates(loading)

      for (const config of momentsConfig) {
        try {
          const metadata = await fetchMomentMetadata(config.folderName)
          loadedMoments[config.id] = metadata
        } catch (error) {
          console.error(`Failed to load moment ${config.id}:`, error)
          loadedMoments[config.id] = {
            title: 'Error Loading',
            date: '',
            description: 'Failed to load moment data',
          }
        } finally {
          setLoadingStates((prev) => ({ ...prev, [config.id]: false }))
        }
      }

      setMoments(loadedMoments)
    }

    loadAllMoments()
  }, [])

  const handleCardClick = (folderName) => {
    setSelectedMoment(folderName)
    setShowGallery(true)
  }

  const handleCloseGallery = () => {
    setShowGallery(false)
    setSelectedMoment(null)
  }

  return (
    <>
      <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto w-full">
        {/* hearts are rendered globally via `HeartField` in App.jsx */}

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-maroon text-center mb-16 md:mb-24 font-bold"
        >
          Our Journey
        </motion.h2>

        <div className="relative" ref={timelineRef}>
          {/* Central timeline track with glowing neon effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full timeline-line" style={{ width: '6px' }}>
            <div className="w-full h-full bg-white rounded-full" style={{
              boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.9), 0 0 40px 10px rgba(255, 192, 203, 0.6)'
            }} />
          </div>

          {/* Timeline items */}
          {momentsConfig.map((config, index) => (
            <PolaroidCard
              key={config.id}
              moment={moments[config.id]}
              index={index}
              momentConfig={config}
              isLoading={loadingStates[config.id] || !moments[config.id]}
              onCardClick={handleCardClick}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
            />
          ))}
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        folderName={selectedMoment}
        isOpen={showGallery}
        onClose={handleCloseGallery}
      />
    </>
  )
}
