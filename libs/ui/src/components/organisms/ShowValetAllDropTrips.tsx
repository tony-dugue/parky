import { useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import {
  BookingStatus,
  ValetDropsDocument,
} from '@parky/network/src/gql/generated'
import { useTakeSkip } from '@parky/util/hooks/pagination'
import { ShowData } from './ShowData'
import { ValetTripCard } from './ValetTripCard'
import { AssignValetButton } from './AssignValetButton'

export const ShowValetAllDropTrips = () => {
  const { t } = useTranslation()
  const { loading, data } = useQuery(ValetDropsDocument)
  const { setSkip, setTake, skip, take } = useTakeSkip()
  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.valetDrops.length || 0,
        totalCount: data?.valetDropsTotal || 0,
      }}
    >
      {data?.valetDrops.map((booking) => (
        <ValetTripCard
          key={booking.id}
          booking={{
            id: booking.id,
            time: booking.endTime,
          }}
          end={{
            lat: booking.valetAssignment?.returnLat || undefined,
            lng: booking.valetAssignment?.returnLng || undefined,
          }}
          start={booking.slot.garage.address}
        >
          <AssignValetButton
            bookingId={booking.id}
            status={BookingStatus.ValetAssignedForCheckOut}
          >
            {t('button.accept')}
          </AssignValetButton>
        </ValetTripCard>
      ))}
    </ShowData>
  )
}
