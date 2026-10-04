import { CATEGORIES, STATUSES } from "../utils/constants.js";

// filters = { category, status, favorite }
// onChange(name, value) is called when a dropdown changes
function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-bar">
      <select
        value={filters.category}
        onChange={(e) => onChange("category", e.target.value)}
        aria-label="Filter by category"
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
        aria-label="Filter by status"
      >
        <option value="All">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={filters.favorite}
        onChange={(e) => onChange("favorite", e.target.value)}
        aria-label="Filter by favorite"
      >
        <option value="All">All ideas</option>
        <option value="Favorites">Favorites only</option>
      </select>
    </div>
  );
}

export default FilterBar;
