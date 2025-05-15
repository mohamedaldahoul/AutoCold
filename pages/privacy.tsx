import { FC } from "react"
import Head from "next/head"

import LandingHeader from "@/components/LandingHeader"
import Footer from "@/components/Footer"

const PrivacyPage: FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | AutoCold</title>
        <meta name="description" content="AutoCold's privacy policy - Learn how we collect, use, and protect your data." />
      </Head>

      <div className="flex min-h-screen flex-col">
        <LandingHeader />
        
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
                  <p className="text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="prose prose-gray max-w-none dark:prose-invert">
                  <h2>1. Introduction</h2>
                  <p>
                    At AutoCold, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                    disclose, and safeguard your information when you use our service.
                  </p>

                  <h2>2. Information We Collect</h2>
                  <h3>2.1 Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide to us when you:</p>
                  <ul>
                    <li>Register for an account</li>
                    <li>Use our services</li>
                    <li>Contact us for support</li>
                    <li>Subscribe to our newsletter</li>
                  </ul>
                  <p>This information may include:</p>
                  <ul>
                    <li>Name and contact information</li>
                    <li>Email address</li>
                    <li>Company information</li>
                    <li>Payment information</li>
                  </ul>

                  <h3>2.2 Usage Data</h3>
                  <p>We automatically collect certain information about your device and how you interact with our service, including:</p>
                  <ul>
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Operating system</li>
                    <li>Pages visited</li>
                    <li>Time and date of visits</li>
                  </ul>

                  <h2>3. How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Provide and maintain our service</li>
                    <li>Process your transactions</li>
                    <li>Send you updates and marketing communications</li>
                    <li>Respond to your comments and questions</li>
                    <li>Improve our service</li>
                    <li>Comply with legal obligations</li>
                  </ul>

                  <h2>4. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>

                  <h2>5. Data Retention</h2>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in 
                    this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>

                  <h2>6. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                    <li>Request restriction of processing</li>
                    <li>Data portability</li>
                  </ul>

                  <h2>7. Cookies</h2>
                  <p>
                    We use cookies and similar tracking technologies to track activity on our service and hold certain 
                    information. You can instruct your browser to refuse all cookies or to indicate when a cookie is 
                    being sent.
                  </p>

                  <h2>8. Third-Party Services</h2>
                  <p>
                    We may use third-party services that collect, monitor, and analyze this information to improve 
                    our service's functionality.
                  </p>

                  <h2>9. Children's Privacy</h2>
                  <p>
                    Our service does not address anyone under the age of 13. We do not knowingly collect personally 
                    identifiable information from children under 13.
                  </p>

                  <h2>10. Changes to This Privacy Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                    the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>

                  <h2>11. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <ul>
                    <li>Email: privacy@autocold.com</li>
                    <li>Phone: +1 (555) 123-4567</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default PrivacyPage 