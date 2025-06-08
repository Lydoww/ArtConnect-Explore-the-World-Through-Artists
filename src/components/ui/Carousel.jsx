import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFetchLandingPage } from "../../hooks/useFetchLandingPage";

const Carousel = () => {
  const { data = [], error, isLoading } = useFetchLandingPage();

  // Transforme les artistes en images pour le carousel
  const originalImages = useMemo(
    () =>
      data.map((artist) => ({
        src: artist.image || "/placeholder-artist.jpg",
        alt: artist.name || "Artiste",
        title: artist.artworkTitle || "Unknown",
      })),
    [data]
  );

  // Images étendues pour boucle infinie
  const extendedImages = useMemo(
    () => [
      ...originalImages.slice(-1),
      ...originalImages,
      ...originalImages.slice(0, 1),
    ],
    [originalImages]
  );

  const visibleSlides = 3;
  const slideWidth = 320;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  // Navigation
  const isDisabled = isAnimating || isLoading || originalImages.length === 0;
  const prevSlide = () => {
    if (isDisabled) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (isDisabled) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToSlide = (index) => {
    if (isDisabled) return;
    setIsAnimating(true);
    setCurrentIndex(index + 1);
  };

  // Gestion boucle infinie et reset animation
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);

      if (currentIndex === 0) {
        setCurrentIndex(originalImages.length);
      } else if (currentIndex === originalImages.length + 1) {
        setCurrentIndex(1);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, originalImages.length]);

  // Calcul offset pour centrer slide active
  const getOffset = () => {
    return -currentIndex * slideWidth + ((visibleSlides - 1) * slideWidth) / 2;
  };

  // Index réel pour les dots
  const getRealIndex = () => {
    if (currentIndex === 0) return originalImages.length - 1;
    if (currentIndex === originalImages.length + 1) return 0;
    return currentIndex - 1;
  };

  // Gestion affichage selon état
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-300 mt-12">
        Loading random artworks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 text-red-500">
        Erreur lors du chargement des artistes.
      </div>
    );
  }

  if (originalImages.length === 0) {
    return (
      <div className="flex justify-center items-center h-48 text-white">
        Aucun artiste trouvé.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center py-8">
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
                <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-full cursor-pointer group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                  {/* Texte superposé */}
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <h3 className="text-lg font-bold">{image.alt}</h3>
                    <p className="text-sm text-gray-200">{image.title}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex flex-row w-full max-w-[60rem] justify-between items-center mt-3">
        <button
          onClick={prevSlide}
          disabled={isDisabled}
          className="bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl  disabled:cursor-not-allowed border"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="text-xl text-black cursor-pointer" />
        </button>

        <div className="flex flex-row gap-2">
          {originalImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isDisabled}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === getRealIndex()
                  ? "bg-gray-600 scale-125"
                  : "bg-white hover:bg-gray-400"
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={isDisabled}
          className="bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed border"
          aria-label="Slide suivant"
        >
          <ChevronRight className="text-xl text-black cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
