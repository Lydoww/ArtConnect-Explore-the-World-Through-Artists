const ArtworkCardSkeleton = ({ className = "" }) => (
  <div
    className={`relative rounded-lg bg-gradient-to-t from-black/70 to-transparent overflow-hidden shadow-lg w-full aspect-[3/4] flex items-center justify-center ${className}`}
  >
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-fuchsia-500" />
  </div>
);

export default ArtworkCardSkeleton;
