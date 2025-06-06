// import { NextApiRequest, NextApiResponse } from 'next';
// import { supabase } from '@/utils/supabase-client';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     console.log('Attempting to create user:', email);

//     // Create user in Supabase Auth
//     const { data: authData, error: signUpError } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (signUpError) {
//       console.error('Error creating user:', signUpError);
//       return res.status(400).json({ 
//         error: 'Failed to create user',
//         details: signUpError.message 
//       });
//     }

//     if (!authData.user) {
//       console.error('No user data returned after creation');
//       return res.status(500).json({ error: 'User creation failed - no data returned' });
//     }

//     console.log('User created successfully:', authData.user.id);

//     // Create user profile
//     const { error: profileError } = await supabase
//       .from('profiles')
//       .insert([
//         {
//           user_id: authData.user.id,
//           email: email,
//           created_at: new Date().toISOString(),
//         },
//       ]);

//     if (profileError) {
//       console.error('Error creating profile:', profileError);
//       // Don't return error here, as the user was created successfully
//     }

//     return res.status(201).json({
//       success: true,
//       user: {
//         id: authData.user.id,
//         email: authData.user.email,
//       },
//       session: authData.session
//     });
//   } catch (error) {
//     console.error('Error in signup API:', error);
//     return res.status(500).json({ 
//       error: 'Internal server error',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// } 

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, companyName, role } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('Attempting to create user:', email);

    // Create the user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        companyName,
        role
      }
    });

    if (error) {
      console.error('Error creating user:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('User created successfully:', data.user.id);

    // No need to manually create profile - it's handled by the database trigger

    return res.status(201).json({ 
      user: data.user
    });
  } catch (error) {
    console.error('Error in signup API:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}