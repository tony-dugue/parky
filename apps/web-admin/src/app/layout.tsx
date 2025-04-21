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
  title: 'Parky | Admin',
  description:
    'Valet parking management and reservation application - Admin space',
}

const MENUITEMS: MenuItem[] = [
  { label: 'Garages', href: '/' },
  { label: 'Admins', href: '/manage-admins' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-25`}>
        <SessionProvider>
          <ApolloProvider>
            <Header menuItems={MENUITEMS} />
            <Container>{children}</Container>
          </ApolloProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
