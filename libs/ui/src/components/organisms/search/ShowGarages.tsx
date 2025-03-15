import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@parky/network/src/gql/generated'
import { useEffect } from 'react'
import { GarageMarker } from './GarageMarker'
import { useConvertSearchFormToVariables } from '@parky/forms/src/adapters/searchFormAdapter'

export const ShowGarages = () => {
  const [searchGarages, { data }] = useLazyQuery(SearchGaragesDocument)

  const { variables } = useConvertSearchFormToVariables()

  useEffect(() => {
    if (variables) {
      searchGarages({ variables })
    }
  }, [searchGarages, variables])

  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}
