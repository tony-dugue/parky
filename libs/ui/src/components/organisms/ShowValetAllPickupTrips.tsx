import { ValetPickupsDocument } from '@parky/network/src/gql/generated'
import { useQuery } from '@apollo/client'
import { useTakeSkip } from '@parky/util/hooks/pagination'
import { ShowData } from './ShowData'
import { ValetTripCard } from './ValetTripCard'

export const ShowValetAllPickupTrips = () => {
  const { loading, data } = useQuery(ValetPickupsDocument)
  const { setSkip, setTake, skip, take } = useTakeSkip()
  console.log(setSkip, setTake, skip, take)
  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.valetPickups.length || 0,
        totalCount: data?.valetPickupsTotal || 0,
      }}
    >
      {data?.valetPickups.map((booking) => (
        <ValetTripCard
          key={booking.id}
          booking={{
            id: booking.id,
            time: booking.startTime,
          }}
          start={{
            lat: booking.valetAssignment?.pickupLat,
            lng: booking.valetAssignment?.pickupLng,
          }}
          end={booking.slot.garage.address}
        ></ValetTripCard>
      ))}
    </ShowData>
  )
}
