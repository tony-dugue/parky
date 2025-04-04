import { Role } from '@parky/util/types'
import { BrandIcon } from './BrandIcon'

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
  return (
    <div className={`grid place-items-center z-50 ${className}`}>
      <div className="text-xl ">
        {shortForm ? (
          <div className="flex gap-1">
            <BrandIcon /> P.
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              <div className="flex gap-1">
                <div>Parky</div>
                {type ? <span className="text-xs">{type}</span> : null}
              </div>
              <div className="text-xs text-gray">Book Parking Online</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
