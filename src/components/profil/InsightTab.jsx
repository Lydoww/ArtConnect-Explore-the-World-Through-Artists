import Card from "./Card";
import Badge from "./Badge";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const InsightsTab = ({ favoriteArtists, artStyles }) => {
  const [recoData, setRecoData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("artwork"));
    if (Array.isArray(data)) {
      setRecoData(data);
    }
  }, []);

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
      </div>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Personalized Recommendations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recoData.slice(0, 3).map(({ id, title, image, artist }) => (
              <Link
                to={`/art/${id}`}
                key={id}
                className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer no-underline"
              >
                <div className="w-16 h-16 rounded bg-black/50 flex-shrink-0 overflow-hidden">
                  <img
                    src={image}
                    alt={`Artwork ${title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">{title}</h4>
                  <p className="text-slate-400 text-xs">{artist}</p>
                  <div className="mt-1">
                    <Badge className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs">
                      Recommended
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InsightsTab;
