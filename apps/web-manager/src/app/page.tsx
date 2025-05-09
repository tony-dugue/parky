'use client'
import { IsLoggedIn } from '@parky/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@parky/ui/src/components/organisms/IsManager'
import { ListGarages } from '@parky/ui/src/components/organisms/ListGarages'
import { ContainerMain } from '@parky/ui/src/components/atoms/ContainerMain'

export default function Home() {
  return (
    <ContainerMain>
      <IsLoggedIn>
        <IsManager>
          {(companyId) => <ListGarages companyId={companyId} />}
        </IsManager>
      </IsLoggedIn>
    </ContainerMain>
  )
}
