'use client'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t } = useTranslation()

  return (
    <main className="p-8">
      <div>{t('web.booking-failed.message')}</div>
    </main>
  )
}
