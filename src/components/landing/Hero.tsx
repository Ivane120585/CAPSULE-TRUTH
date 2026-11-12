// src/components/landing/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-background to-gray-50 dark:to-gray-900"
    >
      <div className="max-w-4xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-foreground drop-shadow-sm tracking-tight">
          Own Your Memory.
          <span className="text-primary"> Verify Your Truth.</span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Create a memory capsule and store its image and metadata on a self-hosted IPFS node.
          Content on the public IPFS network can be copied by others.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/capsules/new"
            className="px-6 py-3 text-white bg-primary hover:bg-primary/90 rounded-xl text-lg font-medium shadow-md transition"
          >
            Create a Capsule
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 border border-border bg-background hover:bg-accent rounded-xl text-lg font-medium shadow-sm transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-14"
      >
        <Image
          src="/illustrations/memory-hero.svg"
          alt="Capsule illustration"
          width={800}
          height={520}
          className="w-full max-w-md mx-auto opacity-90"
        />
      </motion.div>
    </motion.section>
  )
}
