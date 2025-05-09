'use client'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'

import { MyCompanyDocument } from '@parky/network/src/gql/generated'
import { LoaderPanel } from '../molecules/Loader'
import { AlertSection } from '../molecules/AlertSection'
import { CreateCompanyModal } from './modals/CreateCompanyModal'

type RenderPropChild = (id: number) => ReactNode

export const IsManager = ({
  children,
}: {
  children: RenderPropChild | ReactNode
}) => {
  const { t } = useTranslation()

  const { data, loading } = useQuery(MyCompanyDocument)

  if (loading) {
    return <LoaderPanel text={t('message.loading-company')} />
  }

  if (!data?.myCompany)
    return (
      <AlertSection title={t('message.no-company')}>
        <CreateCompanyModal />
      </AlertSection>
    )

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.myCompany.id)
        : children}
    </>
  )
}
