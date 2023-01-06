import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

// creating a supabase client. we need it to interact with the supabase database
const supabaseClient = createClient(supabaseUrl, supabaseApiKey);

export default supabaseClient;
