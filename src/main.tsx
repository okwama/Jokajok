import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-charred-wood text-soft-sand p-4">
          <div className="max-w-md w-full bg-dark-clay-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-serif font-bold mb-4">Something went wrong</h2>
            <pre className="text-sm text-copper-wood-400 bg-charred-wood p-4 rounded overflow-auto">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-burnished-copper-500 text-charred-wood rounded hover:bg-burnished-copper-600 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
