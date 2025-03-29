'use client'
import { IsLoggedIn } from '@parky/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@parky/ui/src/components/organisms/IsManager'

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>Hello Manager</IsManager>
    </IsLoggedIn>
  )
}
