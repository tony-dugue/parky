'use client'
import { useEffect, useMemo, useRef } from 'react'
import Map, { Marker, Source, Layer, MapRef } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

import type { LatLng } from '@parky/util/types'

export const StaticMapDirections = ({
  start,
  end,
  padding = [100, 100, 100],
  coordinates,
  className = 'w-full shadow-xl aspect-square',
}: {
  start: LatLng
  end: LatLng
  padding?: [number, number, number]
  coordinates: [number, number][]
  className?: string
}) => {
  const mapRef = useRef<MapRef>(null)

  const routeGeoJSON = useMemo(
    () =>
      ({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
        },
        properties: {},
      }) as const,
    [coordinates],
  )

  const bounds = useMemo(() => {
    if (!coordinates.length) return undefined
    const lons = coordinates.map((c) => c[0])
    const lats = coordinates.map((c) => c[1])
    const minLng = Math.min(...lons)
    const maxLng = Math.max(...lons)
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ] as [[number, number], [number, number]]
  }, [coordinates])

  useEffect(() => {
    if (!mapRef.current || !bounds) return
    mapRef.current.fitBounds(bounds, {
      padding: {
        top: padding[0],
        right: padding[1],
        bottom: padding[2],
        left: padding[1],
      },
      duration: 0, // instantané, comme une image
    })
  }, [bounds, padding])

  if (!coordinates.length || !bounds) {
    return <div className="w-full bg-gray-100 shadow-xl aspect-square" />
  }

  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: start.lng,
          latitude: start.lat,
          zoom: 14,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
        interactive={false}
        attributionControl={false}
      >
        <Source id="route" type="geojson" data={routeGeoJSON}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              'line-color': '#000',
              'line-width': 4,
            }}
          />
        </Source>

        <Marker longitude={start.lng} latitude={start.lat} color="green" />
        <Marker longitude={end.lng} latitude={end.lat} color="red" />
      </Map>
    </div>
  )
}
