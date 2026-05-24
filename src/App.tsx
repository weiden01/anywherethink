import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTrades, useImageUpload } from './hooks/useSupabase'
import { Trade } from './lib/supabase'
import { TradeTable } from './components/TradeTable'
import { TradeForm } from './components/TradeForm'
import { ImageUpload } from './components/ImageUpload'
import { ImageViewer } from './components/ImageViewer'

function App() {
  const { trades, loading, addTrade, deleteTrade, updateTrade } = useTrades()
  const { uploadImage } = useImageUpload()

  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerImage, setViewerImage] = useState<{ url: string; title: string } | null>(null)
  const [isFormLoading, setIsFormLoading] = useState(false)

  const handleAddTrade = async (tradeData: Omit<Trade, 'id' | 'created_at' | 'updated_at'>) => {
    setIsFormLoading(true)
    try {
      await addTrade(tradeData)
    } finally {
      setIsFormLoading(false)
    }
  }

  const handleUploadImage = async (file: File) => {
    if (!selectedTrade) return
    setUploadLoading(true)
    try {
      const imageUrl = await uploadImage(file, selectedTrade.id)
      await updateTrade(selectedTrade.id, { image_url: imageUrl })
      setSelectedTrade(null)
    } catch (err) {
      console.error('Error uploading image:', err)
    } finally {
      setUploadLoading(false)
    }
  }

  const handleSelectImage = (trade: Trade) => {
    if (trade.image_url) {
      setViewerImage({ url: trade.image_url, title: `${trade.company} - ${trade.date}` })
      setViewerOpen(true)
    } else {
      setSelectedTrade(trade)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[var(--bg)] p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-2">
            📈 종베 매매일지
          </h1>
          <p className="text-[var(--text)]">모든 거래의 기록과 분석</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-between items-center mb-6 flex-wrap gap-4"
        >
          <div className="text-[var(--text)]">
            총 거래: <span className="font-bold text-[var(--text-h)]">{trades.length}</span>
          </div>
          <TradeForm onSubmit={handleAddTrade} isLoading={isFormLoading} />
        </motion.div>

        {loading ? (
          <motion.div
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-center py-12 text-[var(--text)]"
          >
            데이터를 불러오는 중...
          </motion.div>
        ) : trades.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 text-[var(--text)]"
          >
            <p className="text-lg mb-4">아직 등록된 거래가 없습니다.</p>
            <p className="text-sm">위의 버튼으로 새 거래를 추가해보세요!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-[var(--border)]"
          >
            <TradeTable
              trades={trades}
              onDelete={deleteTrade}
              onSelectImage={handleSelectImage}
            />
          </motion.div>
        )}
      </div>

      <ImageUpload
        isOpen={!!selectedTrade && !selectedTrade.image_url}
        onClose={() => setSelectedTrade(null)}
        trade={selectedTrade}
        onUpload={handleUploadImage}
        isLoading={uploadLoading}
      />

      <ImageViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        imageUrl={viewerImage?.url || null}
        title={viewerImage?.title || ''}
      />
    </motion.div>
  )
}

export default App
