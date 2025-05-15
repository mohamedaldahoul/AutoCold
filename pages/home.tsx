import { FC, useState } from "react"
import Link from "next/link"
import { Zap, Target, TrendingUp, Mail, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/logo"
import { api } from "@/lib/api"
import Footer from "@/components/Footer"

const HomePage:FC =  ()=>{
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleWaitlistSubmit = async () => {
    if (!waitlistEmail || !waitlistEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await api.waitlist.join(waitlistEmail);
      setIsSubmitted(true);
      setWaitlistEmail('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to join waitlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
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
            <Button asChild variant="outline" className="hidden md:inline-flex">
              <Link href="/demo">Try Demo</Link>
            </Button>
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Generate Personalized Cold Emails with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Save hours of research and writing. AutoCold helps freelancers and agencies create high-converting
                    cold emails in seconds.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Link href="/demo">Try Free Demo</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg">
                  <div className="absolute inset-0 bg-grid-black/5 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                  <div className="relative rounded-lg bg-white p-4 shadow-sm">
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 rounded bg-gray-100" />
                      <div className="h-4 w-full rounded bg-gray-100" />
                      <div className="h-4 w-full rounded bg-gray-100" />
                      <div className="h-4 w-2/3 rounded bg-gray-100" />
                    </div>
                  </div>
                  <div className="mt-4 relative rounded-lg bg-white p-4 shadow-sm">
                    <div className="space-y-2">
                      <div className="h-4 w-1/2 rounded bg-gray-100" />
                      <div className="h-4 w-full rounded bg-gray-100" />
                      <div className="h-4 w-full rounded bg-gray-100" />
                      <div className="h-4 w-3/4 rounded bg-gray-100" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-2 text-white shadow-lg">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 font-medium">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need for Cold Outreach
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AutoCold provides all the tools you need to create, send, and track high-converting cold emails.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col items-start space-y-4">
                <div className="rounded-full bg-purple-100 p-3">
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
                    className="h-6 w-6 text-purple-600"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M8 13h2" />
                    <path d="M8 17h2" />
                    <path d="M14 13h2" />
                    <path d="M14 17h2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">AI-Powered Templates</h3>
                <p className="text-muted-foreground">
                  Choose from dozens of proven templates or let our AI generate custom templates based on your target
                  audience.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="rounded-full bg-pink-100 p-3">
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
                    className="h-6 w-6 text-pink-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Personalization Engine</h3>
                <p className="text-muted-foreground">
                  Automatically personalize each email with recipient-specific details that go beyond just using their
                  name.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="rounded-full bg-purple-100 p-3">
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
                    className="h-6 w-6 text-purple-600"
                  >
                    <path d="M2 12h10" />
                    <path d="M9 4v16" />
                    <path d="M12 9h10" />
                    <path d="M19 4v16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">A/B Testing</h3>
                <p className="text-muted-foreground">
                  Test different subject lines, email content, and CTAs to optimize your conversion rates.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="rounded-full bg-pink-100 p-3">
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
                    className="h-6 w-6 text-pink-600"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Track open rates, click-through rates, and responses to measure and improve your campaign performance.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="rounded-full bg-purple-100 p-3">
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
                    className="h-6 w-6 text-purple-600"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Smart Editor</h3>
                <p className="text-muted-foreground">
                  Our AI-powered editor helps you craft compelling messages with real-time suggestions and improvements.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="rounded-full bg-pink-100 p-3">
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
                    className="h-6 w-6 text-pink-600"
                  >
                    <path d="M4 11a9 9 0 0 1 9 9" />
                    <path d="M4 4a16 16 0 0 1 16 16" />
                    <circle cx="5" cy="19" r="1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Campaign Automation</h3>
                <p className="text-muted-foreground">
                  Schedule follow-up sequences and automate your entire outreach process for maximum efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose AutoCold?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform delivers results that outperform traditional cold emailing methods.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-purple-100 p-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-center text-muted-foreground">Generate personalized emails in seconds, not hours.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-pink-100 p-3">
                  <Target className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold">Highly Targeted</h3>
                <p className="text-center text-muted-foreground">
                  Create emails that resonate with your target audience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-purple-100 p-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Better Results</h3>
                <p className="text-center text-muted-foreground">
                  Increase your response rates with AI-optimized content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 font-medium">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business. All plans include a 14-day free trial.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {/* Starter Plan */}
              <div className="flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <p className="text-sm text-muted-foreground">Perfect for freelancers and solopreneurs.</p>
                </div>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-3xl font-bold tracking-tight">$29</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>100 emails/month</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Email personalization</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Start Free Trial
                  </Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col rounded-xl border-2 border-purple-600 bg-white p-6 shadow-md">
                <div className="absolute -mt-10 ml-4 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Professional</h3>
                  <p className="text-sm text-muted-foreground">For growing businesses and agencies.</p>
                </div>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-3xl font-bold tracking-tight">$79</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>500 emails/month</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Advanced templates</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Deep personalization</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>A/B testing</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Advanced analytics</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Start Free Trial
                  </Button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="text-sm text-muted-foreground">For large teams and organizations.</p>
                </div>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-3xl font-bold tracking-tight">$199</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Unlimited emails</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Custom templates</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Advanced personalization</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 font-medium">
                  Blog
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest from Our Blog</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tips, strategies, and insights to help you master cold outreach.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Blog Post 1 */}
              <div className="group flex flex-col rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Blog post thumbnail"
                    className="h-full w-full object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-600">
                      Strategy
                    </div>
                    <h3 className="text-xl font-bold">7 Cold Email Templates That Actually Get Responses</h3>
                    <p className="text-muted-foreground">
                      Learn the proven formulas that can dramatically increase your response rates and conversions.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link href="#" className="text-sm font-medium text-purple-600 hover:underline">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="group flex flex-col rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Blog post thumbnail"
                    className="h-full w-full object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-600">Tips</div>
                    <h3 className="text-xl font-bold">The Art of Personalization: Beyond Using First Names</h3>
                    <p className="text-muted-foreground">
                      Discover advanced personalization techniques that make your cold emails stand out in crowded
                      inboxes.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link href="#" className="text-sm font-medium text-purple-600 hover:underline">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="group flex flex-col rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Blog post thumbnail"
                    className="h-full w-full object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-600">
                      Case Study
                    </div>
                    <h3 className="text-xl font-bold">How Agency X Increased Client Acquisition by 300%</h3>
                    <p className="text-muted-foreground">
                      See how a marketing agency used AutoCold to transform their outreach strategy and win more
                      clients.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link href="#" className="text-sm font-medium text-purple-600 hover:underline">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join the Waitlist</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Be the first to know when we launch our full version with advanced features.
              </p>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {isSubmitted && (
                <p className="text-green-500 font-medium mt-2">
                  Thank you for joining our waitlist! We'll keep you updated.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="flex-1">
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  className="h-12"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  disabled={isSubmitting || isSubmitted}
                />
              </div>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                onClick={handleWaitlistSubmit}
                disabled={isSubmitting || isSubmitted}
              >
                <Mail className="mr-2 h-4 w-4" /> 
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">For Freelancers</h3>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                    <span>Save time on prospecting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                    <span>Land more clients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                    <span>Personalize at scale</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">For Agencies</h3>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-pink-600" />
                    <span>Streamline outreach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-pink-600" />
                    <span>Improve conversion rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-pink-600" />
                    <span>Scale your business</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">For Startups</h3>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                    <span>Reach potential customers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                    <span>Generate early traction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                    <span>Optimize your messaging</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage;
