import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFetchLandingPage } from "../../hooks/useFetchLandingPage";
import CarouselSkeleton from "../ui/skeleton/CarouselSkeleton";

const Carousel = () => {
  const { data = [], error, isLoading } = useFetchLandingPage();

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(960);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateSize(); // Initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Détermine le nombre de slides visibles selon la largeur du container
  const visibleSlides =
    containerWidth < 640 ? 1 : containerWidth < 1024 ? 2 : 3;
  const slideWidth = containerWidth / visibleSlides;

  const originalImages = useMemo(
    () =>
      data.map((artist) => ({
        src: artist.image || "/placeholder-artist.jpg",
        alt: artist.name || "Artiste",
        title: artist.artworkTitle || "Unknown",
      })),
    [data]
  );

  const extendedImages = useMemo(
    () => [
      ...originalImages.slice(-1),
      ...originalImages,
      ...originalImages.slice(0, 1),
    ],
    [originalImages]
  );

  const slidesToRender = isLoading
    ? Array.from({ length: visibleSlides + 2 }).map((_, i) => ({
        isSkeleton: true,
        key: `skeleton-${i}`,
      }))
    : extendedImages.map((image, i) => ({
        ...image,
        isSkeleton: false,
        key: `slide-${i}`,
      }));

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

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

  const getOffset = () => {
    return -currentIndex * slideWidth + ((visibleSlides - 1) * slideWidth) / 2;
  };

  const getRealIndex = () => {
    if (currentIndex === 0) return originalImages.length - 1;
    if (currentIndex === originalImages.length + 1) return 0;
    return currentIndex - 1;
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 text-red-500">
        Erreur lors du chargement des artistes.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center py-8">
      <div
        ref={containerRef}
        className="overflow-hidden w-full max-w-[60rem] mx-auto"
        style={{ height: 320, minHeight: 320 }}
      >
        <motion.div
          className="flex"
          animate={{ x: getOffset() }}
          transition={
            isAnimating
              ? { type: "spring", stiffness: 300, damping: 30 }
              : { duration: 0 }
          }
        >
          {slidesToRender.map((slide, index) => {
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={slide.key}
                className={`p-2 transition-all duration-300 ${
                  isActive ? "scale-105" : "scale-95 opacity-80"
                }`}
                style={{ minWidth: slideWidth, height: 320 }}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-full group bg-gray-800">
                  {slide.isSkeleton ? (
                    <CarouselSkeleton />
                  ) : (
                    <>
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        loading={
                          index >= 1 && index <= visibleSlides
                            ? "eager"
                            : "lazy"
                        }
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <h3 className="text-lg font-bold">{slide.alt}</h3>
                        <p className="text-sm text-gray-200">{slide.title}</p>
                      </div>
                    </>
                  )}
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
