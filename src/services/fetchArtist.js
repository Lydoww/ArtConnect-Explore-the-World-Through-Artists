import apiClient from "../api/apiClient";

export const fetchArtist = async (searchTerm) => {
  try {
    const response = await apiClient.get("", {
      params: { q: searchTerm, imgonly: true },
    });

    const { artObjects } = response;

    return artObjects
      .map((item) => ({
        id: item.id,
        title: item.title,
        artist: item.principalOrFirstMaker,
        image: item.webImage?.url || null,
      }))
      .filter((item) => item.image !== null);
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};
