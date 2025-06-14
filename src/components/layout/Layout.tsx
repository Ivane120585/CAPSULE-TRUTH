// src/components/layout/Layout.tsx
import Head from 'next/head'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({
  children,
  title = 'Capsule Memory Economy | GuardianChain',
  description = 'Preserve and verify memory capsules on-chain with AI-integrated infrastructure.'
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0A84FF" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </main>
    </>
  )
}
