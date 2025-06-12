import { Palette, Bookmark, TrendingUp, Clock, Heart } from "lucide-react";
import Card from "../Card";
import Badge from "../Badge";

const OverviewTab = ({
  recentArtworks,
  favoriteArtists,
  sortedStyles,
  styleCounts,
  artStyles,
}) => (
  <div className="space-y-8">
    {/* Stats cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-fuchsia-500 bg-clip-text">
              Favorite Artists
            </h3>
            <Palette className="text-purple-400" size={20} />
          </div>
          <div className="space-y-3 flex-grow">
            {favoriteArtists.length > 0 ? (
              favoriteArtists.map((artist, i) => (
                <div key={artist} className="flex items-center gap-2">
                  <span className="text-white/70 text-sm">{i + 1}.</span>
                  <span className="text-white">{artist}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400">
                Discover artists to add to your collection
              </p>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-fuchsia-500 bg-clip-text">
              Art Styles
            </h3>
            <Bookmark className="text-emerald-400" size={20} />
          </div>
          <div className="flex flex-wrap gap-2">
            {sortedStyles.length > 0 ? (
              sortedStyles.map((style) => (
                <Badge
                  key={style}
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  {style} ({styleCounts[style]})
                </Badge>
              ))
            ) : (
              <p className="text-slate-400">No art styles identified yet</p>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-fuchsia-500 bg-clip-text">
              Recommendations
            </h3>
            <TrendingUp className="text-amber-400" size={20} />
          </div>
          <div className="space-y-2">
            <p className="text-slate-300">Based on your collection:</p>
            <ul className="list-disc list-inside text-slate-400 space-y-1">
              <li>
                Explore more works by {favoriteArtists[0] || "emerging artists"}
              </li>
              <li>Discover {artStyles[0] || "contemporary"} exhibitions</li>
              <li>Consider similar {artStyles[1] || "abstract"} pieces</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>

    {/* Recent activity */}
    <div>
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Clock size={18} className="text-blue-400" />
        Recently Saved
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentArtworks.length > 0 ? (
          recentArtworks.map((artwork, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              <img
                src={
                  artwork.image ||
                  `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(
                    artwork.title || "Artwork"
                  )}`
                }
                alt={artwork.title || "Artwork"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-medium">
                  {artwork.title || "Untitled"}
                </h3>
                <p className="text-slate-300 text-sm">
                  {artwork.artist || "Unknown Artist"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 border border-dashed border-white/10 rounded-lg">
            <Heart className="mx-auto text-rose-400 mb-2" size={24} />
            <p className="text-slate-300">
              Start saving artworks to build your collection
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default OverviewTab;
