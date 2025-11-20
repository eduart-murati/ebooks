import type { Genre } from "@/hooks/useGenres";

export interface Book {
  id: string;
  title: string;
  cover_url: string | null | undefined;
  author?: string;
  release_date?: string;
  hasOnlineRead?: boolean;
  readUrl?: string | null;
  audioUrl?: string | undefined;
}

export interface BookQuery {
  genre: Genre | null;
  bookList: string;
  sortOrder: string;
  searchText: string;
}

export interface BookDetails {
  title: string;
  description: string;
  coverUrl: string;
  authors: string;
}

