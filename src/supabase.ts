import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://amvgpkowbaqwsvrzvgos.supabase.co';
const supabaseKey = 'sb_publishable_27KQhftQJ_HJ3TeopMDPjg_GI5s3wtY';

export const supabase = createClient(supabaseUrl, supabaseKey);
