import { useState, useEffect } from "react";

export function useSavedArtwork() {
  const [savedArtwork, setSavedArtwork] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("artwork")) || [];
    setSavedArtwork(stored);
  }, []);

  const addArtwork = (artwork) => {
    const exists = savedArtwork.some((item) => item.id === artwork.id);
    if (!exists) {
      const updated = [...savedArtwork, artwork];
      localStorage.setItem("artwork", JSON.stringify(updated));
      setSavedArtwork(updated);
    }
  };

  return { savedArtwork, addArtwork };
}
