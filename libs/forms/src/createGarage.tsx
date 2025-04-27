import { SlotType } from '@parky/network/src/gql/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Translator = (key: string) => string

export const formSchemaAddress = (t: Translator) =>
  z.object({
    lat: z.number(),
    lng: z.number(),
    address: z
      .string()
      .min(1, { message: t('form.validation.address-required') }),
  })

export const formSchemaCreateSlot = (t: Translator) =>
  z.object({
    height: z.number({
      invalid_type_error: t('form.validation.number-invalid'),
    }),
    width: z.number({
      invalid_type_error: t('form.validation.number-invalid'),
    }),
    length: z.number({
      invalid_type_error: t('form.validation.number-invalid'),
    }),
    pricePerHour: z.number({
      invalid_type_error: t('form.validation.number-invalid'),
    }),
    count: z
      .number({ invalid_type_error: t('form.validation.number-invalid') })
      .min(1, { message: t('form.validation.minimum-count') })
      .max(10, { message: t('form.validation.maximum-count') }),
    type: z.nativeEnum(SlotType),
  })

export const formSchemaCreateGarage = (t: Translator) =>
  z.object({
    displayName: z
      .string()
      .min(1, { message: t('form.validation.display-name-required') }),
    description: z
      .string()
      .min(1, { message: t('form.validation.description-required') }),
    images: z.any(),
    location: formSchemaAddress(t),
    slotTypes: z.array(formSchemaCreateSlot(t)),
  })

export type FormTypeCreateGarage = z.infer<
  ReturnType<typeof formSchemaCreateGarage>
>

export const useFormCreateGarage = () => {
  const { t } = useTranslation()
  return useForm<FormTypeCreateGarage>({
    resolver: zodResolver(formSchemaCreateGarage(t)),
    defaultValues: { slotTypes: [] },
  })
}

export const FormProviderCreateGarage = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateGarage()
  return <FormProvider {...methods}>{children}</FormProvider>
}
