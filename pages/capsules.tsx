import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CapsuleGallery from '@/components/capsules/CapsuleGallery'
import Link from 'next/link'

export default function CapsulesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-primary">Capsules</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Create capsules with the self-hosted IPFS node.
        </p>
        <Link href="/capsules/new" className="mt-4 inline-block text-primary underline">Create a capsule</Link>
        <CapsuleGallery />
      </main>
      <Footer />
    </>
  )
}
