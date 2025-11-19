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
  Link, // Shtohet Link nga Chakra
} from "@chakra-ui/react";
import axios from "axios";
import no_image from "../assets/no_image.svg";
import { FaExternalLinkAlt } from "react-icons/fa"; // Shtohet ikona për linkun e jashtëm

// 📚 ArrowBack SVG Component (Mbetet i pandryshuar)
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

// --- INTERFACES ---
interface BookDetailsProps {
  bookId: string;
  onBack: () => void;
}

interface UnifiedBookData {
  title: string;
  description: string;
  coverUrl: string;
  authors: string;
}

// ----------------------------------------------------
// --- KOMPONENTI KRYESOR: BookDetails ---
// ----------------------------------------------------

const BookDetails = ({ bookId, onBack }: BookDetailsProps) => {
  const [book, setBook] = useState<UnifiedBookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State për të menaxhuar burimin e imazhit në rast gabimi (p.sh., 404)
  const [displayImage, setDisplayImage] = useState<string>("");

  const NO_IMAGE_URL = no_image;

  // Funksioni për pastrimin e përshkrimit
  const cleanDescription = (desc: any): string => {
    if (!desc) return "Ky libër nuk ka përshkrim të disponueshëm.";
    let text = "";
    if (typeof desc === "string") text = desc;
    else if (typeof desc === "object" && desc.value) text = desc.value;
    // Heqim tag-et HTML
    return text.replace(/<[^>]*>?/gm, "");
  };

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let cover: string;
        let bookData: UnifiedBookData;

        // 1. ZGJEDHJA E BURIMIT (OpenLibrary vs Archive.org)
        if (bookId.startsWith("/") || bookId.startsWith("/works/")) {
          // --- OPEN LIBRARY ---
          const res = await axios.get(`https://openlibrary.org${bookId}.json`);
          const data = res.data;

          cover = data.covers
            ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
            : NO_IMAGE_URL;

          bookData = {
            title: data.title,
            description: cleanDescription(data.description),
            coverUrl: cover,
            authors: "Detaje mbi autorin në OpenLibrary", // Zgjedhje e thjeshtuar
          };
        } else {
          // --- ARCHIVE.ORG (Për shembull: ismail-kadare-prilli-i-thyer) ---
          const res = await axios.get(`https://archive.org/metadata/${bookId}`);
          if (!res.data || !res.data.metadata)
            throw new Error("Nuk u gjet metadata");
          const meta = res.data.metadata;

          cover = `https://archive.org/services/img/${bookId}`;
          const authorText = Array.isArray(meta.creator)
            ? meta.creator.join(", ")
            : meta.creator || "Autor i panjohur";

          bookData = {
            title: meta.title || "Pa titull",
            description: cleanDescription(meta.description),
            coverUrl: cover,
            authors: authorText,
          };
        }

        // 2. Ruajtja e të dhënave
        setBook(bookData);
        setDisplayImage(cover); // Inicializon displayImage me coverin e sapogjetur
      } catch (e) {
        console.error("Gabim në fetchBook:", e);
        setError("Gabim gjatë ngarkimit të librit. Ju lutem provoni përsëri.");
        // Në rast gabimi, sigurohemi që imazhi fallback të shfaqet
        setDisplayImage(NO_IMAGE_URL);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  // --- RENDERIMET KONDICIONALE ---
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

  // --- RENDERIMI KRYESOR ---
  return (
    <VStack gap={6} align="center" mt={6} px={4}>
      <Image
        src={displayImage}
        alt={book.title}
        width="300px"
        height="450px"
        objectFit="cover"
        borderRadius="lg"
        shadow="lg"
        // Zgjidhja për fallback: ndryshon state-in në rast gabimi të ngarkimit
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

      {/* --- BUTONI ARCHIVE.ORG I RREGULLUAR --- */}
      {/* Përdorim Link si wrapper, i cili merr href dhe isExternal */}
      {!bookId.startsWith("/") && (
        <Link
          href={`https://archive.org/details/${bookId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }} // Heq stilimin default të Link
          width={{ base: "100%", md: "auto" }} // Responsive width
          display="flex"
          justifyContent="center"
        ></Link>
      )}

      <Button onClick={onBack} colorScheme="blue" mt={4} mb={10}>
        <HStack gap={2}>
          <ArrowBackSvg />
          <Text>Kthehu te Lista</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default BookDetails;
