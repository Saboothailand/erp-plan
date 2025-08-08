import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for ERP Saboo
export interface ProjectPhase {
  id: string
  phase: string
  title: string
  description: string
  start_date: string
  end_date: string
  status: 'pending' | 'in_progress' | 'completed'
  progress: number
  tasks: string[]
  created_at: string
  updated_at: string
}

export interface SystemModule {
  id: string
  name: string
  description: string
  tables_count: number
  status: 'pending' | 'in_progress' | 'completed'
  color: string
  icon: string
  created_at: string
  updated_at: string
}

export interface ProjectKPI {
  id: string
  name: string
  target_value: string
  current_value: string
  unit: string
  category: string
  created_at: string
  updated_at: string
} 