/**
 * Moments Configuration Registry
 * 
 * Define all moments/milestones that will be dynamically loaded from /public/moments/
 * Each entry maps to a subfolder containing:
 *   - metadata.json (title, date, description)
 *   - highlight.jpg (main card image)
 *   - gallery/ (additional images)
 */

export const momentsConfig = [
    {
    id: 'end-of-scared-era',
    folderName: 'end-of-scared-era',
    emoji: '→',
    gradientColor: 'from-yellow-100 to-orange-50',
  },{
    id: 'slowly-setting-environment',
    folderName: 'slowly-setting-environment',
    emoji: '→',
    gradientColor: 'from-yellow-100 to-orange-50',
  },{
    id: 'hangout',
    folderName: 'hangout',
    emoji: '→',
    gradientColor: 'from-yellow-100 to-orange-50',
  },{
    id: 'video-call',
    folderName: 'video-call',
    emoji: '→',
    gradientColor: 'from-yellow-100 to-orange-50',
  },
    {
    id: 'our-first-meet',
    folderName: 'our-first-meet',
    emoji: '→',
    gradientColor: 'from-yellow-100 to-orange-50',
  },
  {
    id: 'before-us',
    folderName: 'before-us',
    emoji: '→',
    gradientColor: 'from-purple-100 to-pink-50',
  },
  {
    id: 'the-beginning',
    folderName: 'the-beginning',
    emoji: '→',
    gradientColor: 'from-pink-100 to-yellow-50',
  }
  
]

/**
 * Dynamically fetch moment metadata
 * @param {string} folderName - The folder name in /public/moments/
 * @returns {Promise<Object>} - { title, date, description }
 */
export const fetchMomentMetadata = async (folderName) => {
  try {
    const response = await fetch(`/moments/${folderName}/metadata.json`)
    if (!response.ok) throw new Error(`Failed to load metadata for ${folderName}`)
    return await response.json()
  } catch (error) {
    console.error(`Error loading metadata for ${folderName}:`, error)
    return { title: 'Untitled', date: '', description: 'Loading...' }
  }
}

/**
 * Fetch all gallery images from a moment's gallery folder
 * This uses a manifest-based approach or dynamic import
 * 
 * Note: For production, consider:
 * 1. Server-side directory listing API
 * 2. Pre-generated gallery manifest files
 * 3. Static import of known gallery images
 * 
 * @param {string} folderName - The folder name in /public/moments/
 * @returns {Promise<Array>} - Array of image file paths
 */
export const fetchGalleryImages = async (folderName) => {
  try {
    // Approach: Fetch a gallery manifest file
    const response = await fetch(`/moments/${folderName}/gallery-manifest.json`)
    if (!response.ok) throw new Error(`No gallery manifest for ${folderName}`)
    const manifest = await response.json()
    return manifest.images || []
  } catch (error) {
    console.warn(`Gallery manifest not found for ${folderName}, returning empty array`)
    return []
  }
}

/**
 * Get the highlight image path for a moment
 * @param {string} folderName - The folder name in /public/moments/
 * @returns {string} - Path to the highlight image
 */
export const getHighlightImagePath = (folderName) => {
  return `/moments/${folderName}/highlight.jpg`
}

/**
 * Get gallery image path
 * @param {string} folderName - The folder name
 * @param {string} imageName - The image filename
 * @returns {string} - Path to the gallery image
 */
export const getGalleryImagePath = (folderName, imageName) => {
  return `/moments/${folderName}/gallery/${imageName}`
}
