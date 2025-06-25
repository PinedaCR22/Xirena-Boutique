import { Outlet } from 'react-router-dom';

import Footer from './footer';
import { useTheme } from '../context/ThemeContext';
import Navbar from './navbar';

export default function RootLayout() {
  const { isLightMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isLightMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
      }`}
    >
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
