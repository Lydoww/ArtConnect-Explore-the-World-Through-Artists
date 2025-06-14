const ArtworkHeader = ({ artwork }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
      <span>Artwork</span>
      <span>•</span>
      <span>{artwork.objectNumber}</span>
    </div>
    <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
      {artwork.longTitle || artwork.title}
    </h1>
    {artwork.subTitle && (
      <p className="text-lg text-slate-300 mt-2">{artwork.subTitle}</p>
    )}
  </div>
);

export default ArtworkHeader;
