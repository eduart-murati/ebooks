import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import type { BookDetails } from "@/types/book";
import type { OpenLibraryWork, ArchiveOrgMetadata } from "@/types/api";
import { API_CONFIG } from "@/constants";
import { cleanDescription } from "@/utils/bookTransformers";
import no_image from "@/assets/no_image.svg";

interface UseBookDetailsResult {
  book: BookDetails | null;
  isLoading: boolean;
  error: string | null;
}

const NO_IMAGE_URL = no_image;

/**
 * Custom hook to fetch book details from Open Library or Archive.org
 */
export const useBookDetails = (bookId: string): UseBookDetailsResult => {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when bookId changes
    setBook(null);
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();

    const fetchBook = async () => {
      try {
        let bookData: BookDetails;
        let cover: string;

        // Determine source: Open Library or Archive.org
        if (bookId.startsWith("/") || bookId.startsWith("/works/")) {
          // Open Library - bookId tashmë ka / në fillim, kështu që e bashkojmë direkt
          const res = await axios.get<OpenLibraryWork>(
            `https://openlibrary.org${bookId}.json`,
            { signal: controller.signal }
          );
          const data = res.data;

          cover = data.covers
            ? `${API_CONFIG.OPEN_LIBRARY_COVER_URL}/${data.covers[0]}-L.jpg`
            : NO_IMAGE_URL;

          bookData = {
            title: data.title,
            description: cleanDescription(data.description),
            coverUrl: cover,
            authors: "Detaje mbi autorin në OpenLibrary", // TODO: Extract author names properly
          };
        } else {
          // Archive.org
          const res = await axios.get<ArchiveOrgMetadata>(
            `${API_CONFIG.ARCHIVE_ORG_METADATA_URL}/${bookId}`,
            { signal: controller.signal }
          );

          if (!res.data?.metadata) {
            throw new Error("Nuk u gjet metadata");
          }

          const meta = res.data.metadata;

          cover = `${API_CONFIG.ARCHIVE_ORG_COVER_URL}/${bookId}`;
          const authorText = Array.isArray(meta.creator)
            ? meta.creator.join(", ")
            : meta.creator || "Autor i panjohur";

          bookData = {
            title: meta.title || "Pa titull",
            description: cleanDescription(meta.description),
            coverUrl: cover,
            authors: authorText,
          };
        }

        setBook(bookData);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof CanceledError) {
          return;
        }
        console.error("Gabim në fetchBook:", e);
        setError("Gabim gjatë ngarkimit të librit. Ju lutem provoni përsëri.");
        setIsLoading(false);
      }
    };

    fetchBook();

    return () => {
      controller.abort();
    };
  }, [bookId]);

  return { book, isLoading, error };
};

