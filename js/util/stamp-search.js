/**
 * Stamp Search Utilities
 * Provides functionality for searching and filtering stamps by name and tags
 */

/**
 * Load stamp names from JSON data file
 * @returns {Promise<Object>} Promise that resolves to stamp data
 */
export async function loadStampNames() {
  try {
    const response = await fetch("/src/assets/data/stamp-names.json");
    if (!response.ok) {
      throw new Error(`Failed to load stamp names: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading stamp names:", error);
    // Return empty structure if loading fails
    return {
      stamps: [],
      metadata: {
        totalSheets: 10,
        rowsPerSheet: 8,
        colsPerRow: 15,
        totalStamps: 1200,
        namedStamps: 0,
      },
    };
  }
}

/**
 * Get the name of a stamp at specific coordinates
 * @param {Object} stampData - The loaded stamp data
 * @param {number} sheet - Sheet index (0-9)
 * @param {number} row - Row index (0-7)
 * @param {number} col - Column index (0-14)
 * @returns {string|null} Stamp name or null if not found
 */
export function getStampName(stampData, sheet, row, col) {
  if (!stampData || !stampData.stamps) {
    return null;
  }

  // Validate inputs
  if (
    sheet < 0 ||
    row < 0 ||
    col < 0 ||
    !Number.isInteger(sheet) ||
    !Number.isInteger(row) ||
    !Number.isInteger(col)
  ) {
    return null;
  }

  const stamp = stampData.stamps.find(
    (s) => s.sheet === sheet && s.row === row && s.col === col,
  );

  return stamp ? stamp.name : null;
}

/**
 * Get the tags of a stamp at specific coordinates
 * @param {Object} stampData - The loaded stamp data
 * @param {number} sheet - Sheet index (0-9)
 * @param {number} row - Row index (0-7)
 * @param {number} col - Column index (0-14)
 * @returns {Array<string>} Array of tags, or empty array if not found
 */
export function getStampTags(stampData, sheet, row, col) {
  if (!stampData || !stampData.stamps) {
    return [];
  }

  const stamp = stampData.stamps.find(
    (s) => s.sheet === sheet && s.row === row && s.col === col,
  );

  return stamp && stamp.tags ? stamp.tags : [];
}

/**
 * Filter stamps by search query
 * @param {Object} stampData - The loaded stamp data
 * @param {string} query - Search query string
 * @returns {Array} Filtered array of stamps
 */
export function filterStampsByQuery(stampData, query) {
  if (!stampData || !stampData.stamps) {
    return [];
  }

  // Return all stamps if query is empty or whitespace
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) {
    return [...stampData.stamps];
  }

  // Split query into words for multi-word search
  const queryWords = trimmedQuery.split(/\s+/);

  return stampData.stamps.filter((stamp) => {
    const nameLower = stamp.name.toLowerCase();
    const tagsLower = stamp.tags.map((tag) => tag.toLowerCase());

    // Check if any query word matches the name or any tag
    return queryWords.some((word) => {
      // Check name match
      if (nameLower.includes(word)) {
        return true;
      }
      // Check tag matches
      return tagsLower.some((tag) => tag.includes(word));
    });
  });
}

/**
 * Search stamps and return results sorted by relevance
 * @param {Object} stampData - The loaded stamp data
 * @param {string} query - Search query string
 * @param {number} maxResults - Maximum number of results to return (optional)
 * @returns {Array} Sorted array of matching stamps
 */
export function searchStamps(stampData, query, maxResults = undefined) {
  const filtered = filterStampsByQuery(stampData, query);

  if (filtered.length === 0) {
    return [];
  }

  const trimmedQuery = query.trim().toLowerCase();

  // Sort by relevance: exact matches first, then partial matches
  const sorted = filtered.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    // Exact match comes first
    const aExact = aName === trimmedQuery;
    const bExact = bName === trimmedQuery;

    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // Then sort by how early in the name the match appears
    const aIndex = aName.indexOf(trimmedQuery);
    const bIndex = bName.indexOf(trimmedQuery);

    if (aIndex !== bIndex) {
      // If one doesn't match in name at all (only in tags), put it later
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    }

    // Finally, alphabetical order
    return aName.localeCompare(bName);
  });

  // Limit results if maxResults is specified
  if (maxResults !== undefined && maxResults > 0) {
    return sorted.slice(0, maxResults);
  }

  return sorted;
}
