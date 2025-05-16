import axios from './axios';

/**
 * API utility for centralizing endpoint calls
 */
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface Session {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface AuthResponse {
  session: Session;
  user: Session['user'];
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  company?: string;
  role?: string;
}

interface EmailData {
  id: string;
  subject: string;
  body: string;
  leadName: string;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  /**
   * Authentication related API calls
   */
  auth: {
    // Sign in with email and password
    signIn: async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
      try {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return { data };
      } catch {
        return { error: 'Failed to sign in' };
      }
    },

    // Sign up new user
    signUp: async (data: { email: string; password: string; name: string }): Promise<ApiResponse<AuthResponse>> => {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return { data: responseData };
      } catch {
        return { error: 'Failed to sign up' };
      }
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
    updateProfile: async (data: Partial<UserProfile>) => {
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
      selectedLeadIndex?: number;
    }) => {
      const response = await axios.post('/api/generate', data);
      return response.data;
    },

    // Save generated email
    save: async (emailData: EmailData) => {
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