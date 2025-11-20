// Open Library API Types
export interface OpenLibraryDoc {
  key: string;
  title: string;
  cover_i?: number;
  author_name?: string[];
  first_publish_year?: number;
  ia?: string[];
}

export interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
  numFound: number;
  start: number;
}

// Archive.org API Types
export interface ArchiveOrgDoc {
  identifier: string;
  title?: string;
  creator?: string | string[];
  date?: string;
  year?: string;
}

export interface ArchiveOrgResponse {
  response: {
    docs: ArchiveOrgDoc[];
    numFound: number;
    start: number;
  };
}

// Archive.org Metadata Types
export interface ArchiveOrgMetadata {
  metadata: {
    identifier: string;
    title?: string;
    creator?: string | string[];
    description?: string | string[];
    date?: string;
    year?: string;
  };
}

// Open Library Work Types
export interface OpenLibraryWork {
  key: string;
  title: string;
  covers?: number[];
  description?: string | { value: string };
  authors?: Array<{ key: string; name: string }>;
}

