const ArtworkAcquisition = ({ artwork }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
        Acquisition
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-slate-300 capitalize">
          <span className="font-medium text-white">Method:</span>{" "}
          {artwork.acquisition.method}
        </p>
        {artwork.acquisition.date && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-white">Date:</span>{" "}
            {new Date(artwork.acquisition.date).getFullYear()}
          </p>
        )}
        {artwork.acquisition.creditLine && (
          <p className="text-sm text-slate-300 leading-relaxed">
            {artwork.acquisition.creditLine}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtworkAcquisition;
