import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getIdea,
  deleteIdea,
  toggleFavoriteIdea,
  getErrorMessage,
} from "../services/api.js";
import { formatDate } from "../utils/formatDate.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function ViewIdea() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getIdea(id)
      .then((res) => setIdea(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavorite = async () => {
    try {
      const res = await toggleFavoriteIdea(id);
      setIdea(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this idea?")) return;
    try {
      await deleteIdea(id);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <Loading text="Loading idea..." />;

  if (!idea) {
    return (
      <div className="page narrow">
        <ErrorMessage message={error || "Idea not found"} />
        <Link to="/dashboard" className="back-link">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  const statusClass = "badge status-" + idea.status.toLowerCase().replace(" ", "-");

  return (
    <div className="page narrow">
      <Link to="/dashboard" className="back-link">
        ← Back to dashboard
      </Link>

      <article className="card detail-card">
        <ErrorMessage message={error} />

        <div className="detail-top">
          <div className="badge-row">
            <span className="badge category-badge">{idea.category}</span>
            <span className={statusClass}>{idea.status}</span>
          </div>
          <button
            className={idea.favorite ? "icon-btn fav active" : "icon-btn fav"}
            onClick={handleFavorite}
            aria-label={idea.favorite ? "Remove from favorites" : "Add to favorites"}
            title={idea.favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {idea.favorite ? "★" : "☆"}
          </button>
        </div>

        <h1>{idea.title}</h1>
        <p className="detail-description">{idea.description}</p>

        <div className="detail-section">
          <h3>Tags</h3>
          {idea.tags.length === 0 ? (
            <p className="muted">No tags</p>
          ) : (
            <div className="tag-list">
              {idea.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="detail-dates">
          <span>Created: {formatDate(idea.createdAt)}</span>
          <span>Updated: {formatDate(idea.updatedAt)}</span>
        </div>

        <div className="detail-actions">
          <Link to={`/ideas/${idea._id}/edit`} className="btn btn-primary">
            ✏️ Edit
          </Link>
          <button className="btn btn-danger-light" onClick={handleDelete}>
            🗑 Delete
          </button>
        </div>
      </article>
    </div>
  );
}

export default ViewIdea;
