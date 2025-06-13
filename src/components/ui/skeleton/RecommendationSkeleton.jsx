export const RecommendationSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="p-6 border border-slate-700 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">
              Art Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 mb-1">Top Artists</p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div className="w-32 h-4 bg-purple-500/20  rounded-lg animate-pulse " />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-slate-400 mb-1">Art Styles</p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div className="w-32 h-4 bg-emerald-500/20 rounded-lg animate-pulse " />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 border border-slate-700 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-4">
          Personalized Recommendations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div className="flex gap-3 p-3 rounded-lg bg-white/5 no-underline">
              <div className="w-16 h-16 rounded bg-black/50 flex-shrink-0 overflow-hidden" />
              <div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-42 bg-slate-700 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-slate-600 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-amber-700/30 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
