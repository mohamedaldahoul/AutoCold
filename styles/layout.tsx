import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

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
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}