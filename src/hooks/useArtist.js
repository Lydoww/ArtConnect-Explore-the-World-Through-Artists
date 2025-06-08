import { useQuery } from "@tanstack/react-query";
import { fetchArtist } from "../services/fetchArtist";

export const useArtist = (searchTerm) => {
  return useQuery({
    queryKey: ["artists", searchTerm.trim()],
    queryFn: ({ queryKey }) => {
      const [, term] = queryKey;
      return fetchArtist(term);
    },
    enabled: !!searchTerm?.trim(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
