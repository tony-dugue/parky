import { TbCurrentLocation } from 'react-icons/tb'
import { useMap } from 'react-map-gl/maplibre'

import { Button } from '../../atoms/Button'

export const CurrentLocationButton = () => {
  const { current: map } = useMap()

  return (
    <Button
      variant="text"
      className="hover:bg-gray-200"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            map?.flyTo({ center: { lat: latitude, lng: longitude }, zoom: 10 })
          },
          (error) => {
            console.error(error)
          },
          { enableHighAccuracy: true, timeout: 20000 },
        )
      }}
    >
      <TbCurrentLocation className="stroke-1.5" />
    </Button>
  )
}
