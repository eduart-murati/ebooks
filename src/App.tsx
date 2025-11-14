import { useState } from "react";
import { Grid, GridItem, HStack, useBreakpointValue } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import BookGrid from "./components/BookGrid";
import SortSelector from "./components/SortSelector";
import BookHeading from "./components/BookHeading";
import BookDetails from "./components/BookDetails";
import useGenres, { type Genre } from "./hooks/useGenres";
import type { BookQuery } from "./hooks/useBooks";

function App() {
  const showAside = useBreakpointValue({ lg: true });

  const [searchText, setSearchText] = useState("");
  const [bookQuery, setBookQuery] = useState<BookQuery>({
    genre: null,
    bookList: "all",
    sortOrder: "",
    searchText: "",
  });

  const [selectedBookKey, setSelectedBookKey] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { data: genres } = useGenres();

  const handleBackToHome = () => {
    setSelectedBookKey(null);
    setPage(1);
  };

  return (
    <>
      {/* Navbar full-width */}
      <NavBar
        searchText={searchText}
        onSearchChange={setSearchText}
        onSearchSubmit={(text) =>
          setBookQuery({ ...bookQuery, searchText: text, genre: null })
        }
        isDetailsView={!!selectedBookKey}
        onBack={selectedBookKey ? handleBackToHome : undefined}
        genres={genres || []}
        selectedGenre={bookQuery.genre}
        onSelectGenre={(genre: Genre) =>
          setBookQuery({ ...bookQuery, genre, searchText: "" })
        }
      />

      <Grid
        templateAreas={{
          base: `"main"`,
          lg: showAside ? `"aside main"` : `"main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: showAside ? "200px 1fr" : "1fr",
        }}
        minH="100vh"
        pt={2} // hapësirë nën Navbar
      >
        {showAside && genres && (
          <GridItem area="aside" padding={5}>
            <GenreList
              genres={genres}
              selectedGenre={bookQuery.genre}
              onSelectGenre={(genre) =>
                setBookQuery({ ...bookQuery, genre, searchText: "" })
              }
            />
          </GridItem>
        )}

        <GridItem area="main" paddingX={5}>
          {selectedBookKey ? (
            <BookDetails bookId={selectedBookKey} onBack={handleBackToHome} />
          ) : (
            <>
              <HStack gap={5} marginBottom={1} paddingX={5}>
                <BookHeading bookQuery={bookQuery} />
              </HStack>

              <HStack gap={5} marginBottom={1} paddingX={5}>
                <SortSelector
                  sortOrder={bookQuery.sortOrder}
                  onSelectSortOrder={(sortOrder) =>
                    setBookQuery({ ...bookQuery, sortOrder })
                  }
                  isDisabled={!!searchText}
                />
              </HStack>

              <BookGrid
                bookQuery={bookQuery}
                page={page}
                setPage={setPage}
                onSelectBook={(key: string) => setSelectedBookKey(key)}
              />
            </>
          )}
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
