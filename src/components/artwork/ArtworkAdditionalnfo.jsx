const ArtworkAdditionalnfo = ({ artwork }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {artwork.objectTypes && artwork.objectTypes.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
          <h3 className="font-semibold text-white mb-3">Object Type</h3>
          <div className="flex flex-wrap gap-2">
            {artwork.objectTypes.map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm capitalize "
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {artwork.objectCollection && artwork.objectCollection.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
          <h3 className="font-semibold text-white mb-3">Collection</h3>
          <div className="flex flex-wrap gap-2">
            {artwork.objectCollection.map((collection, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-fuchsia-900/50 to-orange-900/50 text-fuchsia-100 rounded-full text-sm capitalize border border-fuchsia-500/30"
              >
                {collection}
              </span>
            ))}
          </div>
        </div>
      )}

      {artwork.historicalPersons && artwork.historicalPersons.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
          <h3 className="font-semibold text-white mb-3">Historical Persons</h3>
          <div className="space-y-1">
            {artwork.historicalPersons.map((person, index) => (
              <p key={index} className="text-sm text-slate-300">
                {person}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkAdditionalnfo;
