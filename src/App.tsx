import { useState } from "react";
import { Grid, GridItem, HStack, useBreakpointValue } from "@chakra-ui/react";
import NavBar from "./components/Navbar";
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

  if (selectedBookKey) {
    return (
      <Grid templateAreas={'"nav nav" "main main"'} minH="100vh">
        <GridItem area="nav" padding={5}>
          <NavBar
            searchText=""
            onSearchChange={() => {}}
            onSearchSubmit={() => {}}
            isDetailsView={true}
            onBack={handleBackToHome}
            genres={genres || []}
            selectedGenre={bookQuery.genre}
            onSelectGenre={(genre: Genre) =>
              setBookQuery({ ...bookQuery, genre })
            }
          />
        </GridItem>
        <GridItem area="main" paddingX={5} paddingTop={5}>
          <BookDetails bookId={selectedBookKey} onBack={handleBackToHome} />
        </GridItem>
      </Grid>
    );
  }

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
      minH="100vh"
    >
      {/* Navbar */}
      <GridItem area="nav" padding={5}>
        <NavBar
          searchText={searchText}
          onSearchChange={(value) => setSearchText(value)}
          onSearchSubmit={(text) =>
            setBookQuery({ ...bookQuery, searchText: text, genre: null })
          }
          isDetailsView={false}
          genres={genres || []}
          selectedGenre={bookQuery.genre}
          onSelectGenre={(genre: Genre) =>
            setBookQuery({ ...bookQuery, genre, searchText: "" })
          }
        />
      </GridItem>

      {/* Aside (desktop only) */}
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

      {/* Main content */}
      <GridItem area="main" paddingX={5}>
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
      </GridItem>
    </Grid>
  );
}

export default App;
