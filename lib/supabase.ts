import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xodlmdlcelhufeblrfqh.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZGxtZGxjZWxodWZlYmxyZnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODM0MDgsImV4cCI6MjA2OTg1OTQwOH0.sLEG4gTfLo_2D81slb4uFvKWaSvpZixBZJd87gvhBaE'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZGxtZGxjZWxodWZlYmxyZnFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDI4MzQwOCwiZXhwIjoyMDY5ODU5NDA4fQ.J3lgPGa_AxVjD0ye8etXRl50Toh69UfUfij73PwcO_E'

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