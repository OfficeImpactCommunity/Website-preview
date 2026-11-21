import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.2/+esm";

export const SUPABASE_URL = "https://ozvtyutfjswajksjzcec.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Qvwn1WiuTIoa2SsSkENETA_s5rDyrN_";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});
