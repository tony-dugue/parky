'use client'
import { MyCompanyDocument } from '@parky/network/src/gql/generated'
import { useQuery } from '@apollo/client'
import { LoaderPanel } from '../molecules/Loader'
import { AlertSection } from '../molecules/AlertSection'
import { CreateCompany } from './CreateCompany'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

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
      <AlertSection>
        <div>{t('message.no-company')}</div>
        <CreateCompany />
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
