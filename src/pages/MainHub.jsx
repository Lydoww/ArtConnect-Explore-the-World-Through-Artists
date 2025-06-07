import { useMemo, useState } from "react";
import { Search, ListFilter } from "lucide-react";
import { useArtist } from "../hooks/useArtist";
import { useDebounce } from "../hooks/useDebounce";

const MainHub = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const { data = [], error, isLoading } = useArtist(debouncedSearchTerm);

  // Transforme les artistes en images pour le carousel
  const cardsData = data.map((artwork) => ({
    src: artwork.image || "/placeholder-artist.jpg",
    alt: artwork.name || "Artiste inconnu",
    title: artwork.title || "Unknown",
  }));

  // Gestion affichage selon état
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 text-white">
        Chargement des oeuvres de l'artiste...
      </div>
    );
  }

  if (error) {
    console.error("Erreur API:", error);
    return (
      <div className="flex justify-center items-center h-48 text-red-500">
        Erreur lors du chargement des oeuvres de l'artiste.
      </div>
    );
  }

  return (
    <div className="flex justify-center text-center ">
      <div className="mt-18">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
            Artistic Masters
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Explore the most influential artists throughout history and their
          revolutionary contributions to the world of art
        </p>
        <div className="flex items-center gap-6">
          <div className="relative w-full ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex-1" />
            <input
              type="text"
              placeholder="Search artists..."
              className="w-full text-gray-400 pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
              value={searchInput}
              onChange={handleInputChange}
            />
          </div>
          <div className="border-2 border-transparent bg-gray-800 py-2 px-3 rounded-lg hover:bg-gray-900 hover:border-fuchsia-500 transition-colors">
            <ListFilter className="text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {cardsData.map(({ src, alt, title }, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] cursor-pointer group"
            >
              <img src={src} alt={alt} className="w-full h-full object-cover" />

              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

              {/* Texte au hover */}
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <h3 className="text-lg font-bold">{alt}</h3>
                <p className="text-sm text-gray-200">{title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainHub;
