import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useIdeas from "../hooks/useIdeas.js";
import { filterIdeas } from "../utils/filterIdeas.js";
import { CATEGORIES } from "../utils/constants.js";
import SearchBar from "../components/SearchBar.jsx";
import FilterBar from "../components/FilterBar.jsx";
import IdeaCard from "../components/IdeaCard.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

// view="home"  -> welcome message + statistics + ideas
// view="ideas" -> only the ideas (used by the "My Ideas" link)
function Dashboard({ view = "home" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { ideas, loading, error, toggleFavorite, removeIdea } = useIdeas();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "All", status: "All", favorite: "All" });

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Statistics are based on ALL ideas (not only the filtered ones)
  const totalIdeas = ideas.length;
  const favoriteCount = ideas.filter((idea) => idea.favorite).length;
  const inProgressCount = ideas.filter((idea) => idea.status === "In Progress").length;

  // Search and filters work together
  const visibleIdeas = filterIdeas(ideas, { search, ...filters });
  const isFiltering =
    search.trim() !== "" ||
    filters.category !== "All" ||
    filters.status !== "All" ||
    filters.favorite !== "All";

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{view === "home" ? `Welcome, ${user.name}!` : "My Ideas"}</h1>
          <p className="muted">
            {view === "home" ? "Here is everything in your vault." : "Search, filter and manage your ideas."}
          </p>
        </div>
        <div className="header-actions">
          <Link to="/add" className="btn btn-primary">
            + Add New Idea
          </Link>
          <button className="btn btn-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {view === "home" && !loading && !error && (
        <section className="stats-section">
          <div className="stats-grid">
            <div className="card stat-card">
              <span className="stat-number">{totalIdeas}</span>
              <span className="stat-label">Total Ideas</span>
            </div>
            <div className="card stat-card">
              <span className="stat-number">{favoriteCount}</span>
              <span className="stat-label">Favorites</span>
            </div>
            <div className="card stat-card">
              <span className="stat-number">{inProgressCount}</span>
              <span className="stat-label">In Progress</span>
            </div>
          </div>

          <div className="category-counts">
            {CATEGORIES.map((category) => (
              <span key={category} className="badge category-badge">
                {category}: {ideas.filter((idea) => idea.category === category).length}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar filters={filters} onChange={handleFilterChange} />
      </section>

      <ErrorMessage message={error} />

      {loading ? (
        <Loading text="Loading your ideas..." />
      ) : (
        !error &&
        (visibleIdeas.length === 0 ? (
          <div className="card empty-state">
            {isFiltering ? (
              <>
                <h3>No ideas match your search</h3>
                <p className="muted">Try a different keyword or clear the filters.</p>
              </>
            ) : (
              <>
                <h3>Your vault is empty</h3>
                <p className="muted">Save your first idea before you forget it.</p>
                <Link to="/add" className="btn btn-primary">
                  + Add New Idea
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="ideas-grid">
            {visibleIdeas.map((idea) => (
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

export default Dashboard;
