import axios from './axios';

/**
 * API utility for centralizing endpoint calls
 */
export const api = {
  /**
   * Authentication related API calls
   */
  auth: {
    // Sign in with email and password
    signIn: async (email: string, password: string) => {
      const response = await axios.post('/api/auth/signin', { email, password });
      return response.data;
    },

    // Sign up new user
    signUp: async (userData: { email: string; password: string; companyName?: string; role?: string }) => {
      const response = await axios.post('/api/auth/signup', userData);
      return response.data;
    },

    // Sign out user
    signOut: async () => {
      const response = await axios.post('/api/auth/signout');
      return response.data;
    },
  },

  /**
   * User related API calls
   */
  user: {
    // Get current user profile
    getProfile: async () => {
      const response = await axios.get('/api/user/profile');
      return response.data;
    },

    // Update user profile
    updateProfile: async (data: any) => {
      const response = await axios.put('/api/user/profile', data);
      return response.data;
    },
  },

  /**
   * Email generation related API calls
   */
  emails: {
    // Generate emails based on user input
    generate: async (data: { 
      targetNiche: string; 
      targetRole: string; 
      offer: string; 
      tone: string;
    }) => {
      const response = await axios.post('/api/generate', data);
      return response.data;
    },

    // Save generated email
    save: async (emailData: any) => {
      const response = await axios.post('/api/emails/save', emailData);
      return response.data;
    },

    // Get user's saved emails
    getSaved: async () => {
      const response = await axios.get('/api/emails/saved');
      return response.data;
    },
  },

  /**
   * Waitlist related API calls
   */
  waitlist: {
    // Join waitlist
    join: async (email: string) => {
      const response = await axios.post('/api/waitlist', { email });
      return response.data;
    },
  },
}; 