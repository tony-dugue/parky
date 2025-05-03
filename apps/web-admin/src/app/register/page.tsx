'use client'
import { useTranslation } from 'react-i18next'

import { RegisterForm } from '@parky/ui/src/components/templates/RegisterForm'
import { AuthLayout } from '@parky/ui/src/components/molecules/AuthLayout'

export default function Page() {
  const { t } = useTranslation()

  return (
    <AuthLayout title={t('auth.register')}>
      <RegisterForm />
    </AuthLayout>
  )
}
