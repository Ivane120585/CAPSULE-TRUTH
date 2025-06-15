// src/components/capsules/CapsuleGallery.tsx

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CapsuleCard from '@/components/gallery/CapsuleCard'
import Lottie from 'lottie-react'
import emptyAnimation from '@/public/lottie/empty-gallery.json'

interface Capsule {
  id: string
  imageUrl: string
  title: string
  description: string
}

export default function CapsuleGallery() {
  const [capsules, setCapsules] = useState<Capsule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCapsules() {
      // TODO: Replace this mock with actual backend fetch (Pinata IPFS or Supabase)
      const mockData = [
        {
          id: 'capsule-001',
          imageUrl: '/mock/capsule1.png',
          title: 'Memory of the Meadow',
          description: 'A peaceful capsule stored on-chain.'
        },
        {
          id: 'capsule-002',
          imageUrl: '/mock/capsule2.png',
          title: 'Echoes of the Past',
          description: 'Preserved forever via GuardianChain.'
        }
      ]
      setCapsules(mockData)
      setLoading(false)
    }

    fetchCapsules()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="text-muted-foreground animate-pulse text-lg">Loading capsules...</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-12">
      <AnimatePresence>
        {capsules.length > 0 ? (
          capsules.map(capsule => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <CapsuleCard {...capsule} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center text-muted-foreground text-center">
            <Lottie animationData={emptyAnimation} className="w-64 h-64" />
            <p className="mt-4 text-sm">No capsules yet. Upload your first memory capsule.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
