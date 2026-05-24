import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  imageUrl: string | null
  title: string
}

export const ImageViewer: React.FC<Props> = ({ isOpen, onClose, imageUrl, title }) => {
  return (
    <AnimatePresence>
      {isOpen && imageUrl && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-2xl w-full mx-4"
          >
            <div className="bg-[var(--bg)] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-[var(--bg)] p-4 border-b border-[var(--border)]">
                <p className="text-[var(--text-h)] font-semibold">{title}</p>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={onClose}
                  className="text-[var(--text)]"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <img src={imageUrl} alt={title} className="w-full h-auto" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
