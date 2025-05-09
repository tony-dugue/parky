import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import {
  CreateValetDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { useFormCreateValet } from '@parky/forms/src/createValet'
import { useLocalFileUpload } from '@parky/util/hooks/fileUpload'
import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { ImagePreview } from './../ImagePreview'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
//import { useCloudinaryUpload } from '@parky/util/hooks/cloudinary'
import { toast } from '../../molecules/Toast'
import { Modal } from '../../atoms/Modal'

export const CreateValetModal = () => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const {
    register,
    resetField,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormCreateValet()

  const { image } = watch()

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const [createValet, { loading }] = useMutation(CreateValetDocument, {
    onCompleted() {
      toast(t('toast.valet-created'))
      reset()
      setOpen(false)
    },
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.companyValets],
  })

  //const { uploading, upload } = useCloudinaryUpload()
  const { uploading, upload } = useLocalFileUpload()

  const onSubmit = handleSubmit(async ({ image, ...data }) => {
    const images = await upload(image)
    await createValet({
      variables: { createValetInput: { ...data, image: images[0] } },
    })
  })

  const bodyContent = (
    <Form>
      <HtmlLabel title={t('form.title.uid')} error={errors.uid?.message}>
        <HtmlInput
          placeholder={t('form.placeholder.valet-uid')}
          {...register('uid')}
        />
      </HtmlLabel>

      <HtmlLabel
        title={t('form.title.name-valet')}
        error={errors.displayName?.message}
      >
        <HtmlInput
          placeholder={t('form.placeholder.name-valet')}
          {...register('displayName')}
        />
      </HtmlLabel>

      <HtmlLabel
        title={t('form.title.licence-id')}
        error={errors.licenceID?.message}
      >
        <HtmlInput
          placeholder={t('form.placeholder.licence-id')}
          {...register('licenceID')}
        />
      </HtmlLabel>

      <ImagePreview srcs={image} clearImage={() => resetField('image')}>
        <Controller
          control={control}
          name={`image`}
          render={({ field }) => (
            <HtmlInput
              type="file"
              accept="image/*"
              multiple={false}
              onChange={(e) => field.onChange(e?.target?.files)}
            />
          )}
        />
      </ImagePreview>
    </Form>
  )

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{t('button.create-valet')}</Button>

      <Modal
        //widthClassName="max-w-xl"
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        actionLabel={t('button.create')}
        secondaryActionLabel={t('button.cancel')}
        secondaryAction={() => setOpen(false)}
        title={t('button.create-valet')}
        loading={uploading || loading}
        body={bodyContent}
      />
    </div>
  )
}
