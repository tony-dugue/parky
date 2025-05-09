import { IsAdmin } from '@parky/ui/src/components/organisms/IsAdmin'
import { AdminHome } from '@parky/ui/src/components/templates/AdminHome'
import { ContainerMain } from '@parky/ui/src/components/atoms/ContainerMain'

export default function Home() {
  return (
    <ContainerMain>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </ContainerMain>
  )
}
