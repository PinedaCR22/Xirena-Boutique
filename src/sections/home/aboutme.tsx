// src/sections/home/AboutUsBoutique.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const AboutUsBoutique: React.FC = () => {
  const { isLightMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const images = ["/images/LOGO.jpg"]; // horizontal única

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const bgClass = isLightMode ? "bg-white text-gray-900" : "bg-[#f7e6e2] text-black";

  return (
    <motion.div
      className={`w-full flex flex-col md:flex-row items-center py-16 px-8 transition-colors duration-500 ${bgClass}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Imagen fija horizontal */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="w-full max-w-md md:max-w-full overflow-hidden rounded-lg shadow-lg aspect-[2/1]"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt="Xirena Boutique"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Texto + botón */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-6 mt-10 md:mt-0"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-4">Sobre Xirena Boutique</h2>
        <p className="text-lg mb-6">
          En Xirena Boutique confeccionamos prendas únicas que celebran la feminidad
          y la autenticidad de cada mujer. Nos especializamos en bikinis, vestidos
          y conjuntos hechos a mano con amor y dedicación. Nuestro objetivo es que cada clienta se sienta cómoda, hermosa y segura al vestir nuestras piezas.
        </p>
        <button
  onClick={() => navigate("/information")}
  className="self-center md:self-start bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
>
  Continuar
</button>
      </motion.div>
    </motion.div>
  );
};

export default AboutUsBoutique;
