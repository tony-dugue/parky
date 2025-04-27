import { Role } from '@parky/util/types'
import { BrandIcon } from './BrandIcon'
import { useTranslation } from 'react-i18next'

export interface IBrandProps {
  className?: string
  shortForm?: boolean
  type?: Role
}

export const Brand = ({
  shortForm = false,
  className,
  type = undefined,
}: IBrandProps) => {
  const { t } = useTranslation()

  return (
    <div className={`grid place-items-center z-50 ${className}`}>
      <div className="text-xl ">
        {shortForm ? (
          <div className="flex gap-1">
            <BrandIcon /> {t('brand.icon')}
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              <div className="flex gap-1">
                <div>{t('brand.name')}</div>
                {type ? <span className="text-xs">{type}</span> : null}
              </div>
              <div className="text-xs text-gray">{t('brand.description')}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
