import { useCallback, useEffect, useState } from "react";
import {
  getIdeas,
  deleteIdea,
  toggleFavoriteIdea,
  getErrorMessage,
} from "../services/api.js";

// Loads all ideas of the logged-in user and gives helper functions.
// Used by Dashboard, Favorites and Profile pages.
function useIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadIdeas = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getIdeas();
      setIdeas(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  const toggleFavorite = async (id) => {
    setError("");
    try {
      const res = await toggleFavoriteIdea(id);
      setIdeas((current) => current.map((idea) => (idea._id === id ? res.data : idea)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const removeIdea = async (id) => {
    if (!window.confirm("Are you sure you want to delete this idea?")) return;
    setError("");
    try {
      await deleteIdea(id);
      setIdeas((current) => current.filter((idea) => idea._id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return { ideas, loading, error, toggleFavorite, removeIdea, reload: loadIdeas };
}

export default useIdeas;
