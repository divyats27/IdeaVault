import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate.js";

// Turns "In Progress" into "in-progress" for the CSS class name
const statusClass = (status) => "badge status-" + status.toLowerCase().replace(" ", "-");

function IdeaCard({ idea, onToggleFavorite, onDelete }) {
  return (
    <article className="card idea-card">
      <div className="idea-card-top">
        <span className="badge category-badge">{idea.category}</span>
        <button
          className={idea.favorite ? "icon-btn fav active" : "icon-btn fav"}
          onClick={() => onToggleFavorite(idea._id)}
          aria-label={idea.favorite ? "Remove from favorites" : "Add to favorites"}
          title={idea.favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {idea.favorite ? "★" : "☆"}
        </button>
      </div>

      <h3 className="idea-title">{idea.title}</h3>
      <p className="idea-description">{idea.description}</p>

      <div className="idea-meta">
        <span className={statusClass(idea.status)}>{idea.status}</span>
        <span className="muted small">{formatDate(idea.createdAt)}</span>
      </div>

      <div className="idea-actions">
        <Link to={`/ideas/${idea._id}`} className="btn btn-small btn-light">
          👁 View
        </Link>
        <Link to={`/ideas/${idea._id}/edit`} className="btn btn-small btn-light">
          ✏️ Edit
        </Link>
        <button className="btn btn-small btn-danger-light" onClick={() => onDelete(idea._id)}>
          🗑 Delete
        </button>
      </div>
    </article>
  );
}

export default IdeaCard;
