import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = () => {
  const originalImages = [
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const visibleSlides = 3;
  const slideWidth = 320;

  const extendedImages = [
    ...originalImages.slice(-1),
    ...originalImages,
    ...originalImages.slice(0, 1),
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // Commencer sur la première vraie image (index 1)
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index + 1); // +1 car on a une image dupliquée au début
  };

  // Gérer la boucle infinie
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);

      // Si on est sur la copie de la dernière image au début (index 0)
      if (currentIndex === 0) {
        setCurrentIndex(originalImages.length); // Aller à la vraie dernière image
      }
      // Si on est sur la copie de la première image à la fin
      else if (currentIndex === originalImages.length + 1) {
        setCurrentIndex(1); // Aller à la vraie première image
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, originalImages.length]);

  // Calcul du décalage pour centrer la slide active
  const getOffset = () => {
    return -currentIndex * slideWidth + ((visibleSlides - 1) * slideWidth) / 2;
  };

  // Obtenir l'index réel pour les dots (0 à originalImages.length - 1)
  const getRealIndex = () => {
    if (currentIndex === 0) return originalImages.length - 1; // Copie de la dernière au début
    if (currentIndex === originalImages.length + 1) return 0; // Copie de la première à la fin
    return currentIndex - 1; // Index normal décalé de 1
  };

  return (
    <div className="relative flex flex-col items-center py-20">
      <div className="overflow-hidden w-[60rem] h-[20rem] mx-auto">
        <motion.div
          className="flex"
          animate={{ x: getOffset() }}
          transition={
            isAnimating
              ? { type: "spring", stiffness: 300, damping: 30 }
              : { duration: 0 }
          }
        >
          {extendedImages.map((image, index) => {
            const isActive = index === currentIndex;

            return (
              <motion.div
                className={`p-2 min-w-[20rem] h-[20rem] transition-all duration-300 ${
                  isActive ? "scale-105" : "scale-95 opacity-80"
                }`}
                key={`slide-${index}`}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  alt={`Slide ${index + 1}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex flex-row w-full max-w-[60rem] justify-between items-center mt-6">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border"
        >
          <ChevronLeft className="text-xl text-gray-700 cursor-pointer" />
        </button>

        <div className="flex flex-row gap-2">
          {originalImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === getRealIndex()
                  ? "bg-gray-800 scale-125"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border"
        >
          <ChevronRight className="text-xl text-gray-700 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
