import apiClient from "../api/apiClient";

const API_KEY = import.meta.env.VITE_RIJKSMUSEUM_API_KEY;

export const fetchRandomArtists = async (count = 6) => {
  try {
    const { artObjects } = await apiClient.get("/collection", {
      params: {
        ps: count,
        imgonly: true,
        toppieces: true,
        s: "relevance", // Tri par pertinence
      },
    });

    // Filtre les artistes uniques
    const uniqueArtists = [];
    const seenArtists = new Set();

    artObjects.forEach((artwork) => {
      const artistName = artwork.principalOrFirstMaker;
      if (artistName && !seenArtists.has(artistName)) {
        seenArtists.add(artistName);
        uniqueArtists.push({
          name: artistName,
          image: artwork.webImage?.url || "/placeholder-artist.jpg",
          artworkTitle: artwork.title,
          id: artwork.objectNumber,
          century:
            artwork.dating?.presentingDate?.slice(0, 2) + "00s" || "Unknown",
        });
      }
    });

    return uniqueArtists.slice(0, count);
  } catch (error) {
    console.error("Rijksmuseum API Error:", error);
    throw new Error("Could not load artists. Please try again later.");
  }
};
