import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import {
  CreateAdminDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { useFormUid } from '@parky/forms/src/createUid'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'

export const CreateAdmin = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { register, handleSubmit } = useFormUid()
  const [createAdmin, { loading }] = useMutation(CreateAdminDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.admins],
  })
  return (
    <>
      <Button onClick={() => setOpen(true)}>{t('button.create-admin')}</Button>
      <Dialog open={open} setOpen={setOpen} title={t('button.create-admin')}>
        <Form
          onSubmit={handleSubmit(async ({ uid }) => {
            await createAdmin({
              variables: { createAdminInput: { uid } },
            })
            setOpen(false)
          })}
        >
          <HtmlLabel title={t('form.input.uid')}>
            <HtmlInput placeholder={t('form.input.uid')} {...register('uid')} />
          </HtmlLabel>

          <Button loading={loading} type="submit">
            {t('button.create')}
          </Button>
        </Form>
      </Dialog>
    </>
  )
}
