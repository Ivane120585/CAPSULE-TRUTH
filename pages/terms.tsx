import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-primary">Terms</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          These terms govern truthful use, preserved records, and sovereign custody of created digital artifacts.
        </p>
      </main>
      <Footer />
    </>
  )
}
