import { Hash, MapPin, Palette, Ruler } from "lucide-react";

const ArtworkTech = ({ artwork }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
        Technical Details
      </h2>
      <div className="space-y-3">
        {artwork.physicalMedium && (
          <div className="flex items-start space-x-3">
            <Palette className="w-5 h-5 text-fuchsia-400 mt-0.5" />
            <div>
              <p className="font-medium text-white">Medium</p>
              <p className="text-sm text-slate-300 capitalize">
                {artwork.physicalMedium}
              </p>
            </div>
          </div>
        )}
        {artwork.dimensions && artwork.dimensions.length > 0 && (
          <div className="flex items-start space-x-3">
            <Ruler className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="font-medium text-white">Dimensions</p>
              {artwork.dimensions.map((dim, index) => (
                <p key={index} className="text-sm text-slate-300">
                  {dim.type}: {dim.value} {dim.unit}
                </p>
              ))}
            </div>
          </div>
        )}
        {artwork.materials && artwork.materials.length > 0 && (
          <div className="flex items-start space-x-3">
            <Hash className="w-5 h-5 text-fuchsia-400 mt-0.5" />
            <div>
              <p className="font-medium text-white">Materials</p>
              <p className="text-sm text-slate-300 capitalize">
                {artwork.materials.join(", ")}
              </p>
            </div>
          </div>
        )}
        {artwork.location && (
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="font-medium text-white">Location</p>
              <p className="text-sm text-slate-300">{artwork.location}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkTech;
