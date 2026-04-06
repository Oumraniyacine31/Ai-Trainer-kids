import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      
      try {
        // Check if it's a Firestore error JSON
        const parsed = JSON.parse(this.state.error?.message || "");
        if (parsed.error) {
          errorMessage = `Database Error: ${parsed.error}`;
        }
      } catch (e) {
        // Not a JSON error, use the raw message if available
        if (this.state.error?.message) {
          errorMessage = this.state.error.message;
        }
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-red-50 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-4">Oops! Something went wrong</h1>
          <p className="text-slate-600 font-bold max-w-md mb-8">
            {errorMessage}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-blue-500 text-white font-black rounded-2xl shadow-xl hover:bg-blue-600 transition-colors"
          >
            RELOAD APP
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
