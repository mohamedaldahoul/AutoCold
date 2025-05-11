import Head from "next/head";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Zap } from "lucide-react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AutoCold</title>
        <meta name="description" content="Generate Personalized Cold Emails with AI" />
        {/* <link rel="icon" href="/image.png" /> */}
        <div className="absolute bottom-6 right-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-2 text-white shadow-lg">
            <Zap className="h-6 w-6" />
        </div>
      </Head>
      <Component {...pageProps} />
    </>
  );
} 