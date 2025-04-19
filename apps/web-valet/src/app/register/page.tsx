import { RegisterForm } from '@parky/ui/src/components/templates/RegisterForm'
import { AuthLayout } from '@parky/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  )
}
