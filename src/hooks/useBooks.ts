// useBooks.ts

import useData from "./useData";
import type { Genre } from "./useGenres";

export interface BookQuery {
  genre: Genre | null;
  bookList: string;
  sortOrder: string;
  searchText: string;
}

export interface Book {
  audioUrl: string | undefined;
  id: string;
  title: string;
  cover_url: string | null | undefined;
  author?: string;
  release_date?: string;
  hasOnlineRead?: boolean;
  readUrl?: string | null;
}

interface UseBooksResult {
  data: Book[];
  totalPages: number;
  error: any;
  isLoading: boolean;
}

const useBooks = (bookQuery: BookQuery, page: number = 1): UseBooksResult => {
  let qParam = bookQuery.searchText || "";
  let subjectParam = bookQuery.genre?.name
    ? bookQuery.genre.name.toLowerCase().replace(/\s+/g, "_")
    : undefined;

  // Harta e vlerave te renditjes 
  const sortMap: Record<string, string | undefined> = {
    "rating.desc": "rating desc", 
    "new": "new", 
    "old": "old", 
    "title.asc": "title",
    // "title.desc": "title desc",  
  };

  if (bookQuery.genre && !bookQuery.searchText) qParam = "";
  else if (!qParam && !subjectParam) qParam = "top";

  const finalSortParam = sortMap[bookQuery.sortOrder];

  const params: Record<string, any> = {
    q: qParam,
    page,
    subject: subjectParam,
    sort: finalSortParam, 
    limit: 25,
  };

  Object.keys(params).forEach((key) => {
    if (params[key] === undefined || params[key] === null || params[key] === "") delete params[key];
  });

  const { data, error, isLoading } = useData<{
    docs: any[];
    numFound: number;
  }>("/search.json", { params }, [bookQuery, page]);

  const mappedData: Book[] =
    data?.docs?.map((doc) => {
      // Kontroll per lexim online ose audio nga internet archive
      let readUrl: string | null = null;
      if (doc.ia?.length > 0) {
        readUrl = `https://archive.org/embed/${doc.ia[0]}?ui=embed&bgcolor=000000&color=ffffff&controls=1`;
      }

      return {
        id: doc.key,
        title: doc.title,
        cover_url: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : null,
        author: doc.author_name?.join(", ") || "Autor i panjohur",
        release_date: doc.first_publish_year?.toString(),
        hasOnlineRead: !!readUrl,
        readUrl,
        audioUrl: undefined,
      };
    }) || [];

  return {
    data: mappedData,
    totalPages: Math.ceil((data?.numFound || 1) / 25),
    error,
    isLoading,
  };
};

export default useBooks;