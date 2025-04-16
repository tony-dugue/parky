import { IsLoggedIn } from '@parky/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@parky/ui/src/components/organisms/IsManager'
import { ListGarageBookings } from '@parky/ui/src/components/templates/ListGarageBookings'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ garageId?: string }>
}) {
  const { garageId } = await searchParams

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
