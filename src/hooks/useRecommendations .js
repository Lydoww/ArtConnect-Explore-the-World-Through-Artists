import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "../services/fetchRecommendations";
import { useSavedArtwork } from "./useSavedArtwork";

export const useRecommendations = () => {
  const { savedArtwork } = useSavedArtwork();

  return useQuery({
    queryKey: ["recommendations", savedArtwork.map(a => a.id)],
    queryFn: () => fetchRecommendations({ savedArtwork }),
    enabled: savedArtwork.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};
