// src/components/layout/ThemeToggleButton.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const darkMode = localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', darkMode)
    setIsDark(darkMode)
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', !isDark)
    setIsDark(!isDark)
  }

  if (!mounted) return null

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      title="Toggle Theme"
      aria-label="Toggle dark mode"
      className="rounded-xl p-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
      onClick={toggleTheme}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-blue-600" />
      )}
    </motion.button>
  )
}
