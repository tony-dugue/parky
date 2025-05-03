'use client'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { AdminMeDocument } from '@parky/network/src/gql/generated'
import { useQuery } from '@apollo/client'
import { LoaderPanel } from '../molecules/Loader'
import { AlertSection } from '../molecules/AlertSection'

export const IsAdmin = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation()

  const { data, loading } = useQuery(AdminMeDocument)

  if (loading) {
    return <LoaderPanel text={t('message.loading-company')} />
  }

  if (!data?.adminMe?.uid)
    return (
      <AlertSection>
        <div>{t('auth.not-an-admin')}</div>
      </AlertSection>
    )

  return <>{children}</>
}
