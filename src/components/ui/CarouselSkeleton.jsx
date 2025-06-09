const CarouselSkeleton = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default CarouselSkeleton;
