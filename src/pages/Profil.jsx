import { useState } from "react";
import { useSavedArtwork } from "../hooks/useSavedArtwork";
import {
  Palette,
  Heart,
  User,
  Clock,
  Bookmark,
  TrendingUp,
} from "lucide-react";

const Profile = () => {
  const { savedArtwork, recentArtworks, styleCounts } = useSavedArtwork();
  const [activeTab, setActiveTab] = useState("overview");
  console.log(savedArtwork);

  // Extract unique artists and count their occurrences
  const artistCounts = savedArtwork.reduce((acc, artwork) => {
    const artist = artwork.artist || "Unknown Artist";
    acc[artist] = (acc[artist] || 0) + 1;
    return acc;
  }, {});

  // Top 5 artists
  const favoriteArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([artist]) => artist);

  // Extract art styles if available
  const sortedStyles = Object.entries(styleCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([style]) => style)
    .slice(0, 6);

  const artStyles = sortedStyles;

  const TabButton = ({ value, children, isActive, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? "bg-white/20 text-white border border-white/30"
          : "text-slate-400 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );

  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-slate-800/50 shadow border border-slate-700 backdrop-blur-sm rounded-xl overflow-hidden hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300 ${className}`}
    >
      {children}
    </div>
  );

  // text-xl font-semibold mb-4 bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent

  const Badge = ({ children, className = "" }) => (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );

  return (
    <div className="min-h-screen ">
      {/* Hero section with profile summary */}
      <div className="relative">
        <div
          className="h-32 w-full bg-cover bg-center"
          style={{
            backgroundImage:
              savedArtwork.length > 0
                ? `url(${
                    savedArtwork[0].image ||
                    "/placeholder.svg?height=400&width=800"
                  })`
                : "url('/placeholder.svg?height=400&width=800')",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="h-36 w-36 rounded-full border-4 border-[#0a0a0c] overflow-hidden bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <User size={48} className="text-white/70" />
            </div>

            <div className="pb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-fuchsia-600 to-orange-600 bg-clip-text text-transparent">
                  Your Art Profile
                </span>
              </h1>
              <p className="text-slate-300 mt-1">
                Curator of {savedArtwork.length} artworks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
        {/* Custom Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 p-1 bg-black/30 border border-white/10 rounded-xl w-fit">
            <TabButton
              value="overview"
              isActive={activeTab === "overview"}
              onClick={setActiveTab}
            >
              Overview
            </TabButton>
            <TabButton
              value="collection"
              isActive={activeTab === "collection"}
              onClick={setActiveTab}
            >
              Collection
            </TabButton>
            <TabButton
              value="insights"
              isActive={activeTab === "insights"}
              onClick={setActiveTab}
            >
              Insights
            </TabButton>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="p-6 flex flex-col h-full ">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold  text-fuchsia-500 bg-clip-text">
                      Favorite Artists
                    </h3>
                    <Palette className="text-purple-400" size={20} />
                  </div>
                  <div className="space-y-3 flex-grow">
                    {favoriteArtists.length > 0 ? (
                      favoriteArtists.map((artist, i) => (
                        <div key={artist} className="flex items-center gap-2">
                          <span className="text-white/70 text-sm">
                            {i + 1}.
                          </span>
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
                    <h3 className="text-xl font-semibold  text-fuchsia-500 bg-clip-textt">
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
                      <p className="text-slate-400">
                        No art styles identified yet
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold  text-fuchsia-500 bg-clip-text ">
                      Recommendations
                    </h3>
                    <TrendingUp className="text-amber-400" size={20} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-300">Based on your collection:</p>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li>
                        Explore more works by{" "}
                        {favoriteArtists[0] || "emerging artists"}
                      </li>
                      <li>
                        Discover {artStyles[0] || "contemporary"} exhibitions
                      </li>
                      <li>
                        Consider similar {artStyles[1] || "abstract"} pieces
                      </li>
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
        )}

        {activeTab === "collection" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Your Collection
            </h2>

            {savedArtwork.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedArtwork.map((artwork, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg aspect-square"
                  >
                    <img
                      src={
                        artwork.image ||
                        `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
                          artwork.title || "Artwork"
                        )}`
                      }
                      alt={artwork.title || "Artwork"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <h3 className="text-white font-medium text-sm">
                        {artwork.title || "Untitled"}
                      </h3>
                      <p className="text-slate-300 text-xs">
                        {artwork.artist || "Unknown Artist"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-white/10 rounded-lg">
                <Heart className="mx-auto text-rose-400 mb-3" size={32} />
                <p className="text-slate-300 text-lg">
                  Your collection is empty
                </p>
                <p className="text-slate-400 mt-2">
                  Start exploring and save artworks you love
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-white">
              Your Art Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Art Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 mb-1">Top Artists</p>
                      <div className="flex flex-wrap gap-2">
                        {favoriteArtists.map((artist) => (
                          <Badge
                            key={artist}
                            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300"
                          >
                            {artist}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-400 mb-1">Art Styles</p>
                      <div className="flex flex-wrap gap-2">
                        {artStyles.map((style) => (
                          <Badge
                            key={style}
                            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Collection Growth
                  </h3>
                  <div className="h-48 flex items-center justify-center">
                    {savedArtwork.length > 0 ? (
                      <div className="w-full h-full flex items-end justify-around">
                        {[...Array(6)].map((_, i) => {
                          const height = Math.floor(Math.random() * 60) + 20;
                          return (
                            <div key={i} className="flex flex-col items-center">
                              <div
                                className="w-8 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-sm"
                                style={{ height: `${height}%` }}
                              ></div>
                              <span className="text-xs text-slate-400 mt-2">
                                {new Date(
                                  Date.now() -
                                    (5 - i) * 30 * 24 * 60 * 60 * 1000
                                ).toLocaleDateString("fr-FR", {
                                  month: "short",
                                })}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-slate-400">
                        Start saving artworks to see your collection growth
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Personalized Recommendations
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "The Night Gallery", artist: "Vincent Moore" },
                    { title: "Abstract Thoughts", artist: "Elena Petrova" },
                    { title: "Color Fields", artist: "Marcus Reed" },
                  ].map((rec, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded bg-black/50 flex-shrink-0 overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=64&width=64&text=Art${
                            i + 1
                          }`}
                          alt="Recommended artwork"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium">
                          {rec.title}
                        </h4>
                        <p className="text-slate-400 text-xs">{rec.artist}</p>
                        <div className="mt-1">
                          <Badge className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs">
                            Recommended
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
