import { useMemo } from "react";
import { useArtworkStore } from "../stores/useArtworkStore";

export const useProfileData = () => {
  const savedArtwork = useArtworkStore((s) => s.savedArtwork);

  const styleCounts = useMemo(() => {
    const counts = {};
    savedArtwork.forEach((artwork) => {
      const styles = artwork.style?.split(", ") || [];
      styles.forEach((style) => {
        const cleaned = style.trim();
        if (cleaned && cleaned !== "Unknown") {
          counts[cleaned] = (counts[cleaned] || 0) + 1;
        }
      });
    });
    return counts;
  }, [savedArtwork]);

  const recentArtworks = useMemo(() => {
    return [...savedArtwork]
      .filter((a) => a.savedAt)
      .sort((a, b) => b.savedAt - a.savedAt)
      .slice(0, 3);
  }, [savedArtwork]);

  const artistCounts = useMemo(() => {
    return savedArtwork.reduce((acc, { artist }) => {
      const name = artist || "Unknown Artist";
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});
  }, [savedArtwork]);

  const favoriteArtists = useMemo(() => {
    return Object.entries(artistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);
  }, [artistCounts]);

  const artStyles = useMemo(() => {
    return Object.entries(styleCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([style]) => style)
      .slice(0, 6);
  }, [styleCounts]);

  return {
    savedArtwork,
    recentArtworks,
    styleCounts,
    favoriteArtists,
    artStyles,
    artistCounts,
  };
};
