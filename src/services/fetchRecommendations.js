import apiClient from "../api/apiClient";

// Recommande d'autres œuvres des artistes les plus likés
export const fetchRecommendations = async ({ savedArtwork }, limit = 3) => {
  const results = [];
  const seenIds = new Set(savedArtwork.map((a) => a.id));

  // Compter les artistes les plus likés
  const artistCounts = {};
  for (const artwork of savedArtwork) {
    const artist = artwork.artist || "Unknown";
    artistCounts[artist] = (artistCounts[artist] || 0) + 1;
  }

  const topArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([artist]) => artist)
    .slice(0, limit);

  for (const artist of topArtists) {
    try {
      const response = await apiClient.get("", {
        params: {
          q: artist,
          imgonly: true,
          ps: 20,
          type: "painting",
          s: "relevance",
        },
      });

      const artworks = response.data.artObjects || [];

      const filtered = artworks.filter(
        (item) => item.webImage?.url && !seenIds.has(item.objectNumber)
      );

      if (filtered.length > 0) {
        const picked = filtered[Math.floor(Math.random() * filtered.length)];

        const detailRes = await apiClient.get(`/${picked.objectNumber}`);
        const enriched = detailRes?.data?.artObject;

        if (!enriched) {
          console.warn("Détail manquant pour :", picked.objectNumber);
          continue; // passe à l’artiste suivant
        }

        results.push({
          id: enriched.objectNumber,
          title: enriched.title,
          artist: enriched.principalOrFirstMaker,
          image: enriched.webImage?.url,
          styles: enriched.objectTypes || [],
          techniques: enriched.materials || [],
          period: enriched.dating?.presentingDate || null,
          culture: enriched.productionPlaces?.[0] || null,
        });
      }
    } catch (err) {
      console.error("Erreur recommandation pour:", artist, err);
    }
  }

  return results;
};
