import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL_RIJK,
  timeout: 15000, // Augmentez le timeout
  params: {
    key: import.meta.env.VITE_RIJKSMUSEUM_API_KEY,
    format: "json",
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Intercepteur pour logging
apiClient.interceptors.request.use((config) => {
  console.debug("Requête envoyée:", config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.debug("Réponse reçue:", response.config.url);
    return response;
  },
  (error) => {
    console.error("Erreur API:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
