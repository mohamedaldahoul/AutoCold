import Link from 'next/link';

export default function Footer() {
  return (
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
        <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AutoCold. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 