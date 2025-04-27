import { ManageValets } from '@parky/ui/src/components/templates/ManageValets'
import { IsLoggedIn } from '@parky/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <main className=" p-8">
      <IsLoggedIn>
        <ManageValets />
      </IsLoggedIn>
    </main>
  )
}
