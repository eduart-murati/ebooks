export interface Genre {
  id: number;
  name: string;
}

// Lista statike e genreve për librat
const GENRES: Genre[] = [
  { id: 1, name: "Science Fiction" },
  { id: 2, name: "Fantasy" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Mystery" },
  { id: 5, name: "History" },
  { id: 6, name: "Biography" },
  { id: 7, name: "Horror" },
  { id: 8, name: "Thriller" },
  { id: 9, name: "Children" },
  { id: 10, name: "Poetry" },
];

const useGenres = () => {
  // nuk ka fetch, eshte statike
  const data = GENRES;
  const error = null;
  const isLoading = false;

  return { data, error, isLoading };
};

export default useGenres;
