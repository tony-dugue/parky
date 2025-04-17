import { ListCustomerBookings } from '@parky/ui/src/components/templates/ListCustomerBookings'
import { IsLoggedIn } from '@parky/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  )
}
