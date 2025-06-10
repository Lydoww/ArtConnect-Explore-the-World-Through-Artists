import { useQuery } from "@tanstack/react-query";
import { fetchArtist } from "../services/fetchArtist";

export const useArtist = (searchTerm, page = 1) => {
  return useQuery({
    queryKey: ["artists", searchTerm.trim(), page],
    queryFn: ({ queryKey }) => {
      const [, term, currentPage] = queryKey;
      return fetchArtist(term, currentPage);
    },
    enabled: !!searchTerm?.trim(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
