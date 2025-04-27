'use client'
import { useTranslation } from 'react-i18next'
import { Header } from '@parky/ui/src/components/organisms/Header'
import { MenuItem } from '@parky/util/types'

export default function HeaderWithTranslation({
  menuItems,
}: {
  menuItems: MenuItem[]
}) {
  const { t } = useTranslation()

  const translatedMenuItems = menuItems.map((item) => ({
    ...item,
    label: t(`web-admin.general.menu-items.${item.label}`),
  }))

  return <Header menuItems={translatedMenuItems} />
}
