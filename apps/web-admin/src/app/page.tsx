import { IsAdmin } from '@parky/ui/src/components/organisms/IsAdmin'
import { AdminHome } from '@parky/ui/src/components/templates/AdminHome'

export default function Home() {
  return (
    <main>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </main>
  )
}
