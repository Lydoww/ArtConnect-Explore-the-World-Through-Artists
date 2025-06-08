import apiClient from "../api/apiClient";

export const fetchArtwork = async (id) => {
  console.log("Fetching artwork with id:", id);
  const response = await apiClient.get(`${id}`, {
    params: {
      key: import.meta.env.VITE_RIJKSMUSEUM_API_KEY,
      format: "json",
    },
  });
  console.log("✅ API response:", response.data);
  return response.data.artObject;
};
