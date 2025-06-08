import { useQuery } from "@tanstack/react-query";
import { fetchArtwork } from "../services/fetchArtwork";

export const useArtwork = (id) => {
  return useQuery({
    queryKey: ["artwork", id],
    queryFn: () => fetchArtwork(id),
  });
};
