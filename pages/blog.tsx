import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Cold Email Templates That Actually Work in 2024',
    excerpt: 'Discover proven cold email templates that are generating high response rates in 2024. Learn the psychology behind successful outreach.',
    date: '2024-03-15',
    readTime: '8 min read',
    category: 'Templates',
    image: '/blog/cold-email-templates.jpg',
    slug: 'cold-email-templates-2024'
  },
  {
    id: '2',
    title: 'The Psychology of Cold Email Personalization',
    excerpt: 'Learn how to leverage psychological principles to create more engaging and effective cold emails that drive responses.',
    date: '2024-03-10',
    readTime: '6 min read',
    category: 'Strategy',
    image: '/blog/email-psychology.jpg',
    slug: 'psychology-of-cold-email'
  },
  {
    id: '3',
    title: 'How AI is Revolutionizing Cold Email Outreach',
    excerpt: 'Explore how artificial intelligence is transforming the way we write and send cold emails, making them more effective than ever.',
    date: '2024-03-05',
    readTime: '7 min read',
    category: 'Technology',
    image: '/blog/ai-cold-email.jpg',
    slug: 'ai-cold-email-revolution'
  },
  {
    id: '4',
    title: 'Cold Email Best Practices: A Complete Guide',
    excerpt: 'Master the art of cold emailing with this comprehensive guide covering everything from subject lines to follow-ups.',
    date: '2024-03-01',
    readTime: '10 min read',
    category: 'Guide',
    image: '/blog/cold-email-guide.jpg',
    slug: 'cold-email-best-practices'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Blog - AutoCold</title>
        <meta name="description" content="Latest insights and guides on cold email outreach, personalization, and AI-powered email generation" />
      </Head>

      <LandingHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-4">Cold Email Blog</h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
              Latest insights, strategies, and guides to help you master cold email outreach
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary text-white text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-secondary transition-colors"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white border-t">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter for the latest cold email tips, templates, and strategies.
              </p>
              <form className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 