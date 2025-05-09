import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbPlus } from 'react-icons/tb'
import { useMutation } from '@apollo/client'

import {
  CreateManySlotsDocument,
  SlotType,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { useFormCreateManySlots } from '@parky/forms/src/createSlots'

import { Button } from '../../atoms/Button'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlSelect } from '../../atoms/HtmlSelect'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Form } from '../../atoms/Form'
import { toast } from '../../molecules/Toast'
import { Modal } from '../../atoms/Modal'

export const CreateManySlotsModal = ({ garageId }: { garageId: number }) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCreateManySlots()

  const [createManySlots, { loading }] = useMutation(CreateManySlotsDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.Garages],
    onCompleted() {
      setOpen(false)
      toast(t('toast.slots-created-successful'))
    },
    onError() {
      toast(t('toast.action-failed'))
    },
  })

  const onSubmit = handleSubmit(async ({ count, ...data }) => {
    await createManySlots({
      variables: { count, createSlotInput: { ...data, garageId } },
    })
  })

  const bodyContent = (
    <Form>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <HtmlLabel
          title={t('form.title.slot-type')}
          error={errors.type?.toString()}
        >
          <HtmlSelect
            placeholder={t('form.placeholder.slot-type')}
            {...register(`type`)}
          >
            {Object.values(SlotType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </HtmlSelect>
        </HtmlLabel>
        <HtmlLabel
          title={t('form.title.price-hr')}
          error={errors.pricePerHour?.message}
        >
          <HtmlInput
            type="number"
            placeholder={t('form.placeholder.price-per-hour')}
            {...register(`pricePerHour`, { valueAsNumber: true })}
          />
        </HtmlLabel>
        <HtmlLabel
          title={t('form.title.number-slots')}
          error={errors.count?.message}
        >
          <HtmlInput
            type="number"
            placeholder={t('form.placeholder.number-slots')}
            {...register(`count`, { valueAsNumber: true })}
          />
        </HtmlLabel>

        <HtmlLabel
          title={t('form.title.length')}
          error={errors.length?.message}
        >
          <HtmlInput
            type="number"
            placeholder={t('form.placeholder.length')}
            {...register('length', { valueAsNumber: true })}
          />
        </HtmlLabel>

        <HtmlLabel title={t('form.title.width')} error={errors.width?.message}>
          <HtmlInput
            type="number"
            placeholder={t('form.placeholder.width')}
            {...register(`width`, { valueAsNumber: true })}
          />
        </HtmlLabel>

        <HtmlLabel
          title={t('form.title.height')}
          error={errors.height?.message}
        >
          <HtmlInput
            type="number"
            placeholder={t('form.placeholder.height')}
            {...register(`height`, { valueAsNumber: true })}
          />
        </HtmlLabel>
      </div>
    </Form>
  )

  return (
    <>
      <Button size="none" onClick={() => setOpen(true)} className="h-10">
        <TbPlus className="w-7 h-7 p-1.5 text-black" />
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        actionLabel={t('button.create')}
        secondaryActionLabel={t('button.cancel')}
        secondaryAction={() => setOpen(false)}
        title={t('button.create-slots')}
        loading={loading}
        body={bodyContent}
      />
    </>
  )
}
