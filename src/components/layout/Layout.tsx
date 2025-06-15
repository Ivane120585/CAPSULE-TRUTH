// src/components/layout/Layout.tsx
import Head from 'next/head'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  canonical?: string
}

export default function Layout({
  children,
  title = 'GuardianChain • Capsule Memory Economy',
  description = 'Verify, preserve, and monetize memory capsules using on-chain AI-integrated truth infrastructure.',
  canonical
}: LayoutProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0A84FF" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
