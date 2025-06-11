import { useEffect, useState } from "react";
import {
  Search,
  ListFilter,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useArtist } from "../hooks/useArtist";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
import MainHubSkeleton from "../components/ui/skeleton/MainHubSkeleton";
import { useSavedArtwork } from "../hooks/useSavedArtwork";

const MainHub = () => {
  // Initialisation avec localStorage pour garder la recherche + page
  const [searchInput, setSearchInput] = useState(() => {
    return localStorage.getItem("lastSearchInput") || "";
  });
  const [page, setPage] = useState(() => {
    return parseInt(localStorage.getItem("lastSearchPage") || "1", 10);
  });
  const [addedFeedback, setAddedFeedback] = useState(new Set());
  const [hasSearched, setHasSearched] = useState(
    () => searchInput.trim() !== ""
  );

  // Debounce sur la recherche pour éviter trop de requêtes
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // Hook de fetch avec React Query
  const { data = [], error, isLoading } = useArtist(debouncedSearchTerm, page);
  const { savedArtwork, addArtwork } = useSavedArtwork();

  // Sauvegarder searchInput dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("lastSearchInput", searchInput);
  }, [searchInput]);

  // Sauvegarder page dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("lastSearchPage", page.toString());
  }, [page]);

  // Mettre à jour hasSearched selon debouncedSearchTerm uniquement
  useEffect(() => {
    setHasSearched(debouncedSearchTerm.trim() !== "");
  }, [debouncedSearchTerm]);

  // Reset page à 1 à chaque nouvelle recherche
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const cardsData = data.map((artwork) => ({
    src: artwork.image || "https://via.placeholder.com/400x600?text=No+Image",
    alt: artwork.artist || "Unknown Artist",
    title: artwork.title || "Untitled",
    id: artwork.id.replace(/^en-/, ""),
  }));

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 text-red-500">
        Error loading artworks.
      </div>
    );
  }

  return (
    <div className="flex justify-center text-center">
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

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-6 w-[400px]">
            <div className="relative w-[340px] h-12">
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

        <div className="relative">
          {!isLoading && data.length === 0 && hasSearched && (
            <div className="text-center text-gray-400 text-lg mt-12">
              No artworks found for{" "}
              <span className="text-white font-semibold">
                {debouncedSearchTerm}
              </span>{" "}
              on the Rijksmuseum API.
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <MainHubSkeleton key={`skeleton-${i}`} />
                ))
              : cardsData.map(({ src, alt, title, id }, index) => {
                  const isSaved = savedArtwork.some((item) => item.id === id);
                  const wasJustAdded = addedFeedback.has(id);

                  return (
                    <Link
                      to={`/art/${id}`}
                      key={index}
                      className="relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] cursor-pointer group"
                    >
                      {/* Heart Icon */}
                      <div
                        className={`absolute top-3 right-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity ${
                          isSaved ? "text-green-500" : "text-white"
                        }`}
                      >
                        <Heart
                          className="w-5 h-5"
                          onClick={(e) => {
                            e.preventDefault();
                            addArtwork({ id, title, image: src, artist: alt });

                            // Feedback local
                            setAddedFeedback((prev) => new Set(prev).add(id));
                            setTimeout(() => {
                              setAddedFeedback((prev) => {
                                const updated = new Set(prev);
                                updated.delete(id);
                                return updated;
                              });
                            }, 2000);
                          }}
                        />
                      </div>

                      {/* Feedback local */}
                      {wasJustAdded && (
                        <div className="absolute top-10 right-3 z-20 bg-black/70 text-green-400 text-xs px-2 py-1 rounded">
                          Added to gallery !
                        </div>
                      )}

                      {/* Image */}
                      <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay + Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <h3 className="text-lg font-bold">{alt}</h3>
                        <p className="text-sm text-gray-200">{title}</p>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>

        {hasSearched && data.length > 0 && (
          <div className="pagination-controls mt-8 flex justify-center items-center gap-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed border"
              aria-label="Previous page"
            >
              <ChevronLeft className="text-xl text-black" />
            </button>

            <span className="text-white text-lg font-medium">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={data.length < 10}
              className="bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed border"
              aria-label="Next page"
            >
              <ChevronRight className="text-xl text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHub;
