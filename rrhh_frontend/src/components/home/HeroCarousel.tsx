import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import heroImg1 from '../../assets/img/imgh1.jpg'; 
import heroImg2 from '../../assets/img/imgh2.jpg'; 
import heroImg3 from '../../assets/img/imgh3.jpg'; 

interface CarouselItem {
  image: string;
  text: string;
  textColorClass: string; 
}

const carouselData: CarouselItem[] = [
  {
    image: heroImg1,
    text: "Simplifica procesos de contratación, evaluación y desarrollo de los recursos humanos.",
    textColorClass: "text-white"
  },
  {
    image: heroImg2,
    text: "Centraliza la gestión del personal académico y administrativo en un solo espacio digital.",
    textColorClass: "text-white"
  },
  {
    image: heroImg3,
    text: "Impulsa el bienestar y la productividad del personal.",
    textColorClass: "text-white",
  },
];

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto para cambiar la diapositiva automáticamente 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 4000); 

    return () => clearInterval(interval); 
  }, []);

  const currentItem = carouselData[currentIndex];

  return (
    
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"> 
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentItem.image})` }}
        >
          {/* Superposición para oscurecer la imagen y mejorar la legibilidad del texto */}
          <div className="absolute inset-0 bg-black opacity-30"></div> 

          <div className="relative z-10 flex items-center justify-center h-full p-6 md:p-8 text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }} 
              className={`
                // Texto responsive: 'text-3xl' en móvil, hasta 'lg:text-7xl' en desktop
                text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold 
                drop-shadow-lg leading-snug max-w-5xl // Aumentamos max-width y ajustamos leading
                ${currentItem.textColorClass}
              `}
            >
              {currentItem.text}
            </motion.h1>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;