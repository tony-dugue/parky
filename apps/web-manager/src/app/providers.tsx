'use client'
import '@parky/i18n/i18n'
import { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>
}
