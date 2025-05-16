import { FC } from "react"
import Head from "next/head"
import Image from "next/image"
import { Users, Target, Zap, Heart } from "lucide-react"

import LandingHeader from "@/components/LandingHeader"
import Footer from "@/components/Footer"

const AboutPage: FC = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "/placeholder.svg",
      bio: "Former sales leader with 10+ years of experience in cold outreach and automation.",
    },
    {
      name: "Jane Smith",
      role: "Head of Product",
      image: "/placeholder.svg",
      bio: "Product expert with a passion for creating user-friendly solutions.",
    },
    {
      name: "Mike Johnson",
      role: "Lead Developer",
      image: "/placeholder.svg",
      bio: "Full-stack developer with expertise in AI and automation technologies.",
    },
  ]

  const values = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Customer Success",
      description: "We're committed to helping our customers achieve their goals through effective cold outreach.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible with AI-powered email automation.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Integrity",
      description: "We believe in honest, transparent communication and ethical business practices.",
    },
  ]

  return (
    <>
      <Head>
        <title>About Us | AutoCold</title>
        <meta name="description" content="Learn about AutoCold's mission to revolutionize cold email outreach with AI-powered automation." />
      </Head>

      <div className="flex min-h-screen flex-col">
        <LandingHeader />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About AutoCold</h1>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We&apos;re on a mission to revolutionize cold email outreach with AI-powered automation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container px-4 md:px-6">
              <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
                  <p className="text-muted-foreground">
                    At AutoCold, we&apos;re on a mission to revolutionize cold email outreach. We believe that 
                    meaningful connections shouldn&apos;t be limited by time or resources. Our AI-powered platform 
                    helps businesses and professionals create personalized, effective cold emails at scale.
                  </p>
                  <p className="text-muted-foreground">
                    We&apos;re committed to making cold outreach more efficient, effective, and ethical, helping our customers 
                    build genuine relationships while saving valuable time and resources.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg">
                    <div className="absolute inset-0 bg-grid-black/5 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                    <div className="relative h-full w-full rounded-lg bg-white p-4 shadow-sm">
                      <div className="flex h-full items-center justify-center">
                        <Users className="h-24 w-24 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We&apos;re committed to helping you achieve your outreach goals while maintaining the highest 
                    standards of quality and personalization.
                  </p>
                </div>
              </div>

              <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
                {values.map((value, index) => (
                  <div key={index} className="flex flex-col items-center space-y-4 text-center">
                    <div className="rounded-full bg-purple-100 p-3">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Meet the people behind AutoCold.
                  </p>
                </div>
              </div>

              <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex flex-col items-center space-y-4 text-center">
                    <div className="relative h-48 w-48 overflow-hidden rounded-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-purple-600">{member.role}</p>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default AboutPage 