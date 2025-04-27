import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

type Translator = (key: string) => string

export const formSchemaCreateCompany = (t: Translator) =>
  z.object({
    displayName: z
      .string()
      .min(1, { message: t('form.validation.company-name-required') }),
    description: z.string().optional().nullable(),
    managerId: z
      .string()
      .min(1, { message: t('form.validation.manager-id-required') }),
    managerName: z.string().optional().nullable(),
  })

export type FormTypeCreateCompany = z.infer<
  ReturnType<typeof formSchemaCreateCompany>
>

export const useFormCreateCompany = () => {
  const { t } = useTranslation()

  return useForm<FormTypeCreateCompany>({
    resolver: zodResolver(formSchemaCreateCompany(t)),
  })
}
