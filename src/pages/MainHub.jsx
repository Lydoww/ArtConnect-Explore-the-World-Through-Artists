import { useEffect, useState } from "react";
import { Search, ListFilter, Heart } from "lucide-react";
import { useArtist } from "../hooks/useArtist";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
import MainHubSkeleton from "../components/ui/skeleton/MainHubSkeleton";

const MainHub = () => {
  const [searchInput, setSearchInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const { data = [], error, isLoading } = useArtist(debouncedSearchTerm);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      setHasSearched(true);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const cardsData = data.map((artwork) => ({
    src: artwork.image || "https://via.placeholder.com/400x600?text=No+Image",
    alt: artwork.artist || "Artiste inconnu",
    title: artwork.title || "Unknown",
    id: artwork.id.replace(/^en-/, ""),
  }));

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
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
            Artistic Masters
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Explore the most influential artists throughout history and their
          revolutionary contributions to the world of art
        </p>

        <div className="flex justify-center">
          {" "}
          {/* Conteneur qui centre tout */}
          <div className="flex items-center gap-6 w-[400px]">
            {" "}
            {/* Largeur fixe */}
            <div className="relative w-[340px] h-12">
              {" "}
              {/* Largeur fixe pour l'input */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search artists..."
                className="w-full h-full text-gray-400 pl-10 pr-4 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                value={searchInput}
                onChange={handleInputChange}
              />
            </div>
            <div className="border-2 border-transparent bg-gray-800 py-2 px-3 rounded-lg hover:bg-gray-900 hover:border-fuchsia-500 transition-colors flex-shrink-0">
              <ListFilter className="text-white" />
            </div>
          </div>
        </div>

        <div className="relative mt-8">
          {/* ✅ Message si aucune œuvre n'est trouvée */}
          {!isLoading && data.length === 0 && hasSearched && (
            <div className="text-center text-gray-400 text-lg mt-12">
              No artworks found for{" "}
              <span className="text-white font-semibold">
                {debouncedSearchTerm}
              </span>{" "}
              on the Rijksmuseum API.
            </div>
          )}
          {/* Images affichées avec effet pendant le chargement */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <MainHubSkeleton key={`skeleton-${i}`} />
                ))
              : cardsData.map(({ src, alt, title, id }, index) => (
                  <Link
                    to={`/art/${id}`}
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] cursor-pointer group"
                  >
                    {/* Heart en haut à gauche */}
                    <div className="absolute top-3 right-3 z-10 text-white opacity-70 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-5 h-5" />
                    </div>
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <h3 className="text-lg font-bold">{alt}</h3>
                      <p className="text-sm text-gray-200">{title}</p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHub;
