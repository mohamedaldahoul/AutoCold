import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Zap } from "lucide-react"
export const metadata: Metadata = {
  title: "AutoCold - AI-Powered Cold Emails",
  description: "Generate personalized cold emails with AI in seconds. Save time and increase response rates.",
  generator: "AutoCold",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <div className="absolute bottom-6 right-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-2 text-white shadow-lg">
            <Zap className="h-6 w-6" />
        </div>
        {/* <link rel="icon" href="/favicon.png" type="image/svg+xml" /> */}
      </head>
      <body>{children}</body>
    </html>
  )
}