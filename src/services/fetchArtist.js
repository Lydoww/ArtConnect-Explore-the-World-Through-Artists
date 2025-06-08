import apiClient from "../api/apiClient";

export const fetchArtist = async (searchTerm) => {
  try {
    const response = await apiClient.get("", {
      params: {
        q: searchTerm,
        imgonly: true,
        ps: 10,
        s: "relevance",
        type: "painting",
      },
    });

    const artObjects = response.data?.artObjects || [];

    return artObjects
      .map((item) => ({
        id: item.id,
        title: item.title,
        artist: item.principalOrFirstMaker,
        image: item.webImage?.url || null,
      }))
      .filter((item) => item.image !== null);
  } catch (error) {
    console.error("Erreur détaillée:", {
      status: error.response?.status,
      message: error.message,
      config: error.config,
    });
    throw error;
  }
};
