import { useQuery } from "@tanstack/react-query";
import { fetchRandomArtists } from "../services/randomArtists";

export const useFetchLandingPage = (count = 6) => {
  return useQuery({
    queryKey: ["landingPage", count],
    queryFn: () => fetchRandomArtists(count),
  });
};
