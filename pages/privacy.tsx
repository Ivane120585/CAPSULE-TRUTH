import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-primary">Privacy</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Privacy is preserved by design: identity, custody, and proof remain explicit and verifiable without unauthorized external control.
        </p>
      </main>
      <Footer />
    </>
  )
}
