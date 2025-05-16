import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase-client';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists in profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking profile:', profileError);
      return res.status(500).json({ 
        error: 'Error checking profile',
        details: profileError.message 
      });
    }

    // Try to sign in to check if user exists in auth
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: 'dummy-password', // We don't care about the password for this check
    });

    const exists = !authError || authError.message !== 'Invalid login credentials';

    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    return res.status(200).json({
      exists,
      hasProfile: !!profile,
      profile: profile
    });
  } catch (error) {
    console.error('Error in check-user API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 