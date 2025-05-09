import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import {
  CreateAdminDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { useFormUid } from '@parky/forms/src/createUid'
import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Modal } from '../../atoms/Modal'

export const CreateAdminModal = () => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const { register, handleSubmit } = useFormUid()

  const [createAdmin, { loading }] = useMutation(CreateAdminDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.admins],
  })

  const onSubmit = handleSubmit(async ({ uid }) => {
    await createAdmin({
      variables: { createAdminInput: { uid } },
    })
    setOpen(false)
  })

  const bodyContent = (
    <Form>
      <HtmlLabel title={t('form.input.uid')}>
        <HtmlInput placeholder={t('form.input.uid')} {...register('uid')} />
      </HtmlLabel>
    </Form>
  )

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t('button.create-admin')}</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        actionLabel={t('button.create')}
        secondaryActionLabel={t('button.cancel')}
        secondaryAction={() => setOpen(false)}
        title={t('button.create-admin')}
        loading={loading}
        body={bodyContent}
      />
    </>
  )
}
