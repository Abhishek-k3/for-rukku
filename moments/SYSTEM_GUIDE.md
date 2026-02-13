# 📂 Dynamic Content System - Complete Guide

## Overview

The Timeline has been refactored to use a **Folder-Based Dynamic Content System**. Instead of hardcoded milestone data, content is now pulled from the `/public/moments/` directory structure.

---

## 📁 Folder Structure

```
public/
└── moments/
    ├── the-beginning/
    │   ├── metadata.json          # Title, date, description
    │   ├── highlight.jpg          # Main card image
    │   ├── gallery-manifest.json  # List of gallery images
    │   └── gallery/
    │       ├── photo-1.jpg
    │       ├── photo-2.jpg
    │       └── ... (more images)
    │
    ├── first-meal/
    │   ├── metadata.json
    │   ├── highlight.jpg
    │   ├── gallery-manifest.json
    │   └── gallery/
    │       └── ... (gallery images)
    │
    └── our-first-meet/
        ├── metadata.json
        ├── highlight.jpg
        ├── gallery-manifest.json
        └── gallery/
            └── ... (gallery images)
```

---

## 🔧 How It Works

### 1. **Registry File** (`src/config/momentsConfig.js`)

This file defines all moments and their configuration:

```javascript
export const momentsConfig = [
  {
    id: 'the-beginning',
    folderName: 'the-beginning',
    emoji: '✨',
    gradientColor: 'from-pink-100 to-yellow-50',
  },
  // More moments...
]
```

**Key Points:**
- `folderName`: Maps to a folder in `/public/moments/`
- `emoji`: Displayed on the card
- `gradientColor`: Tailwind gradient class for the card background

### 2. **Metadata.json** (Per Moment)

Contains the moment's essential information:

```json
{
  "title": "The Beginning",
  "date": "When our paths first crossed",
  "description": "Long description of the moment..."
}
```

### 3. **Gallery Manifest** (Per Moment)

Lists all gallery images for that moment:

```json
{
  "images": [
    "photo-1.jpg",
    "photo-2.jpg",
    "photo-3.jpg"
  ]
}
```

### 4. **Timeline Component** (`src/components/Timeline.jsx`)

- Reads from `momentsConfig`
- Fetches metadata for each moment
- Displays loading states during fetch
- Opens `GalleryModal` on card click

### 5. **Gallery Modal** (`src/components/GalleryModal.jsx`)

- Displays moment description
- Shows responsive image grid (2 columns mobile, 3 columns desktop)
- Fullscreen image viewer on click
- Mobile-optimized with sticky header and close button

---

## ➕ Adding a New Moment

Follow these steps to add a new milestone:

### Step 1: Update Registry

Edit `src/config/momentsConfig.js`:

```javascript
export const momentsConfig = [
  // ... existing moments
  {
    id: 'your-moment-id',
    folderName: 'your-folder-name',
    emoji: '💫',  // Choose an emoji
    gradientColor: 'from-blue-100 to-cyan-50',  // Tailwind gradient
  },
]
```

**Available Gradient Options:**
- `from-pink-100 to-yellow-50`
- `from-purple-100 to-pink-50`
- `from-yellow-100 to-orange-50`
- `from-blue-100 to-cyan-50`
- `from-green-100 to-emerald-50`
- Any Tailwind gradient combination

### Step 2: Create Folder Structure

```bash
mkdir -p public/moments/your-folder-name/gallery
```

### Step 3: Add metadata.json

Create `public/moments/your-folder-name/metadata.json`:

```json
{
  "title": "Your Moment Title",
  "date": "Date or timeline marker",
  "description": "Long, heartfelt description of this moment. Include emotions, details, and what made it special."
}
```

### Step 4: Add Highlight Image

Place your main image at:
```
public/moments/your-folder-name/highlight.jpg
```

**Image Requirements:**
- Format: JPG, PNG, or WebP
- Aspect ratio: 16:9 (recommended)
- Size: Optimized (< 500KB)

### Step 5: Add Gallery Images

