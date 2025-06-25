// src/sections/routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Wishes from '../pages/Wishes';
import Buy from '../pages/Buy';
import Layout from '../components/layout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishes />} />
          <Route path="/cart" element={<Buy />} />
          {/* Más rutas: /products, /categories, /contact, etc. */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
