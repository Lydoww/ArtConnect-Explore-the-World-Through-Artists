import apiClient from "../api/apiClient";

// Prend les noms des 3 artistes les plus likés
export const fetchRecommendations = async (
  { savedArtwork },
  limit = 3
) => {
  const results = [];
  const seenIds = new Set(savedArtwork.map((a) => a.id));
  const artistCounts = {};

  // Compter les artistes
  for (const artwork of savedArtwork) {
    const artist = artwork.artist || "Unknown";
    artistCounts[artist] = (artistCounts[artist] || 0) + 1;
  }

  // Trier les artistes par nombre de likes
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
          ps: 10,
          type: "painting",
          s: "relevance",
        },
      });

      const artworks = response.data.artObjects || [];

      // Exclure les œuvres déjà likées
      const filtered = artworks.filter(
        (item) => item.webImage?.url && !seenIds.has(item.id)
      );

      if (filtered.length > 0) {
        // Prendre une œuvre aléatoire parmi les restantes
        const picked = filtered[Math.floor(Math.random() * filtered.length)];

        results.push({
          id: picked.id,
          title: picked.title,
          artist: picked.principalOrFirstMaker,
          imageUrl: picked.webImage.url,
        });

        seenIds.add(picked.id); // éviter doublons dans une même session
      }
    } catch (err) {
      console.error("Erreur recommandation pour:", artist, err);
    }
  }

  return results;
};
