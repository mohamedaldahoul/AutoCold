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
                    By accessing or using our service, you agree to be bound by these Terms. If you disagree with any 
                    part of the terms, you may not access the service.
                  </p>

                  <h2>2. Use License</h2>
                  <p>
                    Permission is granted to temporarily use our service for personal, non-commercial transitory 
                    viewing only. This is the grant of a license, not a transfer of title.
                  </p>

                  <h2>3. User Accounts</h2>
                  <p>
                    When you create an account with us, you must provide accurate and complete information. You are 
                    responsible for maintaining the security of your account and password.
                  </p>

                  <h2>4. Service Usage</h2>
                  <p>
                    You agree not to use the service for any illegal or unauthorized purpose. You must not transmit 
                    any worms, viruses, or any code of a destructive nature.
                  </p>

                  <h2>5. Payment Terms</h2>
                  <p>
                    By subscribing to our service, you agree to pay all fees in accordance with your selected plan. 
                    All payments are non-refundable unless otherwise specified.
                  </p>

                  <h2>6. Intellectual Property</h2>
                  <p>
                    The service and its original content, features, and functionality are owned by us and are 
                    protected by international copyright, trademark, patent, trade secret, and other intellectual 
                    property laws.
                  </p>

                  <h2>7. Termination</h2>
                  <p>
                    We may terminate or suspend your account and bar access to the service immediately, without prior 
                    notice or liability, under our sole discretion, for any reason whatsoever.
                  </p>

                  <h2>8. Limitation of Liability</h2>
                  <p>
                    In no event shall we be liable for any indirect, incidental, special, consequential, or punitive 
                    damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
                    losses.
                  </p>

                  <h2>9. Disclaimer</h2>
                  <p>
                    Your use of the service is at your sole risk. The service is provided on an &quot;AS IS&quot; and 
                    &quot;AS AVAILABLE&quot; basis. The service is provided without warranties of any kind, whether 
                    express or implied.
                  </p>

                  <h2>10. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we 
                    will provide at least 30 days&apos; notice prior to any new terms taking effect.
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