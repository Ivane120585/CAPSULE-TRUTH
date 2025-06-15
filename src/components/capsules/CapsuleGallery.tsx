// src/components/capsules/CapsuleGallery.tsx
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface Capsule {
  id: string
  title: string
  description: string
  imageUrl: string
}

const defaultCapsules: Capsule[] = [
  {
    id: '001',
    title: 'Genesis Capsule',
    description: 'The first AI-on-chain verified memory.',
    imageUrl: 'https://gateway.pinata.cloud/ipfs/QmHash1',
  },
  {
    id: '002',
    title: 'Echo Fragment',
    description: 'Recorded through augmented lens AI stream.',
    imageUrl: 'https://gateway.pinata.cloud/ipfs/QmHash2',
  },
  {
    id: '003',
    title: 'Timelock Chronicle',
    description: 'Sealed with a Proof-of-Memory contract.',
    imageUrl: 'https://gateway.pinata.cloud/ipfs/QmHash3',
  },
]

export default function CapsuleGallery({
  capsules = defaultCapsules,
}: {
  capsules?: Capsule[]
}) {
  const [loaded, setLoaded] = useState<{ [key: string]: boolean }>({})

  return (
    <section
      className="py-20 px-4 bg-background text-foreground transition-colors duration-300"
      aria-label="Capsule Gallery"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold mb-12">
          Explore Memory Capsules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {capsules.map((capsule, i) => (
            <motion.div
              key={capsule.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-xl backdrop-blur-lg"
              role="article"
              aria-label={capsule.title}
            >
              <div className="aspect-w-16 aspect-h-10 relative">
                <Image
                  src={capsule.imageUrl}
                  alt={capsule.title}
                  fill
                  className={`object-cover transition-opacity duration-700 ${
                    loaded[capsule.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoadingComplete={() =>
                    setLoaded((prev) => ({ ...prev, [capsule.id]: true }))
                  }
                />
                {!loaded[capsule.id] && (
                  <div className="absolute inset-0 animate-pulse bg-muted/30 rounded-t-xl" />
                )}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold">{capsule.title}</h3>
                <p className="text-sm text-muted mt-2">{capsule.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
