import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import { Link } from "react-router-dom";
import { ImageOff, Palette, Brush } from "lucide-react";
import { RecommendationSkeleton } from "../ui/skeleton/RecommendationSkeleton";
import { useRecommendations } from "../../hooks/useRecommendations ";

const InsightsTab = ({ favoriteArtists }) => {
  const { data: recommendations = [], isLoading } = useRecommendations();

  // Calcul des styles comptés et triés
  const styleCounts = React.useMemo(() => {
    const counts = {};
    recommendations.forEach((rec) => {
      rec.styles?.forEach((style) => {
        if (style !== "Unknown") {
          counts[style] = (counts[style] || 0) + 1;
        }
      });
    });
    return counts;
  }, [recommendations]);

  const sortedStyles = React.useMemo(() => {
    return Object.entries(styleCounts)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
      .map(([style]) => style);
  }, [styleCounts]);

  if (isLoading) {
    return <RecommendationSkeleton />;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-white">Your Art Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Art Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 mb-1">Top Artists</p>
                {favoriteArtists.length > 0 ? (
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
                ) : (
                  <p className="text-slate-500 italic text-sm">
                    You haven't saved enough artworks to highlight favorite
                    artists yet.
                  </p>
                )}
              </div>

              <div>
                <p className="text-slate-400 mb-1">Art Styles</p>
                {sortedStyles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {sortedStyles.map((style) => (
                      <Badge
                        key={style}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300"
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-sm">
                    No dominant art style detected yet. Save more artworks to
                    see trends!
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Personalized Recommendations
          </h3>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.slice(0, 3).map(({ id, title, image, artist }) => (
                <Link
                  to={`/art/${id}`}
                  key={id}
                  className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer no-underline"
                >
                  <div className="w-16 h-16 rounded bg-gradient-to-br from-slate-800 to-slate-900 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {image ? (
                      <img
                        src={image}
                        alt={`Artwork ${title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center p-2 text-center">
                        <Palette className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
                        <span className="text-[10px] text-slate-500 mt-1">No image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium line-clamp-1">
                      {title || "Untitled Artwork"}
                    </h4>
                    <p className="text-slate-400 text-xs line-clamp-1">
                      {artist || "Unknown Artist"}
                    </p>
                    <div className="mt-1">
                      <Badge className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs">
                        Recommended
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic text-sm">
              No recommendations available at the moment. Try saving some
              artworks to get personalized suggestions!
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default InsightsTab;