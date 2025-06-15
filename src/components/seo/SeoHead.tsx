// src/components/seo/SeoHead.tsx
import Head from 'next/head'
import { ReactNode } from 'react'

interface SeoHeadProps {
  title?: string
  description?: string
  image?: string
  canonical?: string
  children?: ReactNode
}

export default function SeoHead({
  title = 'GuardianChain | Capsule Memory Economy',
  description = 'Preserve, verify, and tokenize human memory with AI-integrated on-chain trust infrastructure.',
  image = '/banner-og.jpg',
  canonical,
  children
}: SeoHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0A84FF" />
      <meta name="robots" content="index, follow" />

      {/* OG Meta */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="GuardianChain" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  )
}
