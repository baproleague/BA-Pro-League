import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lbsaxlfnwkcaxeymsvcp.supabase.co";
const supabasePublishableKey = "sb_publishable_Qu5cgQ2lWRBQK4b4j1Vvcw_ajlNHHow";

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
