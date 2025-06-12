import { useSavedArtwork } from "./useSavedArtwork";

export const useProfileData = () => {
  const { savedArtwork, recentArtworks, styleCounts } = useSavedArtwork();

  const artistCounts = savedArtwork.reduce((acc, artwork) => {
    const artist = artwork.artist || "Unknown Artist";
    acc[artist] = (acc[artist] || 0) + 1;
    return acc;
  }, {});

  const favoriteArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([artist]) => artist);

  const artStyles = Object.entries(styleCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([style]) => style)
    .slice(0, 6);

  return {
    savedArtwork,
    recentArtworks,
    styleCounts,
    favoriteArtists,
    artStyles,
    artistCounts,
  };
};
