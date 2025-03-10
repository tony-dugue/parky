import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@parky/network/src/gql/generated'
import { useEffect } from 'react'
import { GarageMarker } from './GarageMarker'
import { FormTypeSearchGarage } from '@parky/forms/src/searchGarages'
import { useFormContext } from 'react-hook-form'

export const ShowGarages = () => {
  const [searchGarages, { data }] = useLazyQuery(SearchGaragesDocument)

  const { watch } = useFormContext<FormTypeSearchGarage>()
  const { endTime: end, startTime: start, locationFilter } = watch()

  useEffect(() => {
    searchGarages({ variables: { dateFilter: { end, start }, locationFilter } })
  }, [end, locationFilter, searchGarages, start])

  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}
