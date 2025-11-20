import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Spinner,
  VStack,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import { useBookDetails } from "@/hooks/useBookDetails";
import { ArrowBackIcon } from "./icons/ArrowBackIcon";
import no_image from "../assets/no_image.svg";

interface BookDetailsProps {
  bookId: string;
  onBack: () => void;
}

const BookDetails = ({ bookId, onBack }: BookDetailsProps) => {
  const { book, isLoading, error } = useBookDetails(bookId);
  // State per te menaxhuar burimin e imazhit ne rast gabimi (p.sh., 404)
  const [displayImage, setDisplayImage] = useState<string>("");
  const NO_IMAGE_URL = no_image;

  // Initialize display image when book data is loaded (same logic as old code)
  useEffect(() => {
    if (book) {
      setDisplayImage(book.coverUrl); // Inicializon displayImage me coverin e sapogjetur
    } else if (error) {
      // Në rast gabimi, sigurohemi qe imazhi fallback te shfaqet
      setDisplayImage(NO_IMAGE_URL);
    } else {
      // Reset when bookId changes
      setDisplayImage("");
    }
  }, [book, error, bookId]);

  if (isLoading)
    return (
      <Box textAlign="center" mt="50px">
        <Spinner size="xl" />
      </Box>
    );
  if (error)
    return (
      <Box textAlign="center" mt="50px">
        <Text color="red.500">{error}</Text>
        <Button mt={4} onClick={onBack}>
          Kthehu
        </Button>
      </Box>
    );
  if (!book)
    return (
      <Box textAlign="center" mt="50px">
        <Text>Nuk u gjet libër.</Text>
        <Button mt={4} onClick={onBack}>
          Kthehu
        </Button>
      </Box>
    );

  return (
    <VStack gap={6} align="center" mt={6} px={4}>
      <Image
        src={displayImage || book.coverUrl || NO_IMAGE_URL}
        alt={book.title}
        width="300px"
        height="450px"
        objectFit="cover"
        borderRadius="lg"
        shadow="lg"
        onError={() => setDisplayImage(NO_IMAGE_URL)}
      />

      <Heading textAlign="center" size="xl">
        {book.title}
      </Heading>
      <Text fontSize="lg" fontWeight="bold" color="blue.500">
        {book.authors}
      </Text>
      <Box maxW="700px" textAlign="justify">
        <Text fontSize="md" lineHeight="tall" color="gray.600">
          {book.description}
        </Text>
      </Box>

      {/* Përdorim Link si wrapper, i cili merr href */}
      {!bookId.startsWith("/") && (
        <Link
          href={`https://archive.org/details/${bookId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
          width={{ base: "100%", md: "auto" }}
          display="flex"
          justifyContent="center"
        ></Link>
      )}

      <Button onClick={onBack} colorScheme="blue" mt={4} mb={10}>
        <HStack gap={2}>
          <ArrowBackIcon />
          <Text>Kthehu te Lista</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default BookDetails;
