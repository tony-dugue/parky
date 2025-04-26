import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@parky/ui/src/app/globals.css'
import { SessionProvider } from '@parky/ui/src/components/molecules/SessionProvider'
import { ApolloProvider } from '@parky/network/src/config/apollo'
import { MenuItem } from '@parky/util/types'
import { ToastContainer } from '@parky/ui/src/components/molecules/Toast'
import { Header } from '@parky/ui/src/components/organisms/Header'
import { Container } from '@parky/ui/src/components/atoms/Container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parky',
  description: 'Valet parking management and reservation application',
}

const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Bookings', href: '/bookings' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body className={`${inter.className} bg-gray-25`}>
            <Header menuItems={MENUITEMS} />
            <Container>{children}</Container>
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
