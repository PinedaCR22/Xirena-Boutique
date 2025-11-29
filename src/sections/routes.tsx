// src/sections/routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'   // ← IMPORTAR AQUÍ

import RootLayout from '../components/RootLayout'
import Home from '../pages/Home'
import Wishes from '../pages/Wishes'
import Buy from '../pages/Buy'
import Checkout from '../pages/chekout'
import Information from '../pages/Information'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* 🔥 Componente que fuerza el scroll arriba */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />

          {/* Rutas “fantasma” para obligar a redibujar arriba */}
          <Route path="products" element={<Home />} />
          <Route path="categories" element={<Home />} />
          <Route path="contact" element={<Home />} />

          {/* Rutas reales */}
          <Route path="wishes" element={<Wishes />} />
          <Route path="cart" element={<Buy />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="information" element={<Information />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
