import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Typewriter({ text, onComplete }) {
  const [displayedText, setDisplayedText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const containerRef = useRef(null)
  const indexRef = useRef(0)

  useEffect(() => {
    if (indexRef.current >= text.length) {
      onComplete?.()
      return
    }

    const currentChar = text[indexRef.current]
    const isEndOfSentence = ['.', '!', '?'].includes(currentChar)
    const isCommaOrColon = [',', ';'].includes(currentChar)
    const delay = isEndOfSentence ? 400 : isCommaOrColon ? 200 : Math.random() * 50 + 40

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + currentChar)
      indexRef.current += 1
    }, delay)

    return () => clearTimeout(timer)
  }, [displayedText, text, onComplete])

  // Blink cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(blinkInterval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedText])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-y-auto font-typewriter text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words"
      style={{ color: '#333', wordWrap: 'break-word', fontFamily: '"Courier Prime", monospace' }}
    >
      <span>{displayedText}</span>
      {indexRef.current < text.length && (
        <motion.span
          animate={{ opacity: cursorVisible ? 1 : 0 }}
          className="inline-block w-1 h-5 bg-maroon ml-0.5"
        />
      )}
    </div>
  )
}
