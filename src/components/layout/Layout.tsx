// src/components/layout/Layout.tsx
import Head from 'next/head'
import { ReactNode } from 'react'

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
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A84FF" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20">
        {children}
      </main>
    </>
  )
}
