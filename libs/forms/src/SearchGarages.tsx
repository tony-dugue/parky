import { SlotType } from '@parky/network/src/gql/generated'
import { z } from 'zod'
import { toLocalISOString } from '@parky/util/date'
import { ReactNode } from 'react'
import { DefaultValues, useForm, FormProvider, Form } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEndTimeValid, isStartTimeValid } from './util'
import { useTranslation } from 'react-i18next'

type Translator = (key: string) => string

const minMaxTuple = z.tuple([z.number(), z.number()])

export const formSchemaSearchGarage = (t: Translator) =>
  z
    .object({
      startTime: z.string(),
      endTime: z.string(),

      locationFilter: z.object({
        ne_lat: z.number(),
        ne_lng: z.number(),
        sw_lat: z.number(),
        sw_lng: z.number(),
      }),

      types: z.nativeEnum(SlotType).array(),

      pricePerHour: minMaxTuple.optional(),
      height: minMaxTuple.optional(),
      width: minMaxTuple.optional(),
      length: minMaxTuple.optional(),

      skip: z.number().optional(),
      take: z.number().optional(),
    })
    .refine(({ startTime }) => isStartTimeValid(startTime), {
      message: t('form.validation.start-time-invalid'),
      path: ['startTime'],
    })
    .refine(
      ({ endTime, startTime }) => isEndTimeValid({ endTime, startTime }),
      {
        message: t('form.validation.end-time-invalid'),
        path: ['endTime'],
      },
    )

export type FormTypeSearchGarage = z.infer<
  ReturnType<typeof formSchemaSearchGarage>
>

export const getCurrentTimeAndOneHourLater = () => {
  const startTime = new Date()
  startTime.setMinutes(startTime.getMinutes() + 5)

  const endTime = new Date(startTime)
  endTime.setHours(endTime.getHours() + 1)

  return {
    startTime: toLocalISOString(startTime).slice(0, 16),
    endTime: toLocalISOString(endTime).slice(0, 16),
  }
}

export const AllSlotTypes = [
  SlotType.Bicycle,
  SlotType.Bike,
  SlotType.Car,
  SlotType.Heavy,
]

export const formDefaultValuesSearchGarages: DefaultValues<FormTypeSearchGarage> =
  {
    pricePerHour: [0, 200],
    width: [0, 20],
    height: [0, 100],
    length: [0, 100],
    types: AllSlotTypes.sort(),
  }

export const FormProviderSearchGarage = ({
  children,
}: {
  children: ReactNode
}) => {
  const { startTime, endTime } = getCurrentTimeAndOneHourLater()
  const { t } = useTranslation()

  const methods = useForm<FormTypeSearchGarage>({
    resolver: zodResolver(formSchemaSearchGarage(t)),
    defaultValues: {
      ...formDefaultValuesSearchGarages,
      startTime,
      endTime,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
