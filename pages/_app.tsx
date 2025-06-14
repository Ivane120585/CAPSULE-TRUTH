import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PosthogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: 'https://app.posthog.com',
  })
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PosthogProvider client={posthog}>
      <Component {...pageProps} />
    </PosthogProvider>
  )
}
