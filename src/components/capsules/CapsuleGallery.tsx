import Lottie from 'lottie-react'
import emptyAnimation from '@/lib/lottie/emptyCapsules.json'

export default function CapsuleGallery() {
  return (
    <div className="flex flex-col items-center px-4 py-12 text-center text-muted-foreground">
      <Lottie animationData={emptyAnimation} className="w-64 h-64" />
      <p className="mt-4 text-sm">
        Gallery indexing is not available yet. After uploading, save the metadata link to access your capsule.
      </p>
    </div>
  )
}
