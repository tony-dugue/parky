'use client'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { Role } from '@parky/util/types'
import { useFormRegister } from '@parky/forms/src/register'
import { RegisterWithCredentialsDocument } from '@parky/network/src/gql/generated'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'

export interface ISignupFormProps {
  className?: string
  role?: Role
}
export const RegisterForm = ({}: ISignupFormProps) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const [registerWithCredentials, { loading }] = useMutation(
    RegisterWithCredentialsDocument,
  )

  return (
    <Form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(async (formData) => {
        const { data, errors } = await registerWithCredentials({
          variables: { registerWithCredentialsInput: formData },
        })

        if (errors) {
          alert(errors)
        }

        if (data) {
          alert(
            `${t('auth.login-failed')} : ${data.registerWithCredentials.uid}`,
          )
          signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: '/',
          })
        }
      })}
    >
      <HtmlLabel title={t('form.title.email')} error={errors.email?.message}>
        <HtmlInput
          className="text-black"
          placeholder={t('form.placeholder.email')}
          {...register('email')}
        />
      </HtmlLabel>
      <HtmlLabel
        title={t('form.title.password')}
        error={errors.password?.message}
      >
        <HtmlInput
          className="text-black"
          type="password"
          placeholder={t('form.placeholder.password')}
          {...register('password')}
        />
      </HtmlLabel>
      <HtmlLabel title={t('form.title.username')} error={errors.name?.message}>
        <HtmlInput
          className="text-black"
          placeholder={t('form.placeholder.username')}
          {...register('name')}
        />
      </HtmlLabel>
      {Object.keys(errors).length ? (
        <div className="text-xs text-red-500">
          {t('message.fix-errors')} : {Object.keys(errors).length}
        </div>
      ) : null}
      <Button type="submit" fullWidth loading={loading}>
        {t('button.register-account')}
      </Button>
      <div className="mt-4 text-sm ">
        {t('auth.already-account')}
        <br />
        <Link href="/login" className="font-bold underline underline-offset-4">
          {t('button.login')}
        </Link>{' '}
        {t('button.now')}
      </div>
    </Form>
  )
}
