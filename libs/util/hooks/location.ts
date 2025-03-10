import { useEffect, useState } from 'react'
import { LocationInfo } from '../types'
import { useDebounce } from './async'

export const useSearchLocation = () => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [locationInfo, setLocationInfo] = useState<LocationInfo[]>(() => [])

  const debouncedSearchText = useDebounce(searchText, 400)

  useEffect(() => {
    setLoading(true)

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const filtered = data?.map((x: any) => ({
          placeName: x.display_name,
          latLng: [x.lat, x.lon],
        }))

        setLocationInfo(filtered)
      })
      .finally(() => setLoading(false))
  }, [debouncedSearchText])
  return { loading, setLoading, searchText, setSearchText, locationInfo }
}
