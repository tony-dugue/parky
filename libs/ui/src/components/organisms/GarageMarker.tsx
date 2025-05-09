import { useState } from 'react'
import { useWatch } from 'react-hook-form'

import { SearchGaragesQuery } from '@parky/network/src/gql/generated'
import { useKeypress } from '@parky/util/hooks/keys'
import { FormTypeSearchGarage } from '@parky/forms/src/searchGarages'
import { Marker } from './map/MapMarker'
import { ParkingIcon } from '../atoms/ParkingIcon'
import { BookSlotModal } from './modals/BookSlotModal'
import { FormProviderBookSlot } from '@parky/forms/src/bookSlot'

export const GarageMarker = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number]
}) => {
  const [showPopup, setShowPopup] = useState(false)

  useKeypress(['Escape'], () => setShowPopup(false))

  const { endTime, startTime } = useWatch<FormTypeSearchGarage>()

  if (!marker.address?.lat || !marker.address.lng) {
    return null
  }

  return (
    <>
      <FormProviderBookSlot defaultValues={{ endTime, startTime }}>
        <BookSlotModal
          garage={marker}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      </FormProviderBookSlot>

      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        <ParkingIcon />
      </Marker>
    </>
  )
}
