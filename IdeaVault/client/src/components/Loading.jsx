function Loading({ text = "Loading..." }) {
  return (
    <div className="loading" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <span>{text}</span>
    </div>
  );
}

export default Loading;
