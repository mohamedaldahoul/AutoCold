import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import Footer from '@/components/Footer';

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: '1',
    title: '10 Cold Email Templates That Actually Work in 2024',
    content: `
      <p>Cold emailing remains one of the most effective ways to reach potential clients and partners. However, with inboxes more crowded than ever, it's crucial to stand out with compelling templates that drive responses.</p>

      <h2>1. The Value-First Template</h2>
      <p>This template focuses on providing immediate value before asking for anything in return. It's particularly effective for B2B outreach.</p>

      <h2>2. The Social Proof Template</h2>
      <p>Leverage the power of social proof by mentioning relevant case studies or testimonials from similar companies.</p>

      <h2>3. The Problem-Solution Template</h2>
      <p>Identify a specific pain point your prospect is likely facing and present your solution in a clear, concise way.</p>

      <h2>4. The Industry Insight Template</h2>
      <p>Share valuable industry insights or trends that demonstrate your expertise and relevance.</p>

      <h2>5. The Mutual Connection Template</h2>
      <p>Reference a mutual connection or shared experience to establish credibility and rapport.</p>

      <h2>6. The Personalized Research Template</h2>
      <p>Show that you've done your homework by referencing specific details about the prospect's company or role.</p>

      <h2>7. The Question-Based Template</h2>
      <p>Engage prospects with thought-provoking questions that highlight their challenges.</p>

      <h2>8. The Story-Based Template</h2>
      <p>Use storytelling to make your message more memorable and relatable.</p>

      <h2>9. The Data-Driven Template</h2>
      <p>Back up your claims with relevant statistics and data points.</p>

      <h2>10. The Follow-Up Template</h2>
      <p>Keep the conversation going with a well-timed follow-up that adds new value.</p>

      <h2>Best Practices for Using These Templates</h2>
      <ul>
        <li>Always personalize the template to the recipient</li>
        <li>Keep your message concise and focused</li>
        <li>Include a clear call to action</li>
        <li>Test different variations to optimize results</li>
        <li>Follow up appropriately</li>
      </ul>

      <h2>Conclusion</h2>
      <p>While these templates provide a solid foundation, remember that the most effective cold emails are those that are genuinely personalized and provide real value to the recipient. Use these templates as a starting point, but always adapt them to your specific situation and audience.</p>
    `,
    date: '2024-03-15',
    readTime: '8 min read',
    category: 'Templates',
    image: '/blog/cold-email-templates.jpg',
    slug: 'cold-email-templates-2024'
  },
  // Add more blog posts here
];

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <LandingHeader />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Link href="/blog" className="text-primary hover:text-secondary">
              Return to blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>{post.title} - AutoCold Blog</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Head>

      <LandingHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
              <Link 
                href="/blog"
                className="inline-flex items-center text-primary hover:text-secondary mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to blog
              </Link>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <article className="max-w-3xl mx-auto prose prose-lg">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
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