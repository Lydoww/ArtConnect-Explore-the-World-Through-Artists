import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "../services/fetchRecommendations";
import { useArtworkStore } from "../stores/useArtworkStore";

export const useRecommendations = () => {
  const savedArtwork = useArtworkStore((s) => s.savedArtwork);
  const setRecommendations = useArtworkStore((s) => s.setRecommendations);

  return useQuery({
    queryKey: ["recommendations", savedArtwork.map((a) => a.id)],
    queryFn: () => fetchRecommendations({ savedArtwork }),
    enabled: savedArtwork.length > 0,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      setRecommendations(data);
    },
  });
};
