import { SearchGaragesQueryVariables } from '@parky/network/src/gql/generated'
import { FormTypeSearchGarage } from '../searchGarages'
import { useState, useEffect } from 'react'
import { FieldNamesMarkedBoolean, useFormContext } from 'react-hook-form'
import { useDebounce } from '@parky/util/hooks/async'
import { intFilter } from './util'

type FormData = Partial<
  Pick<
    FormTypeSearchGarage,
    | 'endTime'
    | 'startTime'
    | 'height'
    | 'length'
    | 'width'
    | 'pricePerHour'
    | 'types'
    | 'locationFilter'
    | 'skip'
    | 'take'
  >
>

export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] =
    useState<SearchGaragesQueryVariables | null>(null)
  const {
    formState: { dirtyFields },
    watch,
  } = useFormContext<FormTypeSearchGarage>()
  const formData = watch()
  const debouncedFormData = useDebounce(formData, 1000)

  useEffect(() => {
    const {
      endTime,
      startTime,
      locationFilter,
      length,
      width,
      height,
      pricePerHour,
      types,
      skip,
      take,
    } = debouncedFormData

    const dateFilter: SearchGaragesQueryVariables['dateFilter'] = {
      start: startTime,
      end: endTime,
    }

    const slotsFilter = createSlotsFilter(dirtyFields, {
      length,
      width,
      height,
      pricePerHour,
      types,
    })

    const garagesFilter = createGaragesFilter(dirtyFields, { skip, take })

    const newVariables = {
      dateFilter,
      locationFilter,
      ...(Object.keys(slotsFilter).length && { slotsFilter }),
      ...(Object.keys(garagesFilter).length && { garagesFilter }),
    }

    // Vérifie si les nouvelles variables sont différentes des anciennes
    setVariables((prevVariables) => {
      if (JSON.stringify(prevVariables) !== JSON.stringify(newVariables)) {
        return newVariables
      }
      return prevVariables
    })
  }, [debouncedFormData, dirtyFields])

  return { variables }
}

export const createSlotsFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: FormData,
) => {
  const length = dirtyFields.length && intFilter(formData.length)
  const width = dirtyFields.width && intFilter(formData.width)
  const height = dirtyFields.height && intFilter(formData.height)
  const pricePerHour =
    dirtyFields.pricePerHour && intFilter(formData.pricePerHour)
  const type = dirtyFields.types && { in: formData.types }

  return {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
    ...(pricePerHour && { pricePerHour }),
    ...(type && { type }),
  }
}

export const createGaragesFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: FormData,
) => {
  const skip = (dirtyFields.skip && formData.skip) || 0
  const take = (dirtyFields.take && formData.take) || 10

  return {
    ...(skip && { skip }),
    ...(take && { take }),
  }
}
