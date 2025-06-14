// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.POSTHOG_API_KEY as string, {
    api_host: process.env.POSTHOG_HOST,
    capture_pageview: true
  })
}

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <PostHogProvider client={posthog}>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
      </SessionContextProvider>
    </PostHogProvider>
  )
}
