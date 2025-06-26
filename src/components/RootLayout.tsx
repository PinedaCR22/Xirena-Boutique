// src/components/RootLayout.tsx
import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { ModalProvider } from '../context/ModalContext'
import Navbar from './navbar'
import Footer from './footer'

interface RootLayoutProps {
  children?: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { isLightMode } = useTheme()

  return (
    <ModalProvider>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-500 ${
          isLightMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          {children ?? <Outlet />}
        </main>
        <Footer />
      </div>
    </ModalProvider>
  )
}
