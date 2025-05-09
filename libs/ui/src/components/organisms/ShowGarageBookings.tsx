import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { TbSearch } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'

import {
  BookingStatus,
  BookingsForGarageDocument,
  QueryMode,
} from '@parky/network/src/gql/generated'
import { useTakeSkip } from '@parky/util/hooks/pagination'
import { ShowData } from './ShowData'
import { ManageBookingCard } from './ManageBookingCard'
import { CheckInOutButton } from './CheckInOutButtons'

export const ShowGarageBookings = ({
  garageId,
  statuses,
  showCheckIn = false,
  showCheckOut = false,
}: {
  garageId: number
  statuses: BookingStatus[]
  showCheckIn?: boolean
  showCheckOut?: boolean
}) => {
  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState('')
  const { take, setTake, skip, setSkip } = useTakeSkip()

  const { data, loading } = useQuery(BookingsForGarageDocument, {
    variables: {
      skip,
      take,
      where: {
        status: { in: statuses },
        Slot: {
          is: {
            garageId: { equals: garageId },
          },
        },
        ...(searchTerm && {
          vehicleNumber: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          },
        }),
      },
    },
  })

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <div className="flex justify-start items-center gap-2 w-full max-w-xl rounded-full shadow-lg bg-white border border-gray-25 px-4">
          <TbSearch className="text-2xl" />
          <input
            placeholder={t('form.placeholder.search-vehicle')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent"
          />
        </div>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.bookingsForGarage.length,
          totalCount: data?.bookingsCount.count,
          setSkip,
          setTake,
        }}
      >
        {data?.bookingsForGarage.map((booking) => (
          <div key={booking.id}>
            <ManageBookingCard booking={booking} />
            {showCheckIn ? (
              <CheckInOutButton
                status={BookingStatus.CheckedIn}
                buttonText={t('button.check-in')}
                bookingId={booking.id}
              />
            ) : null}
            {showCheckOut ? (
              <CheckInOutButton
                status={BookingStatus.CheckedOut}
                buttonText={t('button.check-in')}
                bookingId={booking.id}
              />
            ) : null}
          </div>
        ))}
      </ShowData>
    </div>
  )
}
