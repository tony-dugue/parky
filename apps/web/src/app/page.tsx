'use client'
import { add } from '@parky/sample-lib'
export default function Home() {
  return <main className="bg-primary">Hello {add(343, 3)}</main>
}
