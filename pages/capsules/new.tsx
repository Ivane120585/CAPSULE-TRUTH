import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CapsuleUpload from '@/components/capsules/CapsuleUpload'

export default function NewCapsulePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <CapsuleUpload />
      </main>
      <Footer />
    </>
  )
}
