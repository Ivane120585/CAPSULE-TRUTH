import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function VerifyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-primary">Verify</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Chain-of-custody and origin verification are not implemented yet.
          IPFS content identifiers identify content, but do not establish its truth or authorship.
        </p>
      </main>
      <Footer />
    </>
  )
}
