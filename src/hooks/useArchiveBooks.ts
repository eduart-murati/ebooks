import { useEffect, useState } from "react";
import archiveClient from "@/services/archive-client";

interface ArchiveResponse {
  response: {
    docs: any[];
    numFound: number;
  };
}

export default function useArchiveBooks(query: string, page: number = 1) {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    const q = `title:("${query}") OR creator:("${query}")`;
    const params = {
      q,
      page,
      rows: 25,
      output: "json",
    };

    archiveClient
      .get<ArchiveResponse>("", { params })
      .then((res) => {
        setData(res.data.response.docs);
        setTotal(res.data.response.numFound);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query, page]);

  return { data, total, loading, error };
}
