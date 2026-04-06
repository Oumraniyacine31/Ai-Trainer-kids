import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  onParentClick?: () => void;
}

export function Layout({ children, onParentClick }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <Header onParentClick={onParentClick} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
      
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-50 rounded-full blur-[120px] opacity-30" />
      </div>
    </div>
  );
}
