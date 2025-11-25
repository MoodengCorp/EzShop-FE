import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>EzShop</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  )
}
