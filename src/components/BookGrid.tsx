import { SimpleGrid, Text, Button, HStack } from "@chakra-ui/react";
import useBooks from "../hooks/useBooks";
import type { Book, BookQuery } from "@/types/book";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import BookCardContainer from "./BookCardContainer";
import { useState } from "react";
import BookReader from "./BookReader";
import { PAGINATION } from "@/constants";

interface Props {
  bookQuery: BookQuery;
  page: number;
  setPage: (page: number) => void;
  onSelectBook: (bookId: string) => void;
}

const BookGrid = ({ bookQuery, page, setPage, onSelectBook }: Props) => {
  // 1. Ruajme te gjithe objektin e librit ne vend te vetëm
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const {
    data: books,
    totalPages,
    error,
    isLoading,
  } = useBooks(bookQuery, page);

  const skeletons = Array.from(
    { length: PAGINATION.SKELETON_COUNT },
    (_, i) => i
  );

  return (
    <>
      <HStack gap={5} marginBottom={1} paddingX={5} paddingY={1}>
        {error && <Text color="red.500">{error}</Text>}
      </HStack>

      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} gap={6} padding={5}>
        {isLoading &&
          skeletons.map((skeleton) => (
            <BookCardContainer key={skeleton}>
              <BookCardSkeleton />
            </BookCardContainer>
          ))}

        {books?.map((book: Book) => (
          <BookCardContainer key={book.id}>
            <BookCard
              book={book}
              onClickDetails={() => onSelectBook(book.id)}
              onClickRead={
                book.hasOnlineRead && book.readUrl
                  ? () => setSelectedBook(book) // Ruajmë objektin e librit
                  : undefined
              }
            />
          </BookCardContainer>
        ))}
      </SimpleGrid>

      {/* Pagination horizontal */}
      {totalPages > 1 && (
        <HStack gap={4} justify="center" mt={5}>
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            colorScheme="blue"
          >
            Prev
          </Button>
          <Text>
            Page {page} of {totalPages}
          </Text>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            colorScheme="blue"
          >
            Next
          </Button>
        </HStack>
      )}

      {/* BookReader overlay */}
      {selectedBook && (
        <BookReader
          url={selectedBook.readUrl!}
          audioUrl={selectedBook.audioUrl}
          onClose={() => setSelectedBook(null)} // Mbyllja rivendos në null (ben unmount)
          bookTitle={selectedBook.title}
        />
      )}
    </>
  );
};

export default BookGrid;
