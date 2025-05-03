'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { useFormLogin } from '@parky/forms/src/login'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'

export interface ILoginFormProps {
  className?: string
}

export const LoginForm = ({}: ILoginFormProps) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { replace } = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <Form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        setLoading(true)

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
        setLoading(false)

        if (result?.ok) {
          replace('/')
        }
        if (result?.error) {
          alert(t('auth.login-failed'))
        }
      })}
    >
      <HtmlLabel title={t('form.title.email')} error={errors.email?.message}>
        <HtmlInput
          {...register('email')}
          className="text-black"
          placeholder={t('form.placeholder.email')}
        />
      </HtmlLabel>

      <HtmlLabel
        title={t('form.title.password')}
        error={errors.password?.message}
      >
        <HtmlInput
          className="text-black"
          type="password"
          {...register('password')}
          placeholder={t('form.placeholder.password')}
        />
      </HtmlLabel>

      <Button type="submit" loading={loading}>
        {t('button.submit')}
      </Button>
      <div className="mt-4 text-sm">
        {t('auth.not-account')}
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          {t('button.create-one')}
        </Link>{' '}
        {t('button.now')}
      </div>
    </Form>
  )
}
