import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFetchLandingPage } from "../../hooks/useFetchLandingPage";
import CarouselSkeleton from "../ui/skeleton/CarouselSkeleton";

const Carousel = () => {
  const { data = [], error, isLoading } = useFetchLandingPage();

  console.log(data);

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
        alt: artist.artist || "Artiste",
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
      <div className="flex justify-center items-center h-48 text-red-400 bg-black/20 backdrop-blur-sm rounded-2xl border border-gray-800 mt-16">
        <div className="text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <p>Erreur lors du chargement des artistes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center py-16 mt-16">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/10 via-transparent to-orange-900/10 blur-3xl -z-10" />

      <div
        ref={containerRef}
        className="relative overflow-hidden w-full max-w-[70rem] mx-auto"
        style={{ height: 500, minHeight: 500 }}
      >
        {/* Subtle gradient borders */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/10 via-transparent to-orange-600/10 rounded-3xl -z-10" />

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
            const distance = Math.abs(index - currentIndex);

            return (
              <motion.div
                key={slide.key}
                className="p-3 transition-all duration-500 ease-out"
                style={{
                  minWidth: slideWidth,
                  height: 500,
                  transform: `scale(${
                    isActive ? 1.05 : distance === 1 ? 0.9 : 0.8
                  })`,
                  opacity: isActive ? 1 : distance === 1 ? 0.7 : 0.4,
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-full group bg-black/40 backdrop-blur-sm border border-gray-800/50">
                  {slide.isSkeleton ? (
                    <CarouselSkeleton />
                  ) : (
                    <>
                      {/* Main image */}
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          loading={
                            index >= 1 && index <= visibleSlides
                              ? "eager"
                              : "lazy"
                          }
                          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                            !isActive
                              ? "filter blur-sm brightness-50"
                              : "filter brightness-90 group-hover:brightness-100"
                          }`}
                        />

                        {/* Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                        {/* Hover overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 via-transparent to-orange-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                        {/* Active slide indicator */}
                        {isActive && (
                          <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-fuchsia-500 to-orange-500 rounded-full shadow-lg animate-pulse" />
                        )}
                      </div>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="backdrop-blur-sm bg-black/20 rounded-xl p-2  border border-white/10">
                          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                            {slide.alt}
                          </h3>
                          <p className="text-gray-200 text-sm opacity-90 drop-shadow-md">
                            {slide.title}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls with enhanced design */}
      <div className="flex flex-row w-full max-w-[70rem] justify-between items-center mt-8">
        <button
          onClick={prevSlide}
          disabled={isDisabled}
          className="group relative bg-black/40 backdrop-blur-sm p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:bg-black/60 disabled:cursor-not-allowed border border-gray-700/50 hover:border-fuchsia-500/50"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:-translate-x-0.5 transform transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-orange-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Enhanced dots indicator */}
        <div className="flex flex-row gap-3 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-gray-800/50">
          {originalImages.map((_, index) => {
            const isActive = index === getRealIndex();
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isDisabled}
                className="group relative transition-all duration-300"
                aria-label={`Aller à la slide ${index + 1}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-fuchsia-500 to-orange-500 scale-125 shadow-lg"
                      : "bg-gray-600 hover:bg-gray-400 hover:scale-110"
                  }`}
                />
                {isActive && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-500 animate-ping opacity-50" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          disabled={isDisabled}
          className="group relative bg-black/40 backdrop-blur-sm p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:bg-black/60 disabled:cursor-not-allowed border border-gray-700/50 hover:border-fuchsia-500/50"
          aria-label="Slide suivant"
        >
          <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-white  duration-300 group-hover:translate-x-0.5 transform transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-orange-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
