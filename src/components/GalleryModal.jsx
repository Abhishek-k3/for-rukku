import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { fetchMomentMetadata, fetchGalleryImages, getGalleryImagePath } from '../config/momentsConfig'

export default function GalleryModal({ folderName, onClose, isOpen }) {
  const [metadata, setMetadata] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isOpen || !folderName) return

    const loadContent = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Load metadata
        const meta = await fetchMomentMetadata(folderName)
        setMetadata(meta)

        // Load gallery images
        const images = await fetchGalleryImages(folderName)
        setGalleryImages(images)
      } catch (err) {
        setError('Failed to load gallery content')
        console.error('Gallery load error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()
  }, [isOpen, folderName])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-cream rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl border-2 border-gold flex flex-col"
          >
            {/* Header with Close Button - Mobile Fixed */}
            <div className="sticky top-0 bg-cream border-b-2 border-gold/30 p-4 md:p-6 flex items-center justify-between z-10">
              <h2 className="font-display text-2xl md:text-3xl text-maroon font-bold flex-1">
                {metadata?.title || 'Loading...'}
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 p-2 md:p-3 hover:bg-gold/20 rounded-full transition-colors flex-shrink-0"
                aria-label="Close gallery"
              >
                <X size={28} className="text-maroon" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                // Loading State
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center p-8 md:p-12 min-h-[400px]"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 border-3 border-gold border-t-maroon rounded-full mx-auto mb-4"
                    />
                    <p className="font-body text-maroon opacity-75">Loading your moment...</p>
                  </div>
                </motion.div>
              ) : error ? (
                // Error State
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center p-8 md:p-12 min-h-[400px]"
                >
                  <div className="text-center">
                    <p className="font-body text-red-600 mb-2">⚠️</p>
                    <p className="font-body text-maroon">{error}</p>
                  </div>
                </motion.div>
              ) : (
                // Success State
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 md:p-8"
                >
                  {/* Date & Description */}
                  {metadata && (
                    <div className="mb-8">
                      {metadata.date && (
                        <p className="font-body text-gold text-sm md:text-base font-semibold mb-2">
                          📅 {metadata.date}
                        </p>
                      )}
                      <p className="font-body text-maroon text-base md:text-lg leading-relaxed">
                        {metadata.description}
                      </p>
                    </div>
                  )}

                  {/* Gallery Grid */}
                  {galleryImages.length > 0 && (
                    <>
                      <h3 className="font-display text-xl md:text-2xl text-maroon mb-6 font-semibold">
                        ✨ Gallery
                      </h3>

                      {/* Flexible Gallery Layout */}
                      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {galleryImages.map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedImage(image)}
                            className="relative group cursor-pointer overflow-hidden rounded-lg bg-gold/10 border-2 border-gold/20"
                          >
                            <motion.img
                              src={getGalleryImagePath(folderName, image)}
                              alt={`Gallery ${index + 1}`}
                              className="h-auto max-w-xs md:max-w-sm object-contain"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                              onError={(e) => {
                                e.target.src = '/placeholder-image.svg'
                              }}
                            />
                            <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white font-display text-2xl">🔍</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* No Gallery */}
                  {galleryImages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <p className="font-body text-maroon opacity-75">
                        No additional photos for this moment yet.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Fullscreen Image Viewer */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
                  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-w-4xl max-h-[90vh]"
                  >
                    <img
                      src={getGalleryImagePath(folderName, selectedImage)}
                      alt="Fullscreen"
                      className="max-w-full max-h-[90vh] object-contain rounded-lg"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.svg'
                      }}
                    />
                    <motion.button
                      onClick={() => setSelectedImage(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-4 right-4 p-3 bg-maroon/80 hover:bg-maroon rounded-full transition-colors"
                      aria-label="Close image"
                    >
                      <X size={24} className="text-white" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Helper function for imports in other files
export { getGalleryImagePath }
