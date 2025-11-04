import { describe, it, expect, beforeEach } from "vitest";

// Import the functions we'll be testing (they don't exist yet - TDD!)
// These will be in js/util/stamp-search.js
import {
  loadStampNames,
  searchStamps,
  filterStampsByQuery,
  getStampName,
  getStampTags,
} from "../../js/util/stamp-search.js";

describe("Stamp Search Utilities", () => {
  let sampleStampData;

  beforeEach(() => {
    // Sample data matching our stamp-names.json structure
    sampleStampData = {
      stamps: [
        {
          sheet: 0,
          row: 0,
          col: 0,
          name: "house",
          tags: ["building", "home"],
        },
        {
          sheet: 0,
          row: 0,
          col: 1,
          name: "tree",
          tags: ["nature", "plant"],
        },
        {
          sheet: 0,
          row: 0,
          col: 2,
          name: "car",
          tags: ["vehicle", "transportation"],
        },
        {
          sheet: 0,
          row: 1,
          col: 0,
          name: "dog",
          tags: ["animal", "pet"],
        },
        {
          sheet: 0,
          row: 1,
          col: 1,
          name: "cat",
          tags: ["animal", "pet"],
        },
        {
          sheet: 1,
          row: 0,
          col: 0,
          name: "apple",
          tags: ["food", "fruit"],
        },
      ],
    };
  });

  describe("loadStampNames", () => {
    it("should return a promise that resolves to stamp data", async () => {
      const data = await loadStampNames();
      expect(data).toBeDefined();
      expect(data.stamps).toBeInstanceOf(Array);
      expect(data.metadata).toBeDefined();
    });

    it("should load data with correct structure", async () => {
      const data = await loadStampNames();
      expect(data.stamps.length).toBeGreaterThan(0);
      const firstStamp = data.stamps[0];
      expect(firstStamp).toHaveProperty("sheet");
      expect(firstStamp).toHaveProperty("row");
      expect(firstStamp).toHaveProperty("col");
      expect(firstStamp).toHaveProperty("name");
      expect(firstStamp).toHaveProperty("tags");
    });
  });

  describe("getStampName", () => {
    it("should return stamp name for valid coordinates", () => {
      const name = getStampName(sampleStampData, 0, 0, 0);
      expect(name).toBe("house");
    });

    it("should return another stamp name for different coordinates", () => {
      const name = getStampName(sampleStampData, 0, 1, 1);
      expect(name).toBe("cat");
    });

    it("should return null for unnamed stamp coordinates", () => {
      const name = getStampName(sampleStampData, 5, 5, 5);
      expect(name).toBeNull();
    });

    it("should handle edge cases gracefully", () => {
      expect(getStampName(sampleStampData, -1, 0, 0)).toBeNull();
      expect(getStampName(sampleStampData, 0, -1, 0)).toBeNull();
      expect(getStampName(sampleStampData, 0, 0, -1)).toBeNull();
    });
  });

  describe("getStampTags", () => {
    it("should return tags array for valid coordinates", () => {
      const tags = getStampTags(sampleStampData, 0, 0, 0);
      expect(tags).toEqual(["building", "home"]);
    });

    it("should return empty array for unnamed stamps", () => {
      const tags = getStampTags(sampleStampData, 9, 7, 14);
      expect(tags).toEqual([]);
    });
  });

  describe("filterStampsByQuery", () => {
    it("should return all stamps when query is empty", () => {
      const results = filterStampsByQuery(sampleStampData, "");
      expect(results.length).toBe(6);
    });

    it("should return all stamps when query is whitespace", () => {
      const results = filterStampsByQuery(sampleStampData, "   ");
      expect(results.length).toBe(6);
    });

    it("should filter stamps by exact name match", () => {
      const results = filterStampsByQuery(sampleStampData, "house");
      expect(results.length).toBe(1);
      expect(results[0].name).toBe("house");
    });

    it("should be case-insensitive", () => {
      const results = filterStampsByQuery(sampleStampData, "HOUSE");
      expect(results.length).toBe(1);
      expect(results[0].name).toBe("house");
    });

    it("should match partial names", () => {
      const results = filterStampsByQuery(sampleStampData, "ca");
      expect(results.length).toBe(2); // cat and car
      const names = results.map((s) => s.name).sort();
      expect(names).toEqual(["car", "cat"]);
    });

    it("should filter by tag matches", () => {
      const results = filterStampsByQuery(sampleStampData, "pet");
      expect(results.length).toBe(2); // dog and cat
      const names = results.map((s) => s.name).sort();
      expect(names).toEqual(["cat", "dog"]);
    });

    it("should filter by tag with partial match", () => {
      const results = filterStampsByQuery(sampleStampData, "anim");
      expect(results.length).toBe(2); // dog and cat have "animal" tag
    });

    it("should return empty array when no matches found", () => {
      const results = filterStampsByQuery(sampleStampData, "zebra");
      expect(results.length).toBe(0);
    });

    it("should handle multiple word queries by matching any word", () => {
      const results = filterStampsByQuery(sampleStampData, "house tree");
      expect(results.length).toBe(2);
      const names = results.map((s) => s.name).sort();
      expect(names).toEqual(["house", "tree"]);
    });
  });

  describe("searchStamps", () => {
    it("should return search results with sheet, row, col info", () => {
      const results = searchStamps(sampleStampData, "house");
      expect(results.length).toBe(1);
      expect(results[0]).toMatchObject({
        sheet: 0,
        row: 0,
        col: 0,
        name: "house",
        tags: ["building", "home"],
      });
    });

    it("should return results sorted by relevance (exact matches first)", () => {
      const data = {
        stamps: [
          {
            sheet: 0,
            row: 0,
            col: 0,
            name: "dog house",
            tags: ["building"],
          },
          { sheet: 0, row: 0, col: 1, name: "house", tags: ["building"] },
          {
            sheet: 0,
            row: 0,
            col: 2,
            name: "tree house",
            tags: ["building"],
          },
        ],
      };
      const results = searchStamps(data, "house");
      expect(results[0].name).toBe("house"); // exact match first
    });

    it("should limit results to specified maximum", () => {
      const results = searchStamps(sampleStampData, "a", 2); // many stamps have 'a'
      expect(results.length).toBeLessThanOrEqual(2);
    });

    it("should return empty array for no matches", () => {
      const results = searchStamps(sampleStampData, "zzzzz");
      expect(results).toEqual([]);
    });
  });

  describe("Integration: Search with real data", () => {
    it("should be able to search loaded stamp data", async () => {
      const stampData = await loadStampNames();
      const results = searchStamps(stampData, "house");
      expect(results).toBeInstanceOf(Array);
      // Should find at least one stamp if "house" is in our data
      if (results.length > 0) {
        expect(results[0]).toHaveProperty("name");
        expect(results[0]).toHaveProperty("sheet");
        expect(results[0]).toHaveProperty("row");
        expect(results[0]).toHaveProperty("col");
      }
    });
  });
});
