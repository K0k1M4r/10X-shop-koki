import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastProvider } from '../context/ToastProvider'
import ErrorBoundary from './ErrorBoundary'
import Footer from './Footer'
import Header from './Header'

function Layout() {
  const location = useLocation()

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 p-4">
          <ErrorBoundary key={location.pathname}>
            <Suspense fallback={<p>Loading...</p>}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
}

export default Layout