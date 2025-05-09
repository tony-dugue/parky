import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { BaseComponent } from '@parky/util/types'

export const UserInfo = ({ children, className }: BaseComponent) => {
  const session = useSession()
  const image = session.data?.user?.image
  const name = session.data?.user?.name
  const uid = session.data?.user?.uid

  return (
    <div className={`flex gap-2 ${className}`}>
      <Image
        src={
          image ? process.env.NEXT_PUBLIC_API_URL_UPLOAD + image : '/user.png'
        }
        alt=""
        width={300}
        height={300}
        className="w-16 h-16 object-cover border"
      />
      <div>
        <div>{name}</div>
        <div className="text-sm text-gray">{uid}</div>
      </div>
      {children}
    </div>
  )
}
