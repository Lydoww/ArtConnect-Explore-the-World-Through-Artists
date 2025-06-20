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
        type: "painting",
        _: Date.now(),
      },
    });

    const { artObjects } = fullResponse.data;

    if (!artObjects || !Array.isArray(artObjects)) {
      throw new Error("Réponse API inattendue");
    }

    const uniqueArtists = [];
    const seenArtists = new Set();

    const shuffledObjects = [...artObjects].sort(() => Math.random() - 0.5);

    shuffledObjects.forEach((artwork) => {
      const artistName = artwork.principalOrFirstMaker;

      if (
        !artistName ||
        artistName.toLowerCase() === "anonymous" ||
        seenArtists.has(artistName)
      ) {
        return;
      }

      seenArtists.add(artistName);

      const resizedImage =
        artwork.webImage?.url?.replace(/=s\d+/, "=s800") ||
        artwork.headerImage?.url?.replace(/=s\d+/, "=s800") ||
        "/placeholder-artist.jpg";

      uniqueArtists.push({
        id: artwork.id,
        title: artwork.title || "Œuvre sans titre",
        artist: artistName,
        image: resizedImage,
        // Ajouter artworkTitle pour la cohérence
        artworkTitle: artwork.title,
        // Ajouter principalOrFirstMaker pour la cohérence
        principalOrFirstMaker: artistName,
      });
    });

    return uniqueArtists.slice(0, count);
  } catch (error) {
    console.error("Erreur API :", error);
    throw new Error("Impossible de charger les artistes");
  }
};
