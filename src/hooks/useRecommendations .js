import { useEffect, useState } from "react";
import { fetchRecommendations } from "../services/fetchRecommendations";
import { useSavedArtwork } from "./useSavedArtwork";

export const useRecommendations = () => {
  const { savedArtwork } = useSavedArtwork();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (savedArtwork.length === 0) return;

      const data = await fetchRecommendations({ savedArtwork });
      setRecommendations(data);
    };

    fetch();
  }, [savedArtwork]);

  return recommendations;
};
