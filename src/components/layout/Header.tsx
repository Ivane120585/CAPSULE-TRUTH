'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/capsules', label: 'Capsules' },
    { href: '/dao', label: 'DAO' },
    { href: '/verify', label: 'Verify' },
    { href: '/docs', label: 'Docs' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold text-primary">
          <Image src="/logo.svg" alt="GuardianChain logo" width={32} height={32} priority />
          <span className="sr-only">GuardianChain</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-foreground">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-primary transition">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground hover:text-primary"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="block py-2 text-sm text-foreground hover:text-primary">
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
