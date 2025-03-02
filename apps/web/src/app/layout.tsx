import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloProvider } from '@parky/network/src/config/apollo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ApolloProvider>
        <body className={inter.className}>{children}</body>
      </ApolloProvider>
    </html>
  )
}
