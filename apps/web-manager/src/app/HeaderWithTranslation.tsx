'use client'
import { useTranslation } from 'react-i18next'

import { Header } from '@parky/ui/src/components/organisms/Header'
import { MenuItem, Role } from '@parky/util/types'

export default function HeaderWithTranslation({
  type,
  menuItems,
}: {
  type: Role | undefined
  menuItems: MenuItem[]
}) {
  const { t } = useTranslation()

  const translatedMenuItems = menuItems.map((item) => ({
    ...item,
    label: t(`web-manager.general.menu-items.${item.label}`),
  }))

  return <Header menuItems={translatedMenuItems} type={type} />
}
