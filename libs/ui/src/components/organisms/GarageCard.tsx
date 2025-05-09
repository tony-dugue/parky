import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { GaragesQuery } from '@parky/network/src/gql/generated'
import { AutoImageChanger } from './AutoImageChanger'
import { IconTypes } from '../molecules/IconTypes'
import { CreateManySlotsModal } from './modals/CreateManySlotsModal'

export interface IGarageCardProps {
  garage: GaragesQuery['garages'][number]
}

export const GarageCard = ({ garage }: IGarageCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden bg-white flex flex-col">
      <AutoImageChanger images={garage.images || []} durationPerImage={5000} />

      <div className="p-2 flex-grow flex flex-col gap-4">
        <div>
          <div className="flex justify-between ">
            <h3 className="font-semibold text-md">{garage.displayName}</h3>
            <Link
              className="text-md underline underline-offset-4"
              href={{ pathname: 'bookings', query: { garageId: garage.id } }}
            >
              {t('button.bookings')}
            </Link>
          </div>
          <p className="text-md font-light text-gray-400 mt-2 mb-3">
            {garage.address?.address}
          </p>
          <p className="text-gray-500 text-md font-light my-1 line-clamp-2 ">
            {garage.description}
          </p>
        </div>
        <div className="flex gap-2 mt-auto">
          <>
            {garage.slotCounts.map((slotType) => (
              <div
                key={slotType.type}
                className="flex items-center justify-center w-16 h-10 gap-1 border-2 border-primary"
              >
                <div>{IconTypes[slotType.type]}</div>
                <div className="text-sm">{slotType.count}</div>
              </div>
            ))}
            <CreateManySlotsModal garageId={garage.id} />
          </>
        </div>
      </div>
    </div>
  )
}
