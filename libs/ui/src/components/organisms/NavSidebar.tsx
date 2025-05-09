'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

import { useDialogState } from '@parky/util/hooks/dialog'
import { MenuItem } from '@parky/util/types'
import { LogoutButton } from '../molecules/LogoutButton'
import { UserInfo } from '../molecules/UserInfo'
import { Menus } from './Menus'
import { Sidebar } from './Sidebar'

export interface INavSidebarProps {
  menuItems: MenuItem[]
}

export const NavSidebar = ({ menuItems }: INavSidebarProps) => {
  const { t } = useTranslation()

  const [open, setOpen] = useDialogState()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className="p-2"
        aria-label={t('message.open-main-menu')}
      >
        <AiOutlineMenu className="w-5 h-5" />
      </button>
      <Sidebar open={open} setOpen={setOpen}>
        <div className="flex flex-col items-start space-y-1">
          <UserInfo className="mb-4" />
          <Menus menuItems={menuItems} />
        </div>
        <div className=" mt-auto">
          <LogoutButton />
        </div>
      </Sidebar>
    </>
  )
}
