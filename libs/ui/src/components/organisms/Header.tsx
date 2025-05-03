'use client'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { BaseComponent, MenuItem, Role } from '@parky/util/types'
import { Container } from '../atoms/Container'
import { Button } from '../atoms/Button'
import { NavSidebar } from './NavSidebar'
import { Menus } from './Menus'
import { LanguageSwitcher } from './LanguageSwitcher'
import LogoParkySvgIcon1 from '../atoms/logos/Logo1'

export type IHeaderProps = {
  type?: Role
  menuItems: MenuItem[]
} & BaseComponent

export const Header = ({ type, menuItems }: IHeaderProps) => {
  const session = useSession()
  const { t } = useTranslation()
  const uid = session?.data?.user?.uid

  return (
    <header>
      <nav className="fixed width-full z-40 w-full shadow-sm bg-white">
        <div className="py-4 border-b-[1px]">
          <Container className="relative flex items-center justify-between gap-16">
            <Link href="/" aria-label="Home" className="w-auto z-50 flex">
              {/*<Brand type={type} className="hidden h-10 sm:block" />*/}
              {/*<Brand type={type} shortForm className="block sm:hidden" />*/}
              <LogoParkySvgIcon1 width="150" height="30" />
              {type ? (
                <span className="text-xs content-end">{type}</span>
              ) : null}
            </Link>
            <div className="flex items-center gap-2">
              {uid ? (
                <div className="flex gap-6 items-center">
                  <div className="text-sm mr-6 flex gap-3">
                    <Menus menuItems={menuItems} />
                  </div>
                  <LanguageSwitcher />
                  <NavSidebar menuItems={menuItems} />
                </div>
              ) : (
                <>
                  <LanguageSwitcher />
                  <Link href="/register">
                    <Button variant="outlined" className="hidden md:block">
                      {t('button.register')}
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button>{t('button.login')}</Button>
                  </Link>
                </>
              )}
            </div>
          </Container>
        </div>
      </nav>
      <div className="h-16" />
    </header>
  )
}
