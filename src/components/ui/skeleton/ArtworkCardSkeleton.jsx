const ArtworkCardSkeleton = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="relative rounded-lg bg-gradient-to-t from-black/70 to-transparent overflow-hidden shadow-lg w-[20rem] h-[20rem] group flex items-center justify-center gap-6"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mx-auto mb-4" />
      </div>
    ))}
  </>
);

export default ArtworkCardSkeleton;
