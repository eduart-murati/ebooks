import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Spinner,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import no_image from "../assets/no_image.svg";

// SVG për shigjetën e kthimit
const ArrowBackSvg = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

interface BookDetailsProps {
  bookId: string;
  onBack: () => void;
}

interface BookData {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  authors?: { name: string }[];
}

const BookDetails = ({ bookId, onBack }: BookDetailsProps) => {
  const [book, setBook] = useState<BookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const NO_IMAGE_URL = no_image;

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://openlibrary.org${bookId}.json`);
        setBook(res.data);
      } catch (e) {
        console.error(e);
        setError("Gabim gjatë ngarkimit të librit. Ju lutem provoni përsëri.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

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
      </Box>
    );
  if (!book)
    return (
      <Box textAlign="center" mt="50px">
        <Text>Nuk u gjet informacion për këtë libër.</Text>
      </Box>
    );

  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : NO_IMAGE_URL;

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "Ky libër nuk ka përshkrim të disponueshëm.";

  const authors =
    book.authors?.map((a) => a.name).join(", ") || "Autor i panjohur";

  return (
    <VStack gap={6} align="center" mt={6} px={4}>
      <Image
        src={coverUrl}
        alt={book.title}
        width="300px"
        height="450px"
        borderRadius="lg"
        shadow="lg"
      />

      <Heading textAlign="center">{book.title}</Heading>
      <Text fontSize="sm" color="gray.500">
        {authors}
      </Text>

      <Box maxW="600px" textAlign="center">
        <Text>{description}</Text>
      </Box>

      <Button onClick={onBack} colorScheme="blue" mt={4}>
        <HStack gap={2}>
          <ArrowBackSvg />
          <Text>Kthehu te Lista</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default BookDetails;
