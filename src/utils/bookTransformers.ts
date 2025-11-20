import type { Book } from "@/types/book";
import type { OpenLibraryDoc, ArchiveOrgDoc } from "@/types/api";
import { API_CONFIG } from "@/constants";

/**
 * Transform Open Library document to Book
 */
export const transformOpenLibraryBook = (doc: OpenLibraryDoc): Book => {
  let readUrl: string | null = null;
  let audioUrl: string | undefined = undefined;

  if (doc.ia && doc.ia.length > 0) {
    const identifier = doc.ia[0];
    readUrl = `${API_CONFIG.ARCHIVE_ORG_EMBED_URL}/${identifier}?ui=embed&bgcolor=000000&color=ffffff&controls=1`;
    audioUrl = `https://archive.org/download/${identifier}/${identifier}.mp3`;
  }

  return {
    id: doc.key,
    title: doc.title,
    cover_url: doc.cover_i
      ? `${API_CONFIG.OPEN_LIBRARY_COVER_URL}/${doc.cover_i}-M.jpg`
      : null,
    author: doc.author_name?.join(", ") || "Autor i panjohur",
    release_date: doc.first_publish_year?.toString(),
    hasOnlineRead: !!readUrl,
    readUrl,
    audioUrl,
  };
};

/**
 * Transform Archive.org document to Book
 */
export const transformArchiveBook = (doc: ArchiveOrgDoc): Book => {
  const id = doc.identifier;
  return {
    id,
    title: doc.title || "Pa titull",
    cover_url: `${API_CONFIG.ARCHIVE_ORG_COVER_URL}/${id}`,
    author: Array.isArray(doc.creator)
      ? doc.creator.join(", ")
      : doc.creator || "Autor i panjohur",
    release_date: doc.year || doc.date?.substring(0, 4),
    hasOnlineRead: true,
    readUrl: `${API_CONFIG.ARCHIVE_ORG_EMBED_URL}/${id}?ui=embed&bgcolor=000000&color=ffffff&controls=1`,
    audioUrl: `https://archive.org/download/${id}/${id}.mp3`,
  };
};

/**
 * Clean HTML tags from description text
 */
export const cleanDescription = (desc: unknown): string => {
  if (!desc) return "Ky libër nuk ka përshkrim të disponueshëm.";
  
  let text = "";
  if (typeof desc === "string") {
    text = desc;
  } else if (typeof desc === "object" && desc !== null && "value" in desc) {
    text = String((desc as { value: string }).value);
  }
  
  // Remove HTML tags
  return text.replace(/<[^>]*>?/gm, "");
};

