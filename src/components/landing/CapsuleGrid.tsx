// src/components/landing/CapsuleGrid.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import Lottie from 'lottie-react'
import placeholder from '@/lib/lottie/emptyCapsules.json'
import Image from 'next/image'

type Capsule = {
  id: string
  title: string
  creator: string
  createdAt: string
  image: string
  stylizedImage?: string
  minted: boolean
}

interface CapsuleGridProps {
  capsules: Capsule[]
}

export const CapsuleGrid: FC<CapsuleGridProps> = ({ capsules }) => {
  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      {capsules.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <Lottie animationData={placeholder} className="w-72 h-72" />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          <AnimatePresence>
            {capsules.map((capsule) => (
              <motion.div
                key={capsule.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-colors duration-300 border dark:border-gray-700"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Image
                  src={capsule.stylizedImage || capsule.image}
                  alt={capsule.title}
                  width={640}
                  height={360}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{capsule.title}</h3>
                  <p className="text-sm text-muted">by {capsule.creator}</p>
                  <p className="text-xs text-muted">{new Date(capsule.createdAt).toLocaleString()}</p>
                  <span className={`text-xs font-medium ${capsule.minted ? 'text-green-500' : 'text-yellow-400'}`}>
                    {capsule.minted ? 'Minted Capsule' : 'Pending Mint'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
