import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "config";

const client = createClient(supabaseConfig.endpoint, supabaseConfig.apiKey);

export default client;
