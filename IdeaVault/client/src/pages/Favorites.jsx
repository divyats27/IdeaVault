import { useState } from "react";
import { Link } from "react-router-dom";
import useIdeas from "../hooks/useIdeas.js";
import { filterIdeas } from "../utils/filterIdeas.js";
import SearchBar from "../components/SearchBar.jsx";
import IdeaCard from "../components/IdeaCard.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function Favorites() {
  const { ideas, loading, error, toggleFavorite, removeIdea } = useIdeas();
  const [search, setSearch] = useState("");

  // Only favorite ideas, then apply the search text
  const favoriteIdeas = filterIdeas(ideas, { search, favorite: "Favorites" });
  const hasAnyFavorite = ideas.some((idea) => idea.favorite);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Favorites</h1>
          <p className="muted">The ideas you starred.</p>
        </div>
      </div>

      <section className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
      </section>

      <ErrorMessage message={error} />

      {loading ? (
        <Loading text="Loading favorites..." />
      ) : (
        !error &&
        (favoriteIdeas.length === 0 ? (
          <div className="card empty-state">
            {hasAnyFavorite ? (
              <h3>No favorites match your search</h3>
            ) : (
              <>
                <h3>No favorites yet</h3>
                <p className="muted">Tap the star on an idea to add it here.</p>
                <Link to="/ideas" className="btn btn-primary">
                  Browse my ideas
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="ideas-grid">
            {favoriteIdeas.map((idea) => (
              <IdeaCard
                key={idea._id}
                idea={idea}
                onToggleFavorite={toggleFavorite}
                onDelete={removeIdea}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
