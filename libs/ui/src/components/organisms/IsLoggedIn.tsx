'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

import { LoaderPanel } from '../molecules/Loader'
import { AlertSection } from '../molecules/AlertSection'

type RenderPropChild = (uid: string) => ReactNode

export const IsLoggedIn = ({
  children,
  notLoggedIn,
}: {
  children: RenderPropChild | ReactNode
  notLoggedIn?: ReactNode
}) => {
  const { status, data } = useSession()
  const { t } = useTranslation()

  if (status === 'loading') {
    return <LoaderPanel text={t('message.loading-user')} />
  }

  if (!data?.user?.uid) {
    if (notLoggedIn) {
      return <>{notLoggedIn}</>
    } else {
      return (
        <AlertSection title={t('auth.not-logged-in')}>
          <Link href="/login">{t('auth.login')}</Link>
        </AlertSection>
      )
    }
  }

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.user.uid)
        : children}
    </>
  )
}
