import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import '@parky/ui/src/app/globals.css'
import { SessionProvider } from '@parky/ui/src/components/molecules/SessionProvider'
import { ApolloProvider } from '@parky/network/src/config/apollo'
import { MenuItem } from '@parky/util/types'
import { ToastContainer } from '@parky/ui/src/components/molecules/Toast'
import { Container } from '@parky/ui/src/components/atoms/Container'
import { Providers } from './providers'
import HeaderWithTranslation from './HeaderWithTranslation'

const font = Nunito({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font',
})

export const metadata: Metadata = {
  title: 'Parky',
  description: 'Valet parking management and reservation application',
}

const MENUITEMS: MenuItem[] = [
  { label: 'search-label', href: '/search' },
  { label: 'bookings-label', href: '/bookings' },
]

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <Providers>
        <SessionProvider>
          <ApolloProvider>
            <body className={`${font.variable} font-sans`}>
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