1. Place images in `public/moments/your-folder-name/gallery/`
2. Create `gallery-manifest.json`:

```json
{
  "images": [
    "image-1.jpg",
    "image-2.jpg",
    "image-3.jpg"
  ]
}
```

### Complete Example

```
public/moments/paris-trip/
├── metadata.json
├── highlight.jpg
├── gallery-manifest.json
└── gallery/
    ├── eiffel-tower.jpg
    ├── seine-river.jpg
    ├── love-lock.jpg
    └── sunset.jpg
```

---

## 🎨 Customizing Metadata

### Metadata.json Structure

```json
{
  "title": "String - Moment title (max 50 chars recommended)",
  "date": "String - Date, timeline, or significance",
  "description": "String - Long, emotional description (supports plain text and HTML)"
}
```

### Tips for Compelling Descriptions

✨ **Use emotional language**: Describe feelings, not just events
💭 **Include sensory details**: What did you see, hear, feel?
🎯 **Make it personal**: Reference inside jokes, special words
🌟 **End with reflection**: What did this moment mean?

**Example:**
```json
{
  "title": "That Rainy Evening",
  "date": "First confession of love",
  "description": "The rain drummed against the windows as we sat on the old couch. Your hand found mine in the darkness, and suddenly the world got smaller, warmer. Every drop outside felt like applause for what we were becoming. In that moment, I wasn't scared anymore—I was home."
}
```

---

## 🖼️ Image Management

### Highlight Images

**Best Practices:**
- High quality (1600x900px minimum)
- Representative of the moment
- Consistent color grading (matches "love vibe")
- Optimized for web (90-200KB)

**Tools for optimization:**
- TinyPNG (tinypng.com)
- ImageOptim (imageoptim.com)
- Squoosh (squoosh.app)

### Gallery Images

**Grid Display Facts:**
- Mobile: 2 columns
- Tablet/Desktop: 3 columns
- Aspect ratio: Maintained (uses `object-cover`)
- Responsive sizing

**Best Practices:**
- Consistent color tone/filter
- Mix of wide and tall images for visual interest
- At least 5-6 images per gallery (looks fuller)
- Optimized for web

**Layout Tips:**
- First image should be eye-catching
- Vary aspect ratios for dynamic grid
- Group related images together
- Place details/closeups at the end

### Missing Image Handling

If an image fails to load:
- Falls back to placeholder SVG
- Error message shown in console (development)
- Graceful degradation in production

---

## ⚙️ Configuration Files Reference

### momentsConfig.js

**Functions Available:**

```javascript
// Fetch moment metadata
const metadata = await fetchMomentMetadata('the-beginning')
// Returns: { title, date, description }

// Fetch gallery image list
const images = await fetchGalleryImages('the-beginning')
// Returns: ['photo-1.jpg', 'photo-2.jpg', ...]

// Get image paths
const highlightPath = getHighlightImagePath('the-beginning')
// Returns: '/moments/the-beginning/highlight.jpg'

const galleryPath = getGalleryImagePath('the-beginning', 'photo-1.jpg')
// Returns: '/moments/the-beginning/gallery/photo-1.jpg'
```

---

## 📱 Mobile Optimization

### Gallery Modal Features for Mobile (Pixel 10+)

✅ **Bottom sheet animation** - Slides up from bottom on mobile
✅ **Large close button** - Easy to tap (accessible)
✅ **Sticky header** - Moment title stays visible while scrolling
✅ **Fat touch targets** - All buttons minimum 48x48px
✅ **Responsive grid** - 2 columns on mobile, 3 on desktop
✅ **Full-screen image** - Easy zoom and scroll
✅ **Fast loading** - Images load progressively

### Testing on Mobile

```bash
# Open in browser DevTools
F12 → Toggle Mobile Device (Ctrl+Shift+M)
# Select Pixel 10 or similar (412px wide)
# Test scrolling, image loading, modal interactions
```

### Manual Testing Checklist

