import { useDebounce } from '@parky/util/hooks/async'
import { LatLng, LngLatTuple } from '@parky/util/types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Source, Layer } from 'react-map-gl/maplibre'

export const Directions = ({
  origin,
  destination,
  setDistance,
  sourceId,
}: {
  origin?: LatLng
  destination?: Partial<LatLng>
  setDistance?: (distance?: number) => void
  sourceId: string
}) => {
  const [coordinates, setCoordinates] = useState<LngLatTuple[]>([])
  const prevDistanceRef = useRef<number | undefined>(undefined)

  const originDebounced = useDebounce(origin, 400)
  const destinationDebounced = useDebounce(destination, 400)
  const prevOriginRef = useRef<LatLng | undefined>(undefined)
  const prevDestinationRef = useRef<Partial<LatLng> | undefined>(undefined)

  // Transformer en string pour éviter la recréation d'objets qui déclenche useEffect
  const originKey = originDebounced
    ? `${originDebounced.lat},${originDebounced.lng}`
    : ''
  const destinationKey = destinationDebounced
    ? `${destinationDebounced.lat},${destinationDebounced.lng}`
    : ''

  useEffect(() => {
    if (
      !originDebounced ||
      !destinationDebounced ||
      (prevOriginRef.current &&
        prevOriginRef.current.lat === originDebounced.lat &&
        prevOriginRef.current.lng === originDebounced.lng &&
        prevDestinationRef.current &&
        prevDestinationRef.current.lat === destinationDebounced.lat &&
        prevDestinationRef.current.lng === destinationDebounced.lng)
    ) {
      return
    }

    prevOriginRef.current = originDebounced
    prevDestinationRef.current = destinationDebounced

    const controller = new AbortController()
    const { signal } = controller

    const fetchRoute = async () => {
      try {
        const url = `https://routing.openstreetmap.de/routed-foot/route/v1/foot/${originDebounced.lng},${originDebounced.lat};${destinationDebounced.lng},${destinationDebounced.lat}?overview=simplified&geometries=geojson&alternatives=false&steps=true`

        const response = await fetch(url, { signal })
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`)

        const data = await response.json()
        const newCoordinates = data?.routes?.[0]?.geometry?.coordinates || []
        const newDistance = data.routes?.[0]?.distance || 0

        // Mettre à jour seulement si les données sont différentes
        setCoordinates((prev) =>
          JSON.stringify(prev) !== JSON.stringify(newCoordinates)
            ? newCoordinates
            : prev,
        )

        if (newDistance !== prevDistanceRef.current && setDistance) {
          setDistance(newDistance)
          prevDistanceRef.current = newDistance
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du trajet :', error)
      }
    }

    fetchRoute()
  }, [originKey, destinationKey]) // Utilisation des clés pour éviter les références instables

  const dataOne = useMemo(
    () => ({
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates,
      },
    }),
    [coordinates],
  )

  return (
    <Source id={sourceId} type="geojson" data={dataOne}>
      <Layer
        id={sourceId}
        type="line"
        paint={{
          'line-color': 'rgb(0,0,0)',
          'line-width': 2,
        }}
      />
    </Source>
  )
}
