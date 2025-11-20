import type { BookQuery } from "@/types/book";
import type { Genre } from "@/hooks/useGenres";
import { SORT_OPTIONS_MAP } from "@/constants";

/**
 * Build Open Library query parameters
 */
export const buildOpenLibraryParams = (
  bookQuery: BookQuery,
  page: number
): Record<string, string | number> => {
  let qParam = bookQuery.searchText || "";
  const subjectParam = bookQuery.genre?.name
    ? bookQuery.genre.name.toLowerCase().replace(/\s+/g, "_")
    : undefined;

  const sortParam = SORT_OPTIONS_MAP[bookQuery.sortOrder];

  // If genre is selected and no search text, clear q param
  if (bookQuery.genre && !bookQuery.searchText) {
    qParam = "";
  } else if (!qParam && !subjectParam) {
    qParam = "top";
  }

  const params: Record<string, string | number> = {
    q: qParam,
    page,
    limit: 25,
  };

  if (subjectParam) {
    params.subject = subjectParam;
  }

  if (sortParam) {
    params.sort = sortParam;
  }

  // Remove undefined/null/empty values
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value === undefined || value === null || value === "") {
      delete params[key];
    }
  });

  return params;
};

/**
 * Build Archive.org query string
 */
export const buildArchiveQuery = (searchText: string): string => {
  return `(title:(${searchText}) OR creator:(${searchText})) AND mediatype:(texts)`;
};

/**
 * Build Archive.org query parameters
 */
export const buildArchiveParams = (
  searchText: string,
  page: number
): Record<string, string | number | string[]> => {
  return {
    q: buildArchiveQuery(searchText),
    page,
    rows: 25,
    output: "json",
    "fl[]": ["identifier", "title", "creator", "date", "year"],
  };
};

