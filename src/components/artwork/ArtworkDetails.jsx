import { Calendar, User } from "lucide-react";

const ArtworkDetails = ({artwork}) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
        Artist & Date
      </h2>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <User className="w-5 h-5 text-fuchsia-400 mt-0.5" />
          <div>
            <p className="font-medium text-white">
              {artwork.principalOrFirstMaker || artwork.principalMaker}
            </p>
            {artwork.principalMakers?.[0] && (
              <p className="text-sm text-slate-300">
                {artwork.principalMakers[0].dateOfBirth &&
                artwork.principalMakers[0].dateOfDeath
                  ? `(${artwork.principalMakers[0].dateOfBirth}–${artwork.principalMakers[0].dateOfDeath})`
                  : ""}
              </p>
            )}
          </div>
        </div>
        {artwork.dating && (
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="font-medium text-white">
                {artwork.dating.presentingDate}
              </p>
              {artwork.dating.period && (
                <p className="text-sm text-slate-300">
                  {artwork.dating.period}th century
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetails;
