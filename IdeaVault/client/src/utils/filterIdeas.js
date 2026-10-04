// Filters the list of ideas by search text, category, status and favorite.
// Search and filters work together (an idea must match all of them).
export const filterIdeas = (ideas, { search = "", category = "All", status = "All", favorite = "All" }) => {
  const text = search.trim().toLowerCase();

  return ideas.filter((idea) => {
    if (category !== "All" && idea.category !== category) return false;
    if (status !== "All" && idea.status !== status) return false;
    if (favorite === "Favorites" && !idea.favorite) return false;

    if (text) {
      const inTitle = idea.title.toLowerCase().includes(text);
      const inDescription = idea.description.toLowerCase().includes(text);
      const inTags = idea.tags.some((tag) => tag.toLowerCase().includes(text));
      if (!inTitle && !inDescription && !inTags) return false;
    }

    return true;
  });
};
