import apiClient from "../api/apiClient";

export const fetchArtwork = async (id) => {
  const response = await apiClient.get(`${id}`, {
    params: {
      key: import.meta.env.VITE_RIJKSMUSEUM_API_KEY,
      format: "json",
    },
  });

  return response.data.artObject;
};
