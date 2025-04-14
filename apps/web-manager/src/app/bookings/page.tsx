import { IsLoggedIn } from '@parky/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@parky/ui/src/components/organisms/IsManager'
import { ListGarageBookings } from '@parky/ui/src/components/templates/ListGarageBookings'

type Params = Promise<{ garageId: string[] }>

export default async function Page({ params }: { params: Params }) {
  const { garageId } = await params

  return (
    <main className=" p-8">
      <IsLoggedIn>
        <IsManager>
          <ListGarageBookings garageId={Number(garageId)} />
        </IsManager>
      </IsLoggedIn>
    </main>
  )
}
