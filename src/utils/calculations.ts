export const calculateProfitPercentage = (profit: number, investment: number): number => {
  if (investment === 0) return 0
  return (profit / investment) * 100
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(value)
}

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
}

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '-'
  return dateStr.split('-').join('.')
}
