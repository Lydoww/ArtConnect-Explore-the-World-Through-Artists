import apiClient from "../api/apiClient";

export const fetchLandingPage = async () => {
  const artists = await fetchRandomArtists();
  return { artists };
};

export const fetchRandomArtists = async (count = 6) => {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1;

    const fullResponse = await apiClient.get("", {
      params: {
        p: randomPage,
        key: import.meta.env.VITE_RIJKSMUSEUM_API_KEY,
        ps: count * 3,
        imgonly: true,
        toppieces: true,
        _: Date.now(),
      },
    });

    const { artObjects } = fullResponse;

    if (!artObjects || !Array.isArray(artObjects)) {
      throw new Error("Réponse API inattendue");
    }

    const uniqueArtists = [];
    const seenArtists = new Set();

    const shuffledObjects = [...artObjects].sort(() => Math.random() - 0.5);

    shuffledObjects.forEach((artwork) => {
      const artistName = artwork.principalOrFirstMaker;

      // Filtre les artistes anonymes et doublons
      if (
        !artistName ||
        artistName.toLowerCase() === "anonymous" ||
        seenArtists.has(artistName)
      ) {
        return;
      }

      seenArtists.add(artistName);
      uniqueArtists.push({
        name: artistName,
        image:
          artwork.webImage?.url ||
          artwork.headerImage?.url ||
          "/placeholder-artist.jpg",
        artworkTitle: artwork.title || "Œuvre sans titre",
      });
    });

    return uniqueArtists.slice(0, count);
  } catch (error) {
    console.error("Erreur API :", error);
    throw new Error("Impossible de charger les artistes");
  }
};
