import React, { Component, ErrorInfo } from 'react';
import { captureException } from './errorReporting';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to external service
    captureException(error, {
      componentStack: errorInfo.componentStack,
      extra: {
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-deep-brown-300">
          <div className="bg-deep-brown-200/40 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-accent">Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              We apologize for the inconvenience. The error has been logged and we'll look into it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;