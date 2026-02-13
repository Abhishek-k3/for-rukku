# 🎯 Quick Reference - For Rukku Commands

## ▶️ Getting Started

```bash
# Development Server (Currently Running)
npm run dev
# Open: http://localhost:5173

# Build for Production
npm run build

# Preview Production Build
npm run preview
```

---

## 🎨 Quick Customization

### PIN Code (Vault)
📄 File: `src/components/VaultModal.jsx` | Line ~37
```javascript
const correctPin = '1202' // Change to DDMM
```

### Love Letter Text
📄 File: `src/components/VaultModal.jsx` | Lines ~60-85
- Edit letter content
- Update sender name

### Timeline Milestones
📄 File: `src/components/Timeline.jsx` | Lines ~4-16
- Add/edit milestones
- Change emojis

### Hero Names
📄 File: `src/components/Hero.jsx` | Lines ~25-30
- Update "Rukku & Abhishek"
- Change subtitle

### Background Music
📄 File: `public/garaj-garaj.mp3`
```bash
cp /your-song.mp3 public/garaj-garaj.mp3
```

### Colors & Theme
📄 File: `tailwind.config.js` | Lines ~9-12
```javascript
colors: {
  cream: '#FDF5E6',   // Background
  maroon: '#4A0404',  // Text
  gold: '#D4AF37',    // Accents
}
```

---

## 📱 Features at a Glance

| Feature | File | Interactive |
|---------|------|-------------|
| Hero Section | `Hero.jsx` | ✨ Animated |
| Timeline | `Timeline.jsx` | 📍 Scroll-animated |
| Diya Lamp | `Diya.jsx` | 🔥 Tap to glow |
| Music Player | `MusicPlayer.jsx` | ❤️ Toggle play |
| Vault | `VaultModal.jsx` | 🔐 PIN entry |

---

## 🔐 Vault PIN Examples

| Date | PIN |
|------|-----|
| Jan 15 | 1501 |
| Feb 14 | 1402 |
| May 8 | 0805 |
| Aug 25 | 2508 |
| Dec 12 | 1212 |

Format: DDMM (Day-Month)

---

## 📦 Key Dependencies

```json
"react": "^18.2.0",
"framer-motion": "^10.16.4",
"tailwindcss": "^3.3.0",
"lucide-react": "^0.263.1"
```

---

## 🚀 Deployment

### Netlify
1. `npm run build`
2. Drag `dist/` folder to Netlify
3. Done! ✅

### Vercel
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploys ✅

### GitHub Pages
1. Update `vite.config.js` base
2. `npm run build`
3. Push `dist/` folder

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Styling broken | Clear cache, restart dev server |
| Audio not playing | Add music file to `public/garaj-garaj.mp3` |
| Mobile broken | Check responsive classes (md:, lg:) |
| Vault PIN wrong | Default is `1202` (DDMM format) |

---

## 📚 Documentation

- **README.md** - Overview & features
- **SETUP_GUIDE.md** - Detailed configuration
- **PROJECT_SUMMARY.md** - Complete project info
- **.env.example** - Environment variables

---

## 💡 Tips

✨ Customize everything - make it yours!
📱 Test on mobile in DevTools (F12 → Mobile)
🎵 Add emotional music for impact
💌 Write heartfelt letter text
🎨 Experiment with colors
📸 Add photos to Polaroid cards (future)

---

## 🎯 Development Workflow

```bash
# 1. Edit component files in src/
# 2. Save file (auto reload)
# 3. Test in browser (http://localhost:5173)
# 4. Repeat steps 1-3

# When ready:
npm run build    # Creates optimized dist/
npm run preview  # Test production build
# Deploy dist/ folder to hosting
```

---

## 🔗 Quick Links

- 🌐 Local Dev: http://localhost:5173
- 📦 Production Build: `npm run build` → `dist/`
- 📖 Full Docs: See SETUP_GUIDE.md
- 🎯 Customization: See PROJECT_SUMMARY.md

---

## 🎉 You're All Set!

Your premium React Vite app is ready to:
- ✅ Run locally
- ✅ Be customized
- ✅ Be deployed
- ✅ Be shared

**Make it special. Make it yours. Make it memorable.** ❤️

---

**For questions:** Check SETUP_GUIDE.md (55+ detailed sections)
