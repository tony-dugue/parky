import { useEffect, useRef } from 'react'
import { useLazyQuery } from '@apollo/client'
import { IconInfoCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import {
  SearchGaragesDocument,
  SearchGaragesQueryVariables,
} from '@parky/network/src/gql/generated'
import { useConvertSearchFormToVariables } from '@parky/forms/src/adapters/searchFormAdapter'
import { GarageMarker } from './GarageMarker'
import { Panel } from '../map/Panel'
import { Loader } from '../../molecules/Loader'

export const ShowGarages = () => {
  const { t } = useTranslation()

  const { variables, debouncing } = useConvertSearchFormToVariables()

  const [
    searchGarages,
    { loading: garagesLoading, data, previousData, error },
  ] = useLazyQuery(SearchGaragesDocument)

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

  if (error) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>{error.message}</div>
        </div>
      </Panel>
    )
  }

  if (!loading && garages.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle />
          <div>{t('message.no-parking')}</div>
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
