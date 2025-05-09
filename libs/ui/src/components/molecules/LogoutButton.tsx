'use client'
import { TbDoorExit } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'
import { signOut } from 'next-auth/react'

import { Button } from '../atoms/Button'

export const LogoutButton = () => {
  const { t } = useTranslation()

  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={() => {
        signOut()
      }}
      className="flex items-center justify-center gap-2"
    >
      <TbDoorExit /> {t('auth.logout')}
    </Button>
  )
}
