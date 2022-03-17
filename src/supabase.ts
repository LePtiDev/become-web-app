import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wmqryzwrsxzihydpkbga.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcXJ5endyc3h6aWh5ZHBrYmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY5NDA4MjQsImV4cCI6MTk2MjUxNjgyNH0.oTukqWpQI58Zvi-92M9x3WhQl-Q2YzIVXMUr88UZAC4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)