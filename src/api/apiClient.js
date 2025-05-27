import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL_RIJK,
  timeout: 10000, 
  params: {
    
    key: import.meta.env.VITE_RIJKSMUSEUM_API_KEY,
    format: "json",
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour erreurs globales
apiClient.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "API request failed");
  }
);
