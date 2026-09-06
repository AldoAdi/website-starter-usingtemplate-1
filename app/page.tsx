import type { ReactElement } from 'react'
import { Ping } from '@aldoadi/website-template'

export default function Home(): ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Ping />
    </main>
  )
}
