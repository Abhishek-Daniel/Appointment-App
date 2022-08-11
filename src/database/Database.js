import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jodjktprsbphmuhqdvta.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZGprdHByc2JwaG11aHFkdnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAxNjAxMzksImV4cCI6MTk3NTczNjEzOX0.38kv56ZXK4ER1J452WnZvfPvEfhC123pp-kbeBXyUBU";
export const supabase = createClient(supabaseUrl, supabaseKey);
