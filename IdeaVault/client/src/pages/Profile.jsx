import { useAuth } from "../context/AuthContext.jsx";
import useIdeas from "../hooks/useIdeas.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function Profile() {
  const { user } = useAuth();
  const { ideas, loading, error } = useIdeas();

  return (
    <div className="page narrow">
      <div className="card profile-card">
        <div className="avatar" aria-hidden="true">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h1>{user.name}</h1>
        <p className="muted">{user.email}</p>

        <ErrorMessage message={error} />

        {loading ? (
          <Loading text="Loading your stats..." />
        ) : (
          !error && (
            <div className="stats-grid two-cols">
              <div className="card stat-card">
                <span className="stat-number">{ideas.length}</span>
                <span className="stat-label">Total Ideas</span>
              </div>
              <div className="card stat-card">
                <span className="stat-number">{ideas.filter((idea) => idea.favorite).length}</span>
                <span className="stat-label">Favorite Ideas</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Profile;
