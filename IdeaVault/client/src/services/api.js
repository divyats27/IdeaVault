import axios from "axios";

export const TOKEN_KEY = "ideavault_token";

// One Axios instance used by the whole app
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Automatically attach the JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- Auth ----------
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");

// ---------- Ideas ----------
export const getIdeas = () => api.get("/ideas");
export const getIdea = (id) => api.get(`/ideas/${id}`);
export const createIdea = (data) => api.post("/ideas", data);
export const updateIdea = (id, data) => api.put(`/ideas/${id}`, data);
export const deleteIdea = (id) => api.delete(`/ideas/${id}`);
export const toggleFavoriteIdea = (id) => api.patch(`/ideas/${id}/favorite`);

// Turn any error into a short, friendly message
export const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.request) {
    return "Cannot reach the server. Make sure the backend is running.";
  }
  return "Something went wrong. Please try again.";
};

export default api;
