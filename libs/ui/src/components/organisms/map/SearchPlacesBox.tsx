import { LocationInfo, ViewState } from '@parky/util/types'
import { useMap } from 'react-map-gl/maplibre'
import { Autocomplete } from '../../atoms/Autocomplete'
import { useSearchLocation } from '@parky/util/hooks/location'
import { majorCitiesLocationInfo } from '@parky/util/constants'

export const SearchPlaceBox = ({
  onLocationChange,
}: {
  onLocationChange?: (location: ViewState) => void
}) => {
  const { current: map } = useMap()
  const { loading, locationInfo, searchText, setLoading, setSearchText } =
    useSearchLocation()

  return (
    <Autocomplete<LocationInfo>
      options={locationInfo?.length ? locationInfo : majorCitiesLocationInfo}
      isOptionEqualToValue={(option, value) =>
        option.placeName === value.placeName
      }
      noOptionsText={searchText ? 'No options.' : 'Type something...'}
      getOptionLabel={(x) => x.placeName}
      onInputChange={(_, v) => {
        setLoading(true)
        setSearchText(v)
      }}
      loading={loading}
      onChange={async (_, v) => {
        if (v) {
          const { latLng } = v
          await map?.flyTo({
            center: { lat: latLng[0], lng: latLng[1] },
            zoom: 12,
            // essential: true,
          })
          if (onLocationChange) {
            onLocationChange({ latitude: latLng[0], longitude: latLng[1] })
          }
        }
      }}
    />
  )
}
