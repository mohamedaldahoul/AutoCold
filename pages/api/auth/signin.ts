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
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('Attempting to sign in user:', email);

    // Sign in with Supabase
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Sign in error:', signInError);
      return res.status(401).json({ 
        error: 'Invalid email or password',
        details: signInError.message 
      });
    }

    if (!data.user) {
      console.error('No user data returned after sign in');
      return res.status(401).json({ error: 'Authentication failed' });
    }

    console.log('User signed in successfully:', data.user.id);

    // Get the user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', data.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      // Don't return error here, as the user was authenticated successfully
    }

    // Return the session and user data
    return res.status(200).json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        ...(profile || {}),
      },
      session: data.session
    });
  } catch (error) {
    console.error('Error in signin API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 