import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@parky/ui/src/app/globals.css'
import ClientLayout from './ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parky',
  description: 'Valet parking management and reservation application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-25`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
