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
  title: 'Parky | Valet',
  description:
    'Valet parking management and reservation application - Valet space',
}

const MENUITEMS: MenuItem[] = [{ label: 'my-trips-label', href: '/my-trips' }]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-25`}>
        <Providers>
          <SessionProvider>
            <ApolloProvider>
              <HeaderWithTranslation menuItems={MENUITEMS} />
              <Container>{children}</Container>
            </ApolloProvider>
          </SessionProvider>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
