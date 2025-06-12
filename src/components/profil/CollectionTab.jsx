import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, CircleX } from "lucide-react";

const CollectionTab = () => {
  const [savedArtwork, setSavedArtwork] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("artwork")) || [];
    setSavedArtwork(data);
  }, []);

  const handleDelete = (idToRemove) => {
    const updated = savedArtwork.filter((art) => art.id !== idToRemove);
    localStorage.setItem("artwork", JSON.stringify(updated));
    setSavedArtwork(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Your Collection</h2>

      {savedArtwork.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedArtwork.map(({ id, image, title, artist }) => (
            <Link
              to={`/art/${id}`}
              key={id}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={
                  image ||
                  `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
                    title || "Artwork"
                  )}`
                }
                alt={title || "Artwork"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <CircleX
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(id);
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <h3 className="text-white font-medium text-sm">{title || "Untitled"}</h3>
                <p className="text-slate-300 text-xs">{artist || "Unknown Artist"}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-lg">
          <Heart className="mx-auto text-rose-400 mb-3" size={32} />
          <p className="text-slate-300 text-lg">Your collection is empty</p>
          <p className="text-slate-400 mt-2">
            Start exploring and save artworks you love
          </p>
        </div>
      )}
    </div>
  );
};

export default CollectionTab;
