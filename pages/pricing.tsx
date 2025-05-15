import { FC } from "react"
import Head from "next/head"
import { Check } from "lucide-react"

import LandingHeader from "@/components/LandingHeader"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

const PricingPage: FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "29",
      description: "Perfect for freelancers and small teams",
      features: [
        "100 emails per month",
        "Basic email templates",
        "Email tracking",
        "Basic analytics",
        "Email support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "79",
      description: "Ideal for growing businesses",
      features: [
        "1,000 emails per month",
        "Advanced email templates",
        "AI-powered personalization",
        "Advanced analytics",
        "Priority support",
        "Custom email domains",
        "Team collaboration",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large organizations",
      features: [
        "5,000 emails per month",
        "Custom email templates",
        "Advanced AI personalization",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <>
      <Head>
        <title>Pricing | AutoCold</title>
        <meta name="description" content="Choose the perfect plan for your cold email outreach needs with AutoCold's flexible pricing options." />
      </Head>

      <div className="flex min-h-screen flex-col">
        <LandingHeader />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h1>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Choose the perfect plan for your cold email outreach needs. All plans include a 14-day free trial.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container px-4 md:px-6">
              <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`flex flex-col rounded-lg border bg-white p-8 shadow-sm transition-all hover:shadow-md ${
                      plan.popular ? "border-purple-500 ring-1 ring-purple-500" : "border-gray-200"
                    }`}
                  >
                    {plan.popular && (
                      <div className="mb-4 inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-600">
                        Most Popular
                      </div>
                    )}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <p className="text-muted-foreground">{plan.description}</p>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="ml-1 text-muted-foreground">/month</span>
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-purple-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                            : "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl space-y-8">
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground">
                    Have questions? We're here to help.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">What happens after my free trial?</h3>
                    <p className="text-muted-foreground">
                      After your 14-day free trial, you'll be automatically charged for the plan you selected. 
                      You can cancel or change your plan at any time.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Can I upgrade or downgrade my plan?</h3>
                    <p className="text-muted-foreground">
                      Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated 
                      amount for the remainder of your billing cycle. When downgrading, the new rate will apply 
                      at the start of your next billing cycle.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">What payment methods do you accept?</h3>
                    <p className="text-muted-foreground">
                      We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. 
                      Enterprise customers can also pay via invoice.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Do you offer refunds?</h3>
                    <p className="text-muted-foreground">
                      We offer a 14-day money-back guarantee if you're not satisfied with our service. 
                      No questions asked.
                    </p>
                  </div>
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

export default PricingPage 