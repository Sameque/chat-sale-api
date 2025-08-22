const { createClient } = require("@supabase/supabase-js");

// use variáveis de ambiente em produção
const SUPABASE_URL = "https://ptpsrsggfchhxrqgevai.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cHNyc2dnZmNoaHhycWdldmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3Mzk1MTksImV4cCI6MjA3MTMxNTUxOX0.gUHV9PhkEOyl9lKnYhczbu-L0zw76JJWWpNsppBR-t8";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
