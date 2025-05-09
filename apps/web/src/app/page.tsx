'use client'
import { TbSearch } from 'react-icons/tb'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { CarScene } from '@parky/3d/src/scenes/CarScene'

export default function Home() {
  const { t } = useTranslation()

  return (
    <main className="h-[calc(100vh-4rem)] ">
      <div className="absolute top-16 bottom-0 left-0 right-0">
        <CarScene />
      </div>

      <div className="flex flex-col items-start space-y-2 font-black text-7xl">
        <div className="z-10 inline-block px-3 bg-primary mt-2">
          {t('web.homepage.search-cta-1')}
        </div>{' '}
        <div className="z-10 inline-block w-full max-w-md px-3 bg-primary ">
          {t('web.homepage.search-cta-2')}
        </div>
        <Link
          href="/search"
          className="z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium text-black underline underline-offset-4 bg-primary"
        >
          <TbSearch />
          {t('button.search-now')}
        </Link>
      </div>
    </main>
  )
}
