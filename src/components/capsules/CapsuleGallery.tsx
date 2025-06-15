// src/components/capsules/CapsuleGallery.tsx
import Image from 'next/image'
import { motion } from 'framer-motion'

const capsules = [
  {
    title: 'Time Capsule #001',
    src: 'https://gateway.pinata.cloud/ipfs/QmHash1',
    description: 'On-chain memory sealed in 2025',
  },
  {
    title: 'Echo Lens',
    src: 'https://gateway.pinata.cloud/ipfs/QmHash2',
    description: 'AI-captured memory fragment',
  },
  {
    title: 'Genesis Capsule',
    src: 'https://gateway.pinata.cloud/ipfs/QmHash3',
    description: 'First minted capsule from GuardianChain',
  },
]

export default function CapsuleGallery() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
          Capsule Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {capsules.map((capsule, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-10 relative">
                <Image
                  src={capsule.src}
                  alt={capsule.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground">{capsule.title}</h3>
                <p className="text-sm text-muted mt-1">{capsule.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
