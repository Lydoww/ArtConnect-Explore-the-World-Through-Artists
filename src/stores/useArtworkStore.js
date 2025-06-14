import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useArtworkStore = create(
  persist(
    (set, get) => ({
      savedArtwork: [],

      addArtwork: (artwork) => {
        const stored = get().savedArtwork;
        const exists = stored.some((item) => item.id === artwork.id);
        if (exists) return;

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
        set({ savedArtwork: updated });
      },

      removeArtwork: (idToRemove) => {
        const updated = get().savedArtwork.filter(
          (item) => item.id !== idToRemove
        );
        set({ savedArtwork: updated });
      },

      getStyleCounts: () => {
        const counts = {};
        get().savedArtwork.forEach((artwork) => {
          const styles = artwork.style?.split(", ") || ["Unknown"];
          styles.forEach((style) => {
            const cleaned = style.trim();
            counts[cleaned] = (counts[cleaned] || 0) + 1;
          });
        });
        return counts;
      },

      getRecentArtworks: () => {
        return [...get().savedArtwork]
          .filter((a) => a.savedAt)
          .sort((a, b) => b.savedAt - a.savedAt)
          .slice(0, 3);
      },
    }),
    {
      name: "artwork-storage",
    }
  )
);
