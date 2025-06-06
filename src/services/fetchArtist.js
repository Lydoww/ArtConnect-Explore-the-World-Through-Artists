import apiClient from "../api/apiClient";

export const fetchArtist = async (searchTerm) => {
  const response = await apiClient.get("/collection", {
    params: {
      q: searchTerm,
    },
  });
  const { artObjects } = response;
  return artObjects.map((item) => ({
    id: item.id,
    title: item.title,
    artist: item.principalOrFirstMaker,
    image: item.webImage?.url || null,
  }));
};
