import { useFormCreateValet } from '@parky/forms/src/createValet'
import { useState } from 'react'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'
import { Form } from '../atoms/Form'
import { ImagePreview } from './ImagePreview'
import { Controller } from 'react-hook-form'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlLabel } from '../atoms/HtmlLabel'
//import { useCloudinaryUpload } from '@parky/util/hooks/cloudinary'
import { useLocalFileUpload } from '@parky/util/hooks/fileUpload'
import { useMutation } from '@apollo/client'
import {
  CreateValetDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { toast } from '../molecules/Toast'
import { useTranslation } from 'react-i18next'

export const AddValet = () => {
  const { t } = useTranslation()
  const {
    register,
    resetField,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormCreateValet()
  const [open, setOpen] = useState(false)
  const { image } = watch()

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

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{t('button.create-valet')}</Button>
      <Dialog
        widthClassName="max-w-xl"
        open={open}
        setOpen={setOpen}
        title={t('button.create-valet')}
      >
        <Form
          onSubmit={handleSubmit(async ({ image, ...data }) => {
            const images = await upload(image)
            await createValet({
              variables: { createValetInput: { ...data, image: images[0] } },
            })
          })}
        >
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

          <Button loading={uploading || loading} type="submit">
            {t('button.create')}
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
