'use client'
import { IconDoorExit } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import { Button } from '../atoms/Button'
import { useTranslation } from 'react-i18next'

export const LogoutButton = () => {
  const { t } = useTranslation()

  return (
    <Button
      variant="outlined"
      onClick={() => {
        signOut()
      }}
      className="flex gap-2"
    >
      <IconDoorExit /> {t('auth.logout')}
    </Button>
  )
}
