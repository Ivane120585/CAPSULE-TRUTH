import CapsuleCard from './CapsuleCard'
import { motion } from 'framer-motion'

interface Capsule {
  id: string
  image: string
  title: string
  description: string
  owner?: string
}

interface CapsuleGridProps {
  capsules: Capsule[]
  onCapsuleClick?: (capsule: Capsule) => void
}

export default function CapsuleGrid({ capsules, onCapsuleClick }: CapsuleGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-8 px-4 sm:px-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {capsules.map((capsule) => (
        <motion.div
          key={capsule.id}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <CapsuleCard
            image={capsule.image}
            title={capsule.title}
            description={capsule.description}
            owner={capsule.owner}
            onClick={() => onCapsuleClick?.(capsule)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
