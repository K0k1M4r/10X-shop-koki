import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-md p-8 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2">
            This page hit an unexpected error. Try reloading, or go back home.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary