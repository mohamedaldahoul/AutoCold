import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/lib/api';

interface TestUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function TestUser() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateTestUser = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.user.createTestUser();
      if (response.error) {
        setError(response.error);
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('Failed to create test user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Test User
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            This will create a test user account for development purposes.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={handleCreateTestUser}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Test User'}
        </button>
      </div>
    </div>
  );
} 