import { useEffect, useState } from "react";
import apiClient from "@/services/api-client"; 
import archiveClient from "@/services/archive-client"; 
import { CanceledError } from "axios";
import type { Book, BookQuery } from "@/types/book";
import type { OpenLibraryResponse, ArchiveOrgResponse } from "@/types/api";
import { transformOpenLibraryBook, transformArchiveBook } from "@/utils/bookTransformers";
import { buildOpenLibraryParams, buildArchiveParams } from "@/utils/queryBuilders";
import { PAGINATION } from "@/constants";

interface UseBooksResult {
  data: Book[];
  totalPages: number;
  error: string;
  isLoading: boolean;
}

const useBooks = (bookQuery: BookQuery, page: number = 1): UseBooksResult => {
  const [data, setData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalFound, setTotalFound] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError("");

    // Build query parameters
    const olParams = buildOpenLibraryParams(bookQuery, page);

    const fetchOpenLibrary = apiClient.get<OpenLibraryResponse>("/search.json", {
      signal: controller.signal,
      params: olParams,
    });

    // Archive.org fetch only if search text exists
    let fetchArchiveOrg = Promise.resolve<{ data: ArchiveOrgResponse }>({
      data: { response: { docs: [], numFound: 0, start: 0 } },
    });

    if (bookQuery.searchText && bookQuery.searchText.trim().length > 0) {
      const archiveParams = buildArchiveParams(bookQuery.searchText, page);

      fetchArchiveOrg = archiveClient.get<ArchiveOrgResponse>("", {
        signal: controller.signal,
        params: archiveParams,
      });
    }

    // Execute parallel requests
    Promise.all([fetchOpenLibrary, fetchArchiveOrg])
      .then(([olRes, archiveRes]) => {
        // Transform Open Library books
        const olDocs = olRes.data.docs || [];
        const mappedOLBooks: Book[] = olDocs.map(transformOpenLibraryBook);

        // Transform Archive.org books
        const archiveDocs = archiveRes.data.response?.docs || [];
        const mappedArchiveBooks: Book[] = archiveDocs.map(transformArchiveBook);

        // Combine results
        const combinedBooks = [...mappedOLBooks, ...mappedArchiveBooks];
        
        // Sort: books with "Lexo / Audio" (hasOnlineRead: true) first
        const sortedBooks = combinedBooks.sort((a, b) => {
          // If both have or both don't have online read, maintain original order
          if (a.hasOnlineRead === b.hasOnlineRead) return 0;
          // Books with online read come first
          return a.hasOnlineRead ? -1 : 1;
        });
        
        const totalCount =
          (olRes.data.numFound || 0) + (archiveRes.data.response?.numFound || 0);

        setData(sortedBooks);
        setTotalFound(totalCount);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [bookQuery, page]); 

  return {
    data,
    totalPages: Math.ceil((totalFound || 1) / PAGINATION.ITEMS_PER_PAGE),
    error,
    isLoading,
  };
};

export default useBooks;