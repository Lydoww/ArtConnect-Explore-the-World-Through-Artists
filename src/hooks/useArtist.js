import { useQuery } from "@tanstack/react-query";
import { fetchArtist } from "../services/fetchArtist";

export const useArtist = (searchTerm) => {
  return useQuery({
    queryKey: ["artists", searchTerm],
    queryFn: ({ queryKey }) => {
      const [, searchTerm] = queryKey;
      return fetchArtist(searchTerm);
    },
    enabled: !!searchTerm,
  });
};
