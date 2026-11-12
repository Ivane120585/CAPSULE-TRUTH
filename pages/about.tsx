import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-primary">About</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          CAPSULE-TRUTH lets you upload an image and metadata to a self-hosted IPFS node.
          The current application does not verify claims, identity, or authorship.
        </p>
      </main>
      <Footer />
    </>
  )
}
