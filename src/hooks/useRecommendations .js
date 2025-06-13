import { useEffect, useState } from "react";
import { fetchRecommendations } from "../services/fetchRecommendations";
import { useSavedArtwork } from "./useSavedArtwork";

export const useRecommendations = () => {
  const { savedArtwork } = useSavedArtwork();
  const [recommendations, setRecommendations] = useState([]);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (savedArtwork.length === 0) {

        setRecommendations([])
        setLoading(false);
        return 
      } 

      setLoading(true)
      const data = await fetchRecommendations({ savedArtwork });
      setRecommendations(data)
      setLoading(false)
    };

    fetch();
  }, [savedArtwork]);

  return {recommendations, loading};
};
