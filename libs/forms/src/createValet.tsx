import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

type Translator = (key: string) => string

export const schemaCreateValet = (t: Translator) =>
  z.object({
    uid: z
      .string()
      .min(1, { message: t('form.validation.valet-uid-required') }),
    displayName: z
      .string()
      .min(1, { message: t('form.validation.valet-name-required') }),
    licenceID: z
      .string()
      .min(1, { message: t('form.validation.valet-licence-required') }),
    image: z.any().optional(),
  })

export type FormTypeCreateValet = z.infer<ReturnType<typeof schemaCreateValet>>

export const useFormCreateValet = () => {
  const { t } = useTranslation()

  return useForm<FormTypeCreateValet>({
    resolver: zodResolver(schemaCreateValet(t)),
  })
}
