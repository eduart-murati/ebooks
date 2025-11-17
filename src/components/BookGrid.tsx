import { SimpleGrid, Text, Button, HStack } from "@chakra-ui/react";
import useBooks, { type Book, type BookQuery } from "../hooks/useBooks";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import BookCardContainer from "./BookCardContainer";
import { useState } from "react";
import BookReader from "./BookReader";

interface Props {
  bookQuery: BookQuery;
  page: number;
  setPage: (page: number) => void;
  onSelectBook: (bookId: string) => void;
}

const BookGrid = ({ bookQuery, page, setPage, onSelectBook }: Props) => {
  const [readerUrl, setReaderUrl] = useState<string | null>(null);

  const {
    data: books,
    totalPages,
    error,
    isLoading,
  } = useBooks(bookQuery, page);

  const skeletons = Array.from({ length: 25 }, (_, i) => i);

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
                  ? () => setReaderUrl(book.readUrl!)
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
      {readerUrl && (
        <BookReader
          url={readerUrl}
          onClose={() => setReaderUrl(null)}
          bookTitle={
            books.find((b) => b.readUrl === readerUrl)?.title ||
            "Libri i zgjedhur"
          }
        />
      )}
    </>
  );
};

export default BookGrid;
