import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Trade = {
  id: string
  date: string
  company: string
  signal_detail: string
  target_price: string
  profit_loss: number
  profit_percentage: number
  entry_time: string
  first_action: string
  second_action: string
  query_notes: string
  investment: number
  image_url: string | null
  created_at: string
  updated_at: string
}
