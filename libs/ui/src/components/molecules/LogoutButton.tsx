'use client'
import { IconDoorExit } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { signOut } from 'next-auth/react'

import { Button } from '../atoms/Button'

export const LogoutButton = () => {
  const { t } = useTranslation()

  return (
    <Button
      variant="outlined"
      onClick={() => {
        signOut()
      }}
      className="flex items-center gap-2"
    >
      <IconDoorExit /> {t('auth.logout')}
    </Button>
  )
}
