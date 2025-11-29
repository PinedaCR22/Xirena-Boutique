// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const action = useNavigationType(); // PUSH | REPLACE | POP

  useEffect(() => {
    // Solo subir si entramos a una ruta nueva (PUSH o REPLACE)
    // POP = navegaciones hacia atrás → NO forzamos scroll
    if ((action === "PUSH" || action === "REPLACE") && !hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash, action]);

  return null;
}
