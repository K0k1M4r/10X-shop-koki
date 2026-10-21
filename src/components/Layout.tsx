import type { ReactNode } from 'react'
import Header from './Header'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl p-4">{children}</main>
    </div>
  )
}

export default Layout