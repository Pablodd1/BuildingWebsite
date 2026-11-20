
/**
 * Safely checks if a product matches a search query.
 * Searches across name, collection, subcategory, category, and description.
 */
function matchesSearchQuery(product, query) {
    if (!query || typeof query !== "string") return true;

    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;

    // Support multi-word search: all words must match somewhere
    const words = normalizedQuery.split(/\s+/).filter(Boolean);

    const fieldsToSearch = [
        product.name,
        product.collection,
        product.subcategory,
        product.category,
        product.description,
    ].filter((f) => f && typeof f === "string");

    const combinedText = fieldsToSearch.join(" ").toLowerCase();

    return words.every((word) => combinedText.includes(word));
}

export default matchesSearchQuery;
