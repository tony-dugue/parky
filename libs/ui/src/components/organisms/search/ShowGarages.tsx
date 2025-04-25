import { useLazyQuery } from '@apollo/client'
import {
  SearchGaragesDocument,
  SearchGaragesQueryVariables,
} from '@parky/network/src/gql/generated'
import { useEffect, useRef } from 'react'
import { GarageMarker } from './GarageMarker'
import { useConvertSearchFormToVariables } from '@parky/forms/src/adapters/searchFormAdapter'
import { Panel } from '../map/Panel'
import { Loader } from '../../molecules/Loader'
import { IconInfoCircle } from '@tabler/icons-react'

export const ShowGarages = () => {
  const { variables, debouncing } = useConvertSearchFormToVariables()

  const [searchGarages, { loading: garagesLoading, data, previousData }] =
    useLazyQuery(SearchGaragesDocument)

  const prevVariablesRef = useRef<SearchGaragesQueryVariables | null>(null)

  useEffect(() => {
    if (
      variables &&
      JSON.stringify(variables) !== JSON.stringify(prevVariablesRef.current)
    ) {
      prevVariablesRef.current = variables
      searchGarages({ variables })
    }
  }, [variables, searchGarages])

  const garages = data?.searchGarages || previousData?.searchGarages || []
  const loading = debouncing || garagesLoading

  if (!loading && garages.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle />
          <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    )
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : null}
      {garages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}
