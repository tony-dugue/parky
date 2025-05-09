import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { BookingsForGarageQuery } from '@parky/network/src/gql/generated'
import { TitleStrongValue, TitleValue } from '../atoms/TitleValue'
import { Reveal } from '../molecules/Reveal'
import { StartEndDateCard } from './DateCard'
import { Accordion } from '../atoms/Accordion'

export interface IManageBookingCardProps {
  booking: BookingsForGarageQuery['bookingsForGarage'][0]
}

export const ManageBookingCard = ({ booking }: IManageBookingCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="p-4 space-y-3 bg-white ">
      <div className="flex items-start justify-between">
        <TitleStrongValue title={t('message.vehicle-number')}>
          <div className="text-3xl font-bold">{booking.vehicleNumber}</div>
        </TitleStrongValue>
        <div className="px-1 py-0.5 border border-primary">
          <TitleValue title={t('message.slot')}>
            {booking.slot.displayName}
          </TitleValue>
        </div>
      </div>
      <TitleStrongValue title={t('message.status')}>
        <div className="font-bold">{booking.status.split('_').join(' ')}</div>
      </TitleStrongValue>

      <TitleStrongValue title={t('message.code')}>
        <Reveal showIntruction={false} secret={booking.passcode || ''} />
      </TitleStrongValue>

      <Accordion
        defaultOpen={false}
        title={
          <TitleStrongValue title={t('message.status')}>
            <div className="font-bold">
              {booking.status.split('_').join(' ')}
            </div>
          </TitleStrongValue>
        }
      >
        <div className="flex flex-col gap-2">
          {booking.bookingTimeline.map((timeline) => (
            <div key={timeline.timestamp}>
              <TitleValue title={timeline.status}>
                {format(new Date(timeline.timestamp), 'PPp')}
              </TitleValue>
            </div>
          ))}
        </div>
      </Accordion>

      <StartEndDateCard
        startTime={booking.startTime}
        endTime={booking.endTime}
      />
    </div>
  )
}
