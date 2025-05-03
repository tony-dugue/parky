import Link from 'next/link'

import { MenuItem } from '@parky/util/types'

export interface IMenuItemProps {
  menuItems: MenuItem[]
}

export const Menus = ({ menuItems }: IMenuItemProps) => {
  return (
    <>
      {menuItems.map(({ label, href }) => (
        <Link
          className="hover:underline underline-offset-8 transition-all "
          key={label}
          href={href}
        >
          {label}
        </Link>
      ))}
    </>
  )
}
