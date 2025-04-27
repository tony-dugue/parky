import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@parky/ui/src/app/globals.css'
import { SessionProvider } from '@parky/ui/src/components/molecules/SessionProvider'
import { ApolloProvider } from '@parky/network/src/config/apollo'
import { MenuItem } from '@parky/util/types'
import { ToastContainer } from '@parky/ui/src/components/molecules/Toast'
import { Container } from '@parky/ui/src/components/atoms/Container'
import { Providers } from './providers'
import HeaderWithTranslation from './HeaderWithTranslation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parky',
  description: 'Valet parking management and reservation application',
}

const MENUITEMS: MenuItem[] = [
  { label: 'search-label', href: '/search' },
  { label: 'bookings-label', href: '/bookings' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <SessionProvider>
          <ApolloProvider>
            <body className={`${inter.className} bg-gray-25`}>
              <HeaderWithTranslation menuItems={MENUITEMS} />
              <Container>{children}</Container>
              <ToastContainer />
            </body>
          </ApolloProvider>
        </SessionProvider>
      </Providers>
    </html>
  )
}
