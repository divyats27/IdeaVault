function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        type="search"
        placeholder="Search ideas by title, description or tag..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search ideas"
      />
    </div>
  );
}

export default SearchBar;
