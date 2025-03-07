'use client'
import { Button } from '@parky/ui/src/components/atoms/Button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: sessionData } = useSession()
  return (
    <main className=" p-8">
      <div>
        {sessionData?.user?.uid ? (
          <Button onClick={() => signOut()}>Signout</Button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </main>
  )
}
