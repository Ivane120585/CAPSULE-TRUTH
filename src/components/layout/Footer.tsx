// src/components/layout/Footer.tsx
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full border-t border-gray-200 bg-white dark:bg-black dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-6 sm:px-6 lg:px-8 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          &copy; {year} <strong>GuardianChain</strong>. All rights reserved.
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <a
            href="https://github.com/Guardian-Global"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
