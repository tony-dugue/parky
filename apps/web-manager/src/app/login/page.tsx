'use client'
import { useTranslation } from 'react-i18next'

import { LoginForm } from '@parky/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@parky/ui/src/components/molecules/AuthLayout'

export default function Page() {
  const { t } = useTranslation()

  return (
    <AuthLayout title={t('auth.login')}>
      <LoginForm />
    </AuthLayout>
  )
}
