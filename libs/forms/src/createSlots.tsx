import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { formSchemaCreateSlot } from './createGarage'

export type FormTypeCreateManySlots = z.infer<
  ReturnType<typeof formSchemaCreateSlot>
>

export const useFormCreateManySlots = () => {
  const { t } = useTranslation()
  return useForm<FormTypeCreateManySlots>({
    resolver: zodResolver(formSchemaCreateSlot(t)),
  })
}
