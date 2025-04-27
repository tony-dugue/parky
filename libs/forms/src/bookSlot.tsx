import { SlotType } from '@parky/network/src/gql/generated'
import { z } from 'zod'
import { isEndTimeValid, isStartTimeValid } from './util'
import { DefaultValues, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Translator = (key: string) => string

export const locationInfo = z.object({
  lat: z.number(),
  lng: z.number(),
  distance: z.number().optional(),
  notes: z.string().optional(),
})

export const formSchemaValet = z.object({
  pickupInfo: locationInfo,
  dropoffInfo: locationInfo,
  differentLocations: z.boolean().optional(),
})

export const buildFormSchemaBookSlot = (t: Translator) =>
  z
    .object({
      startTime: z.string(),
      endTime: z.string(),
      vehicleNumber: z.string().min(1, {
        message: t('form.validation.vehicule-number-required'),
      }),
      phoneNumber: z.string().min(1, {
        message: t('form.validation.phone-number-required'),
      }),
      type: z.nativeEnum(SlotType, {
        required_error: t('form.validation.slot-type-required'),
      }),
      valet: formSchemaValet.optional(),
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

export type FormTypeBookSlot = z.infer<
  ReturnType<typeof buildFormSchemaBookSlot>
>

export const userFormBookSlot = ({
  defaultValues,
}: {
  defaultValues: DefaultValues<FormTypeBookSlot>
}) => {
  const { t } = useTranslation()

  return useForm<FormTypeBookSlot>({
    resolver: zodResolver(buildFormSchemaBookSlot(t)),
    defaultValues,
    mode: 'onChange',
  })
}

export const FormProviderBookSlot = ({
  children,
  defaultValues,
}: {
  children: ReactNode
  defaultValues: DefaultValues<FormTypeBookSlot>
}) => {
  const methods = userFormBookSlot({ defaultValues })

  return <FormProvider {...methods}>{children}</FormProvider>
}
