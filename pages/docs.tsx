import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-primary">Docs</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Uploads are stored on the configured self-hosted IPFS node. Save the metadata link after uploading:
          gallery indexing is not available yet. Blockchain proofs and minting are not implemented.
        </p>
      </main>
      <Footer />
    </>
  )
}
