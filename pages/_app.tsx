import Head from "next/head";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AutoCold</title>
        <meta name="description" content="Generate Personalized Cold Emails with AI" />
        <link rel="icon" href="/new.logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 