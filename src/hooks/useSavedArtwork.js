import { useState, useEffect, useMemo } from "react";

export function useSavedArtwork() {
  const [savedArtwork, setSavedArtwork] = useState([]);

  // Chargement initial depuis localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("artwork")) || [];
    setSavedArtwork(stored);
  }, []);
  console.log("saved work:", savedArtwork)

  // Ajouter une œuvre
  const addArtwork = (artwork) => {
    const stored = JSON.parse(localStorage.getItem("artwork")) || [];
    const exists = stored.some((item) => item.id === artwork.id);

    if (!exists) {
      const inferredStyle =
        artwork.styles?.join(", ") ||
        artwork.techniques?.join(", ") ||
        artwork.period ||
        artwork.culture ||
        "Unknown";

      const artworkWithExtras = {
        ...artwork,
        style: inferredStyle,
        savedAt: Date.now(),
      };

      const updated = [artworkWithExtras, ...stored];
      localStorage.setItem("artwork", JSON.stringify(updated));
      setSavedArtwork(updated);
    }
  };

  // Compter le nombre d’œuvres par style
  const styleCounts = useMemo(() => {
    const counts = {};

    savedArtwork.forEach((artwork) => {
      const styles = artwork.style?.split(", ") || ["Unknown"];

      styles.forEach((style) => {
        const cleanedStyle = style.trim();
        counts[cleanedStyle] = (counts[cleanedStyle] || 0) + 1;
      });
    });

    return counts;
  }, [savedArtwork]);

  // Dernières œuvres sauvegardées
  const recentArtworks = useMemo(() => {
    return [...savedArtwork]
      .filter((item) => item.savedAt)
      .sort((a, b) => b.savedAt - a.savedAt)
      .slice(0, 3);
  }, [savedArtwork]);

  return {
    savedArtwork,
    addArtwork,
    recentArtworks,
    styleCounts,
  };
}
