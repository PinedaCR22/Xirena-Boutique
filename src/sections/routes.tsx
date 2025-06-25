// src/sections/routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '../components/RootLayout';
import Home from '../pages/Home';
import Wishes from '../pages/Wishes';
import Buy from '../pages/Buy';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Ruta principal */}
          <Route index element={<Home />} />

          {/* Fantasmas para quitar warnings */}
          <Route path="products"   element={<Home />} />
          <Route path="categories" element={<Home />} />
          <Route path="contact"    element={<Home />} />

          {/* Rutas reales */}
          <Route path="wishes" element={<Wishes />} />
          <Route path="cart"    element={<Buy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
