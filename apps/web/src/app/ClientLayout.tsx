'use client'

import dynamic from 'next/dynamic'
import { SessionProvider } from '@parky/ui/src/components/molecules/SessionProvider'
import { ApolloProvider } from '@parky/network/src/config/apollo'
import { MenuItem } from '@parky/util/types'
import { ToastContainer } from '@parky/ui/src/components/molecules/Toast'

// Charger Header uniquement côté client
const Header = dynamic(
  () =>
    import('@parky/ui/src/components/organisms/Header').then(
      (mod) => mod.Header,
    ),
  { ssr: false },
)

const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Bookings', href: '/bookings' },
  { label: 'About', href: '/about' },
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ApolloProvider>
        <Header menuItems={MENUITEMS} />
        {children}
        <ToastContainer />
      </ApolloProvider>
    </SessionProvider>
  )
}
