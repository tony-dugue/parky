import { useEffect, useState } from 'react'

import { LocationInfo } from '../types'
import { useDebounce } from './async'

export const useSearchLocation = () => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [locationInfo, setLocationInfo] = useState<LocationInfo[]>(() => [])

  const [debouncedSearchText] = useDebounce(searchText, 400)

  useEffect(() => {
    if (!debouncedSearchText) {
      setLocationInfo([])
      return
    }

    setLoading(true)

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedSearchText)}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const filtered = data?.map((x: any) => ({
          placeName: x.display_name,
          latLng: [x.lat, x.lon],
        }))
        setLocationInfo(filtered)
      })
      .catch((err) => {
        console.error('Error fetching location:', err)
        setLocationInfo([])
      })
      .finally(() => setLoading(false))
  }, [debouncedSearchText])

  return { loading, setLoading, searchText, setSearchText, locationInfo }
}
