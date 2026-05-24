import { useState, useEffect } from 'react'
import { supabase, type Trade } from '../lib/supabase'

export const useTrades = () => {
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrades()
  }, [])

  const fetchTrades = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      setTrades(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching trades')
    } finally {
      setLoading(false)
    }
  }

  const addTrade = async (trade: Omit<Trade, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('trades')
        .insert([trade])
        .select()

      if (error) throw error
      if (data) {
        setTrades([data[0], ...trades])
      }
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding trade')
      throw err
    }
  }

  const updateTrade = async (id: string, updates: Partial<Trade>) => {
    try {
      const { data, error } = await supabase
        .from('trades')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      if (data) {
        setTrades(trades.map(t => t.id === id ? data[0] : t))
      }
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating trade')
      throw err
    }
  }

  const deleteTrade = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trades')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTrades(trades.filter(t => t.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting trade')
      throw err
    }
  }

  return { trades, loading, error, fetchTrades, addTrade, updateTrade, deleteTrade }
}

export const useImageUpload = () => {
  const uploadImage = async (file: File, tradeId: string): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${tradeId}_${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('trade-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('trade-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error uploading image')
    }
  }

  return { uploadImage }
}
