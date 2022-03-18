import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wmqryzwrsxzihydpkbga.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcXJ5endyc3h6aWh5ZHBrYmdhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0Njk0MDgyNCwiZXhwIjoxOTYyNTE2ODI0fQ.oMJLKfjcE2JeqKUXHokDXRSc4nth-8T0G-ZWM7YhflQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)