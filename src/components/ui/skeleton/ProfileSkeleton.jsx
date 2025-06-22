import HeroSkeleton from "./HeroSkeleton";

const SkeletonCard = () => (
  <div className="rounded-lg bg-slate-800 p-6 shadow-lg animate-pulse space-y-4 h-full flex flex-col justify-between">
    <div className="h-6 bg-slate-700 rounded w-1/3" />
    <div className="space-y-2">
      <div className="h-4 bg-slate-700 rounded w-full" />
      <div className="h-4 bg-slate-700 rounded w-5/6" />
      <div className="h-4 bg-slate-700 rounded w-4/6" />
    </div>
  </div>
);

const SkeletonArtworkCard = () => (
  <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-slate-800 animate-pulse">
    <div className="absolute inset-0 bg-slate-700" />
  </div>
);

const ProfileSkeleton = () => (
  <div>
    <HeroSkeleton />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-8">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Recently Saved */}
      <div>
        <div className="h-6 w-1/3 bg-slate-700 mb-4 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonArtworkCard />
          <SkeletonArtworkCard />
          <SkeletonArtworkCard />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
