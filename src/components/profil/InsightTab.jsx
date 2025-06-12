import Card from "./Card";
import Badge from "./Badge";

const InsightsTab = ({ favoriteArtists, artStyles }) => (
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
                  src={`/placeholder.svg?height=64&width=64&text=Art${i + 1}`}
                  alt="Recommended artwork"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white text-sm font-medium">{rec.title}</h4>
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
);

export default InsightsTab;
