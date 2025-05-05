import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface EmailResult {
  subject: string;
  body: string;
}

export default function EmailGenerator() {
  const [targetNiche, setTargetNiche] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [offer, setOffer] = useState('');
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<EmailResult[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetNiche,
          targetRole,
          offer,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emails');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to generate emails. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (

    <div className="min-h-screen bg-gray-50">
    <Head>
      <title>AutoCold - AI-Powered Cold Email Generator</title>
      <meta name="description" content="Generate personalized cold emails using AI" />
    </Head>

    <header className="container mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">AutoCold</div>
        <div className="flex items-center gap-4">
          <Link href="/landing" className="text-primary hover:text-secondary transition-colors">
            About
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/signin" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link href="/signup" className="text-gray-600 hover:text-gray-900">
              Sign Up
            </Link>
          </nav>
        </div>
      </nav>
    </header>

    <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          AutoCold
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Generate personalized cold emails using AI
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Niche
            </label>
            <input
              type="text"
              value={targetNiche}
              onChange={(e) => setTargetNiche(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
              placeholder="e.g., SaaS, E-commerce, Healthcare"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Role
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
              placeholder="e.g., CMO, CEO, Marketing Director"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Offer
            </label>
            <textarea
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
              placeholder="Describe your service or product offering"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tone Style
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="witty">Witty</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate Emails'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center">{error}</div>
        )}

        {results.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold text-center">Generated Emails</h2>
            {results.map((result, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Email {index + 1}</h3>
                  <button
                    onClick={() => copyToClipboard(`${result.subject}\n\n${result.body}`)}
                    className="text-sm text-primary hover:text-secondary"
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Subject: {result.subject}</p>
                  <p className="whitespace-pre-line">{result.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        </main>
        </div>
  );
} 