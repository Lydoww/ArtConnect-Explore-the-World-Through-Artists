const ArtworkCardSkeleton = ({ className = "" }) => (
  <div
    className={`relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] bg-slate-800 animate-pulse min-w-0 ${className}`}
  >
    {/* Skeleton heart icon */}
    <div className="absolute top-2 right-2 w-6 h-6 bg-slate-600 rounded-full z-20" />

    {/* Skeleton main image */}
    <div className="w-full h-full bg-slate-700 z-10" />

    {/* Skeleton overlay */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
      <div className="h-4 bg-slate-600 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-slate-600 rounded w-1/2"></div>
    </div>
  </div>
);

export default ArtworkCardSkeleton;
