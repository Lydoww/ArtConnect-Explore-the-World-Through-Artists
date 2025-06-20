import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useArtist } from "../hooks/useArtist";
import { useDebounce } from "../hooks/useDebounce";
import { useArtworkStore } from "../stores/useArtworkStore";
import { useSearchState } from "../hooks/useSearchState";
import ArtworkCard from "../components/mainhub/ArtworkCard";
import SearchBar from "../components/mainhub/SearchBar";
import ArtworkCardSkeleton from "../components/ui/skeleton/ArtworkCardSkeleton";
import { useRandomArtists } from "../hooks/useRandomArtists";

const MainHub = () => {
  const { searchInput, setSearchInput, page, setPage } = useSearchState();
  const [addedFeedback, setAddedFeedback] = useState(new Set());
  const [hasSearched, setHasSearched] = useState(
    () => searchInput.trim() !== ""
  );

  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const { data = [], error, isLoading } = useArtist(debouncedSearchTerm, page);
  const { data: randomData = [], isLoading: isRandomLoading } =
    useRandomArtists(12);

  const savedArtwork = useArtworkStore((s) => s.savedArtwork);
  const addArtwork = useArtworkStore((s) => s.addArtwork);
  const removeArtwork = useArtworkStore((s) => s.removeArtwork);

  useEffect(() => {
    setHasSearched(debouncedSearchTerm.trim() !== "");
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleToggleArtwork = (artwork) => {
    const id = artwork.id?.replace(/^en-/, "");
    if (!id) return;

    const isSaved = savedArtwork.some((item) => item.id === id);
    if (isSaved) {
      removeArtwork(id);
    } else {
      addArtwork({ ...artwork, id });
      setAddedFeedback((prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
      setTimeout(() => {
        setAddedFeedback((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 1000);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 text-red-500">
        Error loading artworks.
      </div>
    );
  }

  const artworksToDisplay = hasSearched ? data : randomData;
  const loading = hasSearched ? isLoading : isRandomLoading;

  return (
    <div className="flex justify-center text-center">
      <div className="w-full max-w-8xl px-4"> 
      <div>
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
            Artistic Masters
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Explore the most influential artists throughout history and their
          revolutionary contributions to the world of art
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-6 w-[400px]">
            <SearchBar
              searchInput={searchInput}
              handleInputChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* No results message */}
        {!isLoading && data.length === 0 && hasSearched && (
          <div className="text-center text-gray-400 text-lg mt-12">
            No artworks found for{" "}
            <span className="text-white font-semibold">
              {debouncedSearchTerm}
            </span>
            .
          </div>
        )}

        {/* Artwork Grid */}
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ArtworkCardSkeleton key={i} />
                ))
              : artworksToDisplay.map((artwork, index) => {
                  const id = artwork.id?.replace(/^en-/, "");
                  const src =
                    artwork.image ||
                    "https://via.placeholder.com/400x600?text=No+Image";
                  const alt =
                    artwork.artist || artwork.name || "Unknown Artist";
                  const title =
                    artwork.title || artwork.artworkTitle || "Untitled";
                  const isSaved = savedArtwork.some((item) => item.id === id);
                  const wasJustAdded = addedFeedback.has(id);

                  return (
                    <ArtworkCard
                      key={index}
                      id={id}
                      src={src}
                      alt={alt}
                      title={title}
                      isSaved={isSaved}
                      wasJustAdded={wasJustAdded}
                      onToggleArtwork={() => handleToggleArtwork(artwork)}
                    />
                  );
                })}
          </div>
        </div>

        {/* Pagination */}
        {hasSearched && data.length > 0 && (
          <div className="pagination-controls mt-8 flex justify-center items-center gap-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border"
              aria-label="Previous page"
            >
              <ChevronLeft className="text-xl text-black" />
            </button>
            <span className="text-white text-lg font-medium">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={data.length < 10}
              className="bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border"
              aria-label="Next page"
            >
              <ChevronRight className="text-xl text-black" />
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MainHub;
