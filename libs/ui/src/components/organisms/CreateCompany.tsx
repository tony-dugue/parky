'use client'
import { useFormCreateCompany } from '@parky/forms/src/createCompany'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'
import { useEffect, useState } from 'react'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Form } from '../atoms/Form'
import { HtmlTextArea } from '../atoms/HtmlTextArea'
import { useSession } from 'next-auth/react'
import { useMutation } from '@apollo/client'
import {
  CreateCompanyDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { useTranslation } from 'react-i18next'

export const CreateCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormCreateCompany()

  const session = useSession()
  const { t } = useTranslation()
  const uid = session.data?.user?.uid
  const managerName = session.data?.user?.name

  const [createCompany, { loading }] = useMutation(CreateCompanyDocument)

  useEffect(() => {
    if (uid) {
      setValue('managerId', uid)
    }
    setValue('managerName', managerName)
  }, [uid])

  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        {t('button.create-company')}
      </Button>
      <Dialog open={open} setOpen={setOpen} title={t('button.create-company')}>
        <Form
          onSubmit={handleSubmit(async (data) => {
            await createCompany({
              variables: {
                createCompanyInput: data,
              },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.myCompany],
            })
          })}
        >
          <HtmlLabel
            title={t('form.title.company-name')}
            error={errors.displayName?.message}
          >
            <HtmlInput
              placeholder={t('form.placeholder.company-name')}
              {...register('displayName')}
            />
          </HtmlLabel>

          <HtmlLabel
            title={t('form.title.description')}
            error={errors.description?.message}
          >
            <HtmlTextArea
              placeholder={t('form.placeholder.description')}
              {...register('description')}
            />
          </HtmlLabel>

          <HtmlLabel
            title={t('form.title.manager-id')}
            error={errors.managerId?.message}
          >
            <HtmlInput
              placeholder={t('form.placeholder.manager-id')}
              {...register('managerId')}
              readOnly
            />
          </HtmlLabel>

          <HtmlLabel
            title={t('form.title.manager-name')}
            error={errors.managerName?.message}
          >
            <HtmlInput
              placeholder={t('form.placeholder.manager-name')}
              {...register('managerName')}
            />
          </HtmlLabel>

          <Button loading={loading} type="submit">
            {t('button.create')}
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
