// src/components/layout.tsx
import type { ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { ModalProvider } from '../context/ModalContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <ModalProvider>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      </ModalProvider>
    </div>
  );
}
