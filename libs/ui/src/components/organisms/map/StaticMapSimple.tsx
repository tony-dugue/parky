'use client'
import Map, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

export const StaticMapSimple = ({
  position,
  className = 'w-full shadow-xl aspect-square',
}: {
  position: { lng: number; lat: number }
  className?: string
}) => {
  if (!position) {
    return <div className="w-full bg-gray-100 shadow-xl aspect-square" />
  }

  const { lng, lat } = position

  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <Map
        initialViewState={{ longitude: lng, latitude: lat, zoom: 15 }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
        interactive={false}
        attributionControl={false}
      >
        <Marker longitude={lng} latitude={lat} />
      </Map>
    </div>
  )
}
