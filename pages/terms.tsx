import { FC } from "react"
import Head from "next/head"

import LandingHeader from "@/components/LandingHeader"
import Footer from "@/components/Footer"

const TermsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | AutoCold</title>
        <meta name="description" content="AutoCold's terms of service - Learn about the terms and conditions for using our service." />
      </Head>

      <div className="flex min-h-screen flex-col">
        <LandingHeader />
        
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
                  <p className="text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="prose prose-gray max-w-none dark:prose-invert">
                  <h2>1. Agreement to Terms</h2>
                  <p>
                    By accessing or using AutoCold's services, you agree to be bound by these Terms of Service and all 
                    applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
                    from using or accessing this site.
                  </p>

                  <h2>2. Use License</h2>
                  <p>
                    Permission is granted to temporarily use AutoCold's services for personal, non-commercial transitory 
                    viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul>
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose</li>
                    <li>Attempt to decompile or reverse engineer any software contained in AutoCold's services</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>

                  <h2>3. User Accounts</h2>
                  <p>
                    When you create an account with us, you must provide accurate, complete, and current information. 
                    Failure to do so constitutes a breach of the Terms, which may result in immediate termination of 
                    your account.
                  </p>
                  <p>You are responsible for:</p>
                  <ul>
                    <li>Maintaining the confidentiality of your account and password</li>
                    <li>Restricting access to your computer and account</li>
                    <li>Accepting responsibility for all activities that occur under your account or password</li>
                  </ul>

                  <h2>4. Service Usage</h2>
                  <p>
                    You agree to use AutoCold's services only for lawful purposes and in accordance with these Terms. 
                    You agree not to use the service:
                  </p>
                  <ul>
                    <li>In any way that violates any applicable law or regulation</li>
                    <li>To transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, 
                        or otherwise objectionable</li>
                    <li>To impersonate or attempt to impersonate AutoCold, an employee, another user, or any other person</li>
                    <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service</li>
                  </ul>

                  <h2>5. Payment Terms</h2>
                  <p>
                    By subscribing to our paid services, you agree to pay all fees in accordance with your selected plan. 
                    All payments are non-refundable unless otherwise specified in our refund policy.
                  </p>

                  <h2>6. Intellectual Property</h2>
                  <p>
                    The Service and its original content, features, and functionality are owned by AutoCold and are 
                    protected by international copyright, trademark, patent, trade secret, and other intellectual 
                    property or proprietary rights laws.
                  </p>

                  <h2>7. Termination</h2>
                  <p>
                    We may terminate or suspend your account and bar access to the Service immediately, without prior 
                    notice or liability, under our sole discretion, for any reason whatsoever and without limitation, 
                    including but not limited to a breach of the Terms.
                  </p>

                  <h2>8. Limitation of Liability</h2>
                  <p>
                    In no event shall AutoCold, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                    be liable for any indirect, incidental, special, consequential or punitive damages, including without 
                    limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>

                  <h2>9. Disclaimer</h2>
                  <p>
                    Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" 
                    basis. The Service is provided without warranties of any kind, whether express or implied.
                  </p>

                  <h2>10. Changes to Terms</h2>
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a 
                    revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                  </p>

                  <h2>11. Contact Us</h2>
                  <p>
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <ul>
                    <li>Email: legal@autocold.com</li>
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

export default TermsPage 