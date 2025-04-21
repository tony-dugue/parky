import { LoginForm } from '@parky/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@parky/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  )
}
