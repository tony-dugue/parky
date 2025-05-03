'use client'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'

import { ValetMeDocument } from '@parky/network/src/gql/generated'
import { LoaderPanel } from '../molecules/Loader'
import { AlertSection } from '../molecules/AlertSection'

type RenderPropChild = (id: number) => ReactNode

export const IsValet = ({
  children,
  uid,
}: {
  children: RenderPropChild | ReactNode
  uid: string
}) => {
  const { t } = useTranslation()

  const { data, loading } = useQuery(ValetMeDocument)

  if (loading) {
    return <LoaderPanel text={t('message.loading-company')} />
  }

  if (!data?.valetMe?.companyId)
    return (
      <AlertSection>
        <div>{t('message.not-a-valet-1')}</div>
        <div>{t('message.not-a-valet-2')}</div>
        <div>{uid}</div>
      </AlertSection>
    )

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.valetMe.companyId)
        : children}
    </>
  )
}
