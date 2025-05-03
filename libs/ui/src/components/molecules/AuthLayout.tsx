'use client'
import { ReactNode } from 'react'
import { IconArrowBack } from '@tabler/icons-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { CarScene } from '@parky/3d/src/scenes/CarScene'
import { RotatingCamera } from '@parky/3d/src/components/camera/Rotating'
import { BrandIcon } from '../atoms/BrandIcon'
import { GoogleButton } from './GoogleButton'

export interface IAuthLayoutProps {
  children: ReactNode
  title: string
}

export const AuthLayout = ({ title, children }: IAuthLayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="relative h-[calc(100vh-4rem)]  ">
      <CarScene
        orbitControls={false}
        camera={<RotatingCamera />}
        hideAllComments
      />
      <div className=" flex flex-col justify-center items-center absolute top-0 bg-black/20 backdrop-blur-sm bottom-0">
        <div className="p-20 text-white">
          <div className="w-full max-w-lg mx-auto">
            <h1 className="flex items-center gap-2 mb-2 text-2xl mb-6">
              <BrandIcon /> <div>{title}</div>
            </h1>
            {children}
            <div className="mt-4 text-sm text-gray-300">
              <div className="flex flex-col items-center mb-4">
                <div className="mb-1 text-xs">{t('auth.continue-with')}</div>
                <GoogleButton />
              </div>
              <Link href="/" className="flex items-center gap-2 mt-6">
                <IconArrowBack className="w-4 h-4" /> {t('auth.back-home')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
