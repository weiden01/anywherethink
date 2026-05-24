import { motion } from 'framer-motion'
import { Trade } from '../lib/supabase'
import { formatCurrency, formatPercentage, formatDate } from '../utils/calculations'
import { Trash2, ExternalLink } from 'lucide-react'

interface Props {
  trades: Trade[]
  onDelete: (id: string) => void
  onSelectImage: (trade: Trade) => void
}

export const TradeTable: React.FC<Props> = ({ trades, onDelete, onSelectImage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <div className="w-full overflow-x-auto">
      <motion.table
        className="w-full text-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="text-left py-3 px-4 font-semibold text-[var(--text-h)]">날짜</th>
            <th className="text-left py-3 px-4 font-semibold text-[var(--text-h)]">종목</th>
            <th className="text-left py-3 px-4 font-semibold text-[var(--text-h)]">신호/이유</th>
            <th className="text-right py-3 px-4 font-semibold text-[var(--text-h)]">목표</th>
            <th className="text-right py-3 px-4 font-semibold text-[var(--text-h)]">수익</th>
            <th className="text-right py-3 px-4 font-semibold text-[var(--text-h)]">수익률</th>
            <th className="text-left py-3 px-4 font-semibold text-[var(--text-h)]">진입시점</th>
            <th className="text-center py-3 px-4 font-semibold text-[var(--text-h)]">사진</th>
            <th className="text-center py-3 px-4 font-semibold text-[var(--text-h)]">삭제</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <motion.tr
              key={trade.id}
              variants={rowVariants}
              whileHover={{ backgroundColor: 'var(--social-bg)', transition: { duration: 0.2 } }}
              className="border-b border-[var(--border)] hover:bg-opacity-50 transition-colors"
            >
              <td className="py-3 px-4 text-[var(--text)]">{formatDate(trade.date)}</td>
              <td className="py-3 px-4 text-[var(--text-h)] font-medium">{trade.company}</td>
              <td className="py-3 px-4 text-[var(--text)] text-xs max-w-xs truncate">
                {trade.signal_detail}
              </td>
              <td className="py-3 px-4 text-right text-[var(--text)]">{trade.target_price}</td>
              <td
                className={`py-3 px-4 text-right font-semibold ${
                  trade.profit_loss >= 0 ? 'text-profit' : 'text-loss'
                }`}
              >
                {formatCurrency(trade.profit_loss)}
              </td>
              <td
                className={`py-3 px-4 text-right font-bold ${
                  trade.profit_percentage >= 0 ? 'text-profit' : 'text-loss'
                }`}
              >
                {formatPercentage(trade.profit_percentage)}
              </td>
              <td className="py-3 px-4 text-[var(--text)]">{trade.entry_time}</td>
              <td className="py-3 px-4 text-center">
                {trade.image_url ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectImage(trade)}
                    className="inline-flex items-center gap-1 text-var(--accent) hover:opacity-70"
                  >
                    <ExternalLink size={16} />
                  </motion.button>
                ) : (
                  <span className="text-[var(--border)]">-</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDelete(trade.id)}
                  className="inline-flex items-center gap-1 text-loss hover:opacity-70"
                >
                  <Trash2 size={16} />
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  )
}
