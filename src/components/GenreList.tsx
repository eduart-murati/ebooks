import {
  Box,
  VStack,
  HStack,
  Icon,
  Spinner,
  Button,
  Heading,
} from "@chakra-ui/react";
import type { IconType } from "react-icons/lib";
import {
  FaBook,
  FaRocket,
  FaMagic,
  FaHeart,
  FaQuestion,
  FaHistory,
  FaGhost,
  FaFeatherAlt,
  FaChild,
  FaCrosshairs,
  FaGlobe,
} from "react-icons/fa";
import type { Genre } from "@/hooks/useGenres";

// Ikonat
const genreIconMap: Record<string, IconType> = {
  All: FaGlobe,
  "Science Fiction": FaRocket,
  Fantasy: FaMagic,
  Romance: FaHeart,
  Mystery: FaQuestion,
  History: FaHistory,
  Biography: FaFeatherAlt,
  Horror: FaGhost,
  Thriller: FaCrosshairs,
  Children: FaChild,
  Poetry: FaBook,
};

// Përkthimet
const genreTranslations: Record<string, string> = {
  All: "Të gjithë",
  "Science Fiction": "Shkencor",
  Fantasy: "Fantazi",
  Romance: "Romancë",
  Mystery: "Mister",
  History: "Histori",
  Biography: "Biografi",
  Horror: "Horror",
  Thriller: "Thriller",
  Children: "Fëmijë",
  Poetry: "Poezi",
};

// Renditja
const genreOrder = [
  "All",
  "Science Fiction",
  "Fantasy",
  "Children",
  "Poetry",
  "Romance",
  "Mystery",
  "History",
  "Biography",
  "Thriller",
  "Horror",
];

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
  genres: Genre[];
  isDarkMode?: boolean; // vendos manualisht dark ose light
  isVisible?: boolean;
}

const GenreList = ({
  selectedGenre,
  onSelectGenre,
  genres,
  isDarkMode = false,
  isVisible = true,
}: Props) => {
  const selectedColor = isDarkMode ? "blue.300" : "blue.500";
  const defaultColor = isDarkMode ? "gray.400" : "gray.600";

  // Ngjyrat e sfondit me alpha (transparencë) të Chakra UI
  const transparentBg = isDarkMode ? "blackAlpha.600" : "whiteAlpha.800";

  const hoverBg = isDarkMode ? "whiteAlpha.100" : "blackAlpha.50";

  if (!genres) return <Spinner />;

  // Krijimi i objektit "All"
  const allGenre: Genre = { id: "all" as any, name: "All" } as Genre;
  const filteredGenres = genres.filter((g) => genreOrder.includes(g.name));
  const combinedGenres: Genre[] = [allGenre, ...filteredGenres];

  const sortedGenres = combinedGenres.sort(
    (a, b) => genreOrder.indexOf(a.name) - genreOrder.indexOf(b.name)
  );

  if (!isVisible) return null;

  return (
    <Box position="relative">
      {/* Titulli i Listës me madhësi të zvogëluar */}
      <Heading fontSize={{ base: "xl", lg: "2xl" }} mb={3}>
        Të gjithë
      </Heading>

      <VStack
        as="ul"
        align="stretch"
        gap={1}
        maxH="80vh"
        overflowY="auto"
        pb={4}
        p={2}
        borderRadius="md"
        bg={transparentBg}
        position="relative"
        zIndex={1}
        // Apliko stilet direkt për backdrop-filter me prefikse
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        {sortedGenres.map((genre) => {
          // Logjika e zgjedhjes
          const isSelected =
            selectedGenre === null
              ? genre.name === "All"
              : genre.name === selectedGenre.name;

          const displayName = genreTranslations[genre.name] || genre.name;
          const IconComp = genreIconMap[genre.name] || FaBook;

          return (
            <Box as="li" key={genre.id || genre.name}>
              <Button
                whiteSpace="normal"
                fontWeight={isSelected ? "bold" : "normal"}
                color={isSelected ? selectedColor : defaultColor}
                // FUNKSIONALITETI I KLIKIMIT KORREKT
                onClick={() => onSelectGenre(genre)}
                fontSize={{ base: "md", lg: "lg" }}
                variant="ghost"
                _hover={{ bg: hoverBg }}
                w="100%"
                justifyContent="flex-start"
                p={1.5}
                h="auto"
              >
                <HStack gap={3}>
                  <Icon
                    as={IconComp}
                    color={isSelected ? selectedColor : defaultColor}
                    boxSize={{ base: "20px", lg: "28px" }}
                    transition="color 0.2s ease"
                  />
                  <Box as="span">{displayName}</Box>
                </HStack>
              </Button>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default GenreList;
