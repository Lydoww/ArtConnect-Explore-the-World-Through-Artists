import { Info } from "lucide-react";

const ArtworkDescription = ({artwork}) => {
  return (
    <div className="mt-8">
      <div className="bg-slate-800/50 rounded-xl shadow-lg p-8 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
        <div className="flex items-center space-x-2 mb-6">
          <Info className="w-6 h-6 text-fuchsia-400" />
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
            About This Artwork
          </h2>
        </div>
        <div className="prose prose-invert max-w-none">
          {artwork.plaqueDescriptionEnglish && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Museum Description
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {artwork.plaqueDescriptionEnglish}
              </p>
            </div>
          )}
          {artwork.description &&
            artwork.description !== artwork.plaqueDescriptionEnglish && (
              <div>
                <h3 className="text-lg font-medium text-white mb-3">
                  Additional Information
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDescription;
