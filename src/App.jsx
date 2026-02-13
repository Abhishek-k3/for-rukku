import { useState } from 'react'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import WaxSeal from './components/WaxSeal'
import MusicPlayer from './components/MusicPlayer'
import HeartField from './components/HeartField'

function App() {
  return (
    <div className="text-maroon min-h-screen overflow-x-hidden relative">
      <HeartField maxCount={120} />
      {/* Music Player */}
      <MusicPlayer />

      {/* Hero Section */}
      <Hero />

      {/* Timeline Section */}
      <Timeline />

      {/* Wax Seal & Letter */}
      <WaxSeal />
    </div>
  )
}

export default App
