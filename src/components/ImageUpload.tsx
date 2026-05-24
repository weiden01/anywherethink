import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import { Trade } from '../lib/supabase'

interface Props {
  isOpen: boolean
  onClose: () => void
  trade: Trade | null
  onUpload: (file: File) => Promise<void>
  isLoading: boolean
}

export const ImageUpload: React.FC<Props> = ({ isOpen, onClose, trade, onUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await onUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await onUpload(e.target.files[0])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && trade && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg)] rounded-lg shadow-lg p-8 z-50 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[var(--text-h)]">사진 업로드</h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                className="text-[var(--text)]"
              >
                <X size={24} />
              </motion.button>
            </div>

            <p className="text-sm text-[var(--text)] mb-4">
              {trade.company} ({trade.date})
            </p>

            {trade.image_url && (
              <div className="mb-6">
                <p className="text-xs text-[var(--text)] mb-2">현재 사진</p>
                <img
                  src={trade.image_url}
                  alt="Current"
                  className="w-full h-40 object-cover rounded-lg border border-[var(--border)]"
                />
              </div>
            )}

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-[var(--accent)] bg-[var(--accent-bg)]'
                  : 'border-[var(--border)]'
              }`}
            >
              <input
                type="file"
                id="image-input"
                onChange={handleChange}
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="image-input"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <motion.div
                  animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload size={32} className="text-[var(--accent)]" />
                </motion.div>
                <p className="text-sm font-medium text-[var(--text-h)]">
                  드래그하거나 클릭하여 선택
                </p>
                <p className="text-xs text-[var(--text)]">PNG, JPG, GIF (최대 10MB)</p>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              disabled={isLoading}
              className="w-full mt-6 border border-[var(--border)] text-[var(--text-h)] py-2 rounded-lg font-medium hover:bg-[var(--social-bg)] disabled:opacity-50"
            >
              {isLoading ? '업로드 중...' : '닫기'}
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
