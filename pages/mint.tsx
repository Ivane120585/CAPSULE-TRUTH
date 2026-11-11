import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function MintPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-primary">Mint</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Create a verified capsule, confirm the chain of custody, and mint the immutable record.
        </p>
      </main>
      <Footer />
    </>
  )
}
