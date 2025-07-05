// src/components/layout.tsx
import type { ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { ModalProvider } from '../context/ModalContext';
import { CategoriesScrollProvider } from '../context/CategoriesScrollContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <CategoriesScrollProvider>
      <ModalProvider>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      </ModalProvider>
      </CategoriesScrollProvider>
    </div>
  );
}
