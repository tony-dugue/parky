'use client'
import { ReactNode } from 'react'
import '@parky/i18n/i18n'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>
}
