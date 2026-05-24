import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { Trade } from '../lib/supabase'
import { calculateProfitPercentage } from '../utils/calculations'

interface Props {
  onSubmit: (trade: Omit<Trade, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  isLoading: boolean
}

export const TradeForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    company: '',
    signal_detail: '',
    target_price: '',
    profit_loss: 0,
    entry_time: '',
    first_action: '',
    second_action: '',
    query_notes: '',
    investment: 100000000,
  })

  const profitPercentage = calculateProfitPercentage(formData.profit_loss, formData.investment)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'profit_loss' || name === 'investment' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit({
        ...formData,
        profit_percentage: profitPercentage,
        image_url: null,
      })
      setFormData({
        date: '',
        company: '',
        signal_detail: '',
        target_price: '',
        profit_loss: 0,
        entry_time: '',
        first_action: '',
        second_action: '',
        query_notes: '',
        investment: 100000000,
      })
      setIsOpen(false)
    } catch (err) {
      console.error('폼 제출 오류:', err)
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        <Plus size={20} /> 새 거래 추가
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg)] rounded-lg shadow-lg p-6 z-50 max-w-2xl w-full mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-[var(--text-h)]">새 거래 추가</h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--text)]"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                      날짜
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                      종목
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="종목명"
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                      수익 (원)
                    </label>
                    <input
                      type="number"
                      name="profit_loss"
                      value={formData.profit_loss}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                      비중 (원)
                    </label>
                    <input
                      type="number"
                      name="investment"
                      value={formData.investment}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </div>

                  <div className="col-span-2 bg-[var(--accent-bg)] border border-[var(--accent-border)] rounded-lg p-3">
                    <p className="text-sm text-[var(--text-h)]">
                      수익률: <span className="font-bold">{profitPercentage.toFixed(2)}%</span>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                    신호/이유
                  </label>
                  <textarea
                    name="signal_detail"
                    value={formData.signal_detail}
                    onChange={handleChange}
                    placeholder="거래 신호 및 이유"
                    rows={2}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                    목표가
                  </label>
                  <input
                    type="text"
                    name="target_price"
                    value={formData.target_price}
                    onChange={handleChange}
                    placeholder="목표가"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                    진입시점
                  </label>
                  <input
                    type="text"
                    name="entry_time"
                    value={formData.entry_time}
                    onChange={handleChange}
                    placeholder="진입시점"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                    추가매수
                  </label>
                  <input
                    type="text"
                    name="first_action"
                    value={formData.first_action}
                    onChange={handleChange}
                    placeholder="추가매수 내용"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                    재추가매수
                  </label>
                  <input
                    type="text"
                    name="second_action"
                    value={formData.second_action}
                    onChange={handleChange}
                    placeholder="재추가매수 내용"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-h)] mb-1">
                    차트 Q
                  </label>
                  <textarea
                    name="query_notes"
                    value={formData.query_notes}
                    onChange={handleChange}
                    placeholder="차트 관련 메모"
                    rows={2}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-[var(--accent)] text-white py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    {isLoading ? '추가 중...' : '추가하기'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 border border-[var(--border)] text-[var(--text-h)] py-2 rounded-lg font-medium hover:bg-[var(--social-bg)]"
                  >
                    취소
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
