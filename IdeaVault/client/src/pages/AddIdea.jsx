import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createIdea, getErrorMessage } from "../services/api.js";
import IdeaForm from "../components/IdeaForm.jsx";

function AddIdea() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError("");
    try {
      await createIdea(data);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="page narrow">
      <Link to="/dashboard" className="back-link">
        ← Back to dashboard
      </Link>
      <div className="card form-card">
        <h1>Add a new idea</h1>
        <p className="muted">Write it down while it is fresh.</p>
        <IdeaForm
          onSubmit={handleSubmit}
          submitLabel="Save idea"
          submitting={submitting}
          serverError={error}
        />
      </div>
    </div>
  );
}

export default AddIdea;
