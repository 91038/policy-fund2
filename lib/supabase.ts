import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = typeof window === 'undefined' && supabaseServiceRoleKey !== 'placeholder-service-role-key' 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase

export type Application = {
  id?: string
  name: string
  phone: string
  email?: string
  business_type: string
  company_name?: string
  business_registration_number?: string
  funding_amount: string
  funding_purpose?: string
  company_size?: string
  business_years?: number
  annual_revenue?: string
  status?: string
  notes?: string
  created_at?: string
  updated_at?: string
}