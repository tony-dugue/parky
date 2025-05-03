import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'

import '@parky/ui/src/app/globals.css'
import { SessionProvider } from '@parky/ui/src/components/molecules/SessionProvider'
import { ApolloProvider } from '@parky/network/src/config/apollo'
import { MenuItem } from '@parky/util/types'
import { ToastContainer } from '@parky/ui/src/components/molecules/Toast'
import { Container } from '@parky/ui/src/components/atoms/Container'
import { Providers } from './providers'
import HeaderWithTranslation from './HeaderWithTranslation'

const font = Lexend({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font',
})

export const metadata: Metadata = {
  title: 'Parky | Admin',
  description:
    'Valet parking management and reservation application - Admin space',
}

type RootLayoutProps = {
  children: ReactNode
}
const MENUITEMS: MenuItem[] = [
  { label: 'garages-label', href: '/' },
  { label: 'admins-label', href: '/manage-admins' },
]

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans`}>
        <Providers>
          <SessionProvider>
            <ApolloProvider>
              <HeaderWithTranslation menuItems={MENUITEMS} type="admin" />
              <Container>{children}</Container>
            </ApolloProvider>
          </SessionProvider>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
