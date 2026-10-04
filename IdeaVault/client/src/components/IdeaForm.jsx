import { useState } from "react";
import { CATEGORIES, STATUSES } from "../utils/constants.js";
import ErrorMessage from "./ErrorMessage.jsx";

const emptyValues = {
  title: "",
  description: "",
  category: "Project",
  status: "New",
  tags: "",
};

// Used by both the Add Idea and Edit Idea pages.
// initialValues.tags is a comma separated string, e.g. "react, college"
function IdeaForm({ initialValues = emptyValues, onSubmit, submitLabel, submitting, serverError }) {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required");
      return;
    }

    // Convert "a, b, c" into ["a", "b", "c"]
    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      status: form.status,
      tags,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <ErrorMessage message={error || serverError} />

      <label className="field">
        <span>Idea title</span>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Study planner app"
          maxLength={100}
        />
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your idea in detail..."
          rows={6}
          maxLength={2000}
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Category</span>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Status</span>
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Tags</span>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Separate tags with commas, e.g. react, college, mobile"
        />
      </label>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default IdeaForm;
