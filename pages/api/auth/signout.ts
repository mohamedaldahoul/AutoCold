import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
      return res.status(500).json({ 
        error: 'Failed to sign out',
        details: error.message 
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in signout API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 