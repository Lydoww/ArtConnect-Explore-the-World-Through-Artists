import { useQuery } from "@tanstack/react-query";
import { fetchRandomArtists } from "../services/randomArtists";

export const useRandomArtists = (count = 6) => {
  return useQuery({
    queryKey: ["random-artists", count],
    queryFn: () => fetchRandomArtists(count),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
