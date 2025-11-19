import { useEffect, useState } from "react";
import apiClient from "@/services/api-client"; // Klienti yt i OpenLibrary (axios)
import archiveClient from "@/services/archive-client"; // Klienti yt i Archive.org
import type { Genre } from "./useGenres";
import { CanceledError } from "axios";

export interface BookQuery {
  genre: Genre | null;
  bookList: string;
  sortOrder: string;
  searchText: string;
}

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

    // --- 1. Përgatitja e parametrave për OpenLibrary ---
    let qParam = bookQuery.searchText || "";
    let subjectParam = bookQuery.genre?.name
      ? bookQuery.genre.name.toLowerCase().replace(/\s+/g, "_")
      : undefined;

    const sortMap: Record<string, string | undefined> = {
      "rating.desc": "rating desc",
      new: "new",
      old: "old",
      "title.asc": "title",
    };

    if (bookQuery.genre && !bookQuery.searchText) qParam = "";
    else if (!qParam && !subjectParam) qParam = "top";

    const finalSortParam = sortMap[bookQuery.sortOrder];

    const olParams: Record<string, any> = {
      q: qParam,
      page,
      subject: subjectParam,
      sort: finalSortParam,
      limit: 25,
    };

    // Pastrimi i parametrave bosh
    Object.keys(olParams).forEach((key) => {
      if (olParams[key] === undefined || olParams[key] === null || olParams[key] === "")
        delete olParams[key];
    });

    // Funksioni për OpenLibrary
    const fetchOpenLibrary = apiClient.get("/search.json", {
      signal: controller.signal,
      params: olParams,
    });

    // --- 2. Përgatitja e kërkesës për Archive.org ---
    let fetchArchiveOrg = Promise.resolve({ data: { response: { docs: [], numFound: 0 } } });

    // Kërkojmë në Archive.org vetëm nëse përdoruesi ka shkruar diçka (searchText)
    if (bookQuery.searchText && bookQuery.searchText.trim().length > 0) {
      const query = bookQuery.searchText;
      // Kërkojmë në titull ose autor, dhe filtrojmë vetëm tekste (mediatype:texts)
      const q = `(title:(${query}) OR creator:(${query})) AND mediatype:(texts)`;
      
      const archiveParams = {
        q,
        page,
        rows: 25,
        output: "json",
        "fl[]": ["identifier", "title", "creator", "date", "year"], // Fushat që duam
      };

      fetchArchiveOrg = archiveClient.get("", {
        signal: controller.signal,
        params: archiveParams,
      });
    }

    // --- 3. Ekzekutimi Paralel (Promise.all) ---
    Promise.all([fetchOpenLibrary, fetchArchiveOrg])
      .then(([olRes, archiveRes]) => {
        // --- Mapimi i OpenLibrary ---
        const olDocs = olRes.data.docs || [];
        const mappedOLBooks: Book[] = olDocs.map((doc: any) => {
          let readUrl: string | null = null;
          let audioUrl: string | undefined = undefined;

          if (doc.ia?.length > 0) {
            readUrl = `https://archive.org/embed/${doc.ia[0]}?ui=embed&bgcolor=000000&color=ffffff&controls=1`;
            audioUrl = `https://archive.org/download/${doc.ia[0]}/${doc.ia[0]}.mp3`;
          }

          return {
            id: doc.key,
            title: doc.title,
            cover_url: doc.cover_i
              ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
              : null, // Ose mund të vendosësh një placeholder
            author: doc.author_name?.join(", ") || "Autor i panjohur",
            release_date: doc.first_publish_year?.toString(),
            hasOnlineRead: !!readUrl,
            readUrl,
            audioUrl,
          };
        });

        // --- Mapimi i Archive.org ---
        const archiveDocs = archiveRes.data.response?.docs || [];
        const mappedArchiveBooks: Book[] = archiveDocs.map((doc: any) => {
          const id = doc.identifier;
          return {
            id: id, // ID unike nga Archive
            title: doc.title || "Pa titull",
            cover_url: `https://archive.org/services/img/${id}`, // Archive Cover API
            author: Array.isArray(doc.creator) ? doc.creator.join(", ") : doc.creator || "Autor i panjohur",
            release_date: doc.year || doc.date?.substring(0, 4),
            hasOnlineRead: true, // Archive gjithmonë ka lexim online nëse është text
            readUrl: `https://archive.org/embed/${id}?ui=embed&bgcolor=000000&color=ffffff&controls=1`,
            audioUrl: `https://archive.org/download/${id}/${id}.mp3`, // Supozim nëse ekziston
          };
        });

        // --- Bashkimi i rezultateve ---
        // Archive.org vendoset në fillim ose fund sipas dëshirës (këtu i bashkova në fund)
        // Mund të bësh filter për duplicate ID nëse ka rrezik mbivendosje
        const combinedBooks = [...mappedOLBooks, ...mappedArchiveBooks];
        const totalCount = (olRes.data.numFound || 0) + (archiveRes.data.response?.numFound || 0);

        setData(combinedBooks);
        setTotalFound(totalCount);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [bookQuery, page]); // Varet nga ndryshimi i kërkimit ose faqes

  return {
    data,
    totalPages: Math.ceil((totalFound || 1) / 25),
    error,
    isLoading,
  };
};

export default useBooks;