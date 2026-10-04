import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getIdea, updateIdea, getErrorMessage } from "../services/api.js";
import IdeaForm from "../components/IdeaForm.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function EditIdea() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getIdea(id)
      .then((res) => setIdea(res.data))
      .catch((err) => setLoadError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError("");
    try {
      await updateIdea(id, data);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  if (loading) return <Loading text="Loading idea..." />;

  if (loadError) {
    return (
      <div className="page narrow">
        <ErrorMessage message={loadError} />
        <Link to="/dashboard" className="back-link">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="page narrow">
      <Link to={`/ideas/${id}`} className="back-link">
        ← Back to idea
      </Link>
      <div className="card form-card">
        <h1>Edit idea</h1>
        <IdeaForm
          initialValues={{
            title: idea.title,
            description: idea.description,
            category: idea.category,
            status: idea.status,
            tags: idea.tags.join(", "),
          }}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
          submitting={submitting}
          serverError={error}
        />
      </div>
    </div>
  );
}

export default EditIdea;