- [ ] Gallery modal opens on card click
- [ ] Title visible in sticky header
- [ ] Description readable on small screen
- [ ] Images grid responsive (2 col on mobile)
- [ ] Images load without lag
- [ ] Close button easy to tap
- [ ] Fullscreen image viewer works
- [ ] Scroll smooth in gallery
- [ ] No layout shifts during load

---

## 🔄 Updating an Existing Moment

### Update Description

1. Edit `public/moments/{folder-name}/metadata.json`
2. Change the `description` field
3. Save file
4. App auto-refreshes (if in dev mode)

### Update Images

1. Replace `public/moments/{folder-name}/highlight.jpg`
2. Update gallery images in `gallery/` folder
3. Update `gallery-manifest.json` to match filenames
4. App auto-refreshes

### Update Title or Date

Edit `metadata.json`:

```json
{
  "title": "New Title",
  "date": "New Date String",
  "description": "..."
}
```

---

## 🐛 Troubleshooting

### Issue: "Loading..." stays forever

**Causes:**
- metadata.json not found
- JSON formatting error
- Network error

**Solution:**
1. Check file exists: `public/moments/{folder}/metadata.json`
2. Validate JSON: Use jsonlint.com
3. Check browser console for errors

### Issue: Images not loading

**Causes:**
- Wrong file path
- File doesn't exist
- Gallery-manifest.json missing

**Solution:**
1. Check file exists in gallery folder
2. Verify filename in gallery-manifest.json (case-sensitive!)
3. Check console for 404 errors

### Issue: Gallery modal doesn't open

**Causes:**
- Component not registered
- Card click not working

**Solution:**
1. Verify `GalleryModal` imported in Timeline.jsx
2. Check browser console for errors
3. Test in different browser

### Issue: Grid layout wrong

**Causes:**
- Tailwind not compiled
- Gradient class not recognized

**Solution:**
1. Restart dev server: `npm run dev`
2. Clear browser cache (Ctrl+Shift+Del)
3. Check Tailwind config has custom colors

---

## 🚀 Performance Optimization

### Image Lazy Loading

Add to img tags for optimal performance:

```jsx
<img
  src={path}
  loading="lazy"
  decoding="async"
/>
```

### Prefetching Metadata

For better UX, prefetch metadata on hover:

```jsx
const handleCardHover = async (folderName) => {
  await fetchMomentMetadata(folderName)
  // Data cached for instant modal open
}
```

### Gallery Image Optimization

For production, consider:
- Next Image component (auto optimization)
- WebP format with fallback
- Srcset for responsive images
- CDN or image service (Cloudinary, Imgix)

---

## 📋 Customization Checklist

- [ ] Added all moments to `momentsConfig.js`
- [ ] Created folder structure for each moment
- [ ] Written compelling metadata.json content
- [ ] Added highlight.jpg images (optimized)
- [ ] Created gallery folders with images
- [ ] Updated gallery-manifest.json files
- [ ] Tested on mobile device (Pixel 10)
- [ ] Verified all images load
- [ ] Tested modal open/close
- [ ] Tested fullscreen image viewer

---

## 📞 Quick Reference

**Add a moment:** 
1. Add to momentsConfig.js
2. Create /public/moments/{folder}/ 
3. Add metadata.json + images

**Update content:**
- Edit metadata.json
- Replace/add images
- Server auto-reloads

**Test changes:**
- `npm run dev` (development)
- F12 DevTools for debugging
- Toggle mobile view for responsiveness

**Deploy:**
- Run `npm run build`
- All content in /public/ included automatically
- No code changes needed for new moments/images

---

## 🎁 Next Steps

1. **Replace Placeholder Descriptions**: Edit metadata.json files with real content
2. **Add Highlight Images**: Place real photos in each moment folder
3. **Populate Galleries**: Add 5-10 images per moment
4. **Test Thoroughly**: Use both mobile and desktop browsers
5. **Deploy**: `npm run build && npm run preview`

**Remember:** This system is designed to grow with your story. Adding new moments is as simple as creating a new folder and filling in the content!

---

**Made with ❤️ for your journey together.**
