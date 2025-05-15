import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '@/components/logo';
import { api } from '@/lib/api';
import { Lead, mockLeads } from '@/lib/mockData';
import { Button } from '@/components/ui/button';

interface EmailResult {
  subject: string;
  body: string;
  lead?: {
    name: string;
    company: string;
    title: string;
  };
}

export default function Demo() {
  const [targetNiche, setTargetNiche] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [offer, setOffer] = useState('');
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<EmailResult[]>([]);
  const [error, setError] = useState('');
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const data = await api.emails.generate({
        targetNiche,
        targetRole,
        offer,
        tone,
        selectedLeadIndex: selectedLeadIndex !== null ? selectedLeadIndex : undefined,
      });
      
      setResults(data);
    } catch (err: any) {
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

    <div className="min-h-screen bg-gray-50 flex flex-col">
    <Head>
      <title>AutoCold - AI-Powered Cold Email Generator</title>
      <meta name="description" content="Generate personalized cold emails using AI" />
    </Head>

    <header className="container sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between py-4">
        <Logo />
        <nav className="hidden gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            Sign In
          </Link>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          AutoCold
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Generate personalized cold emails using AI
        </p>

        <div className="max-w-2xl mx-auto mb-6 bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
          <p className="font-medium mb-1">Demo Mode</p>
          <p>This demo includes mock leads that you can select to test the email generation. In a real scenario, these would be your actual prospects or leads. Select a specific lead or generate emails for all leads at once.</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Niche
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
              Your Role
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
              What Do You Offer?
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select a Lead (Optional)
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all-leads"
                  name="lead-selection"
                  checked={selectedLeadIndex === null}
                  onChange={() => setSelectedLeadIndex(null)}
                  className="mr-2"
                />
                <label htmlFor="all-leads">Generate for all leads</label>
              </div>
              
              {mockLeads.map((lead, index) => (
                <div key={index} className="flex items-start">
                  <input
                    type="radio"
                    id={`lead-${index}`}
                    name="lead-selection"
                    checked={selectedLeadIndex === index}
                    onChange={() => setSelectedLeadIndex(index)}
                    className="mr-2 mt-1"
                  />
                  <label htmlFor={`lead-${index}`} className="cursor-pointer">
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-gray-600">{lead.title} at {lead.company}</div>
                    <div className="text-sm text-gray-500">{lead.summary}</div>
                  </label>
                </div>
              ))}
            </div>
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
                  <div>
                    <h3 className="text-lg font-medium">Email {index + 1}</h3>
                    {result.lead && (
                      <div className="text-sm text-gray-600">
                        For: {result.lead.name} ({result.lead.title} at {result.lead.company})
                      </div>
                    )}
                  </div>
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

        <footer className="bg-white border-t py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">AutoCold</h3>
                <p className="text-gray-600 text-sm">
                  AI-powered cold email generator for freelancers and agencies.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/features" className="text-gray-600 hover:text-primary">Features</Link></li>
                  <li><Link href="/pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
                  <li><Link href="/demo" className="text-gray-600 hover:text-primary">Demo</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-gray-600 hover:text-primary">About</Link></li>
                  <li><Link href="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} AutoCold. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </div>
  );
} 