const ArtworkOverlay = ({ alt, title }) => (
  <>
    {/* Overlay fondu */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

    {/* Texte visible au survol */}
    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      <h3 className="text-lg font-bold">{alt}</h3>
      <p className="text-sm text-gray-200">{title}</p>
    </div>
  </>
);

export default ArtworkOverlay;
