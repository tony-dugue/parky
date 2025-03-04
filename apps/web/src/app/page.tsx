'use client'
import { add } from '@parky/sample-lib'
import { BrandIcon } from '@parky/ui/src/app/components/atoms/BrandIcon'
import { Button } from '@parky/ui/src/app/components/atoms/Button'

export default function Home() {
  return (
    <main>
      <BrandIcon />
      <Button loading>Hello</Button>
      Hello {add(343, 3)}
    </main>
  )
}
