const HeroSkeleton = () => (
  <div className="relative">
    {/* Background banner */}
    <div className="h-32 w-full bg-slate-800 animate-pulse" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
      <div className="flex flex-col md:flex-row md:items-end gap-6">
        {/* Avatar skeleton */}
        <div className="h-36 w-36 rounded-full bg-slate-700 border-4 border-[#0a0a0c] animate-pulse" />

        {/* Text skeletons */}
        <div className="pb-4 space-y-3 flex-1">
          <div className="h-10 w-48 bg-slate-700 rounded animate-pulse" />
          <div className="h-5 w-32 bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

export default HeroSkeleton
