import Image from 'next/image'
import { motion } from 'framer-motion'

interface CapsuleCardProps {
  image: string
  title: string
  description: string
  owner?: string
  onClick?: () => void
}

export default function CapsuleCard({
  image,
  title,
  description,
  owner,
  onClick,
}: CapsuleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-zinc-900 border dark:border-zinc-800 cursor-pointer transition-all"
      onClick={onClick}
    >
      <div className="relative w-full h-60">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-400 line-clamp-2">
          {description}
        </p>
        {owner && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Owned by <span className="font-medium">{owner}</span>
          </p>
        )}
      </div>
    </motion.div>
  )
}
