// API Configuration
export const API_CONFIG = {
  OPEN_LIBRARY_BASE_URL: "https://openlibrary.org/",
  ARCHIVE_ORG_BASE_URL: "https://archive.org/advancedsearch.php",
  ARCHIVE_ORG_METADATA_URL: "https://archive.org/metadata",
  ARCHIVE_ORG_EMBED_URL: "https://archive.org/embed",
  ARCHIVE_ORG_COVER_URL: "https://archive.org/services/img",
  OPEN_LIBRARY_COVER_URL: "https://covers.openlibrary.org/b/id",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  ITEMS_PER_PAGE: 25,
  SKELETON_COUNT: 25,
} as const;

// Sort Options
export const SORT_OPTIONS = {
  RATING_DESC: "rating.desc",
  NEW: "new",
  OLD: "old",
  TITLE_ASC: "title.asc",
} as const;

export const SORT_OPTIONS_MAP: Record<string, string | undefined> = {
  [SORT_OPTIONS.RATING_DESC]: "rating desc",
  [SORT_OPTIONS.NEW]: "new",
  [SORT_OPTIONS.OLD]: "old",
  [SORT_OPTIONS.TITLE_ASC]: "title",
} as const;

// Book Query Defaults
export const DEFAULT_BOOK_QUERY = {
  genre: null,
  bookList: "all",
  sortOrder: SORT_OPTIONS.RATING_DESC,
  searchText: "",
} as const;

// Archive.org Query Fields
export const ARCHIVE_ORG_FIELDS = [
  "identifier",
  "title",
  "creator",
  "date",
  "year",
] as const;

