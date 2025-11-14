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
} from "react-icons/fa";
import type { Genre } from "@/hooks/useGenres";

const genreIconMap: Record<string, IconType> = {
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

const genreTranslations: Record<string, string> = {
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

const genreOrder = [
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Children",
  "Poetry",
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
  isVisible?: boolean; // për menunë mobile
}

const GenreList = ({
  selectedGenre,
  onSelectGenre,
  genres,
  isVisible = true,
}: Props) => {
  if (!genres) return <Spinner />;

  const sortedGenres = genres
    .filter((g) => genreOrder.includes(g.name))
    .sort((a, b) => genreOrder.indexOf(a.name) - genreOrder.indexOf(b.name));

  if (!isVisible) return null;

  return (
    <Box>
      <Heading fontSize="3xl" mb={3}>
        Kategoritë
      </Heading>

      <VStack as="ul" align="stretch" gap={2}>
        {sortedGenres.map((genre) => {
          const isSelected = genre.id === selectedGenre?.id;
          const displayName = genreTranslations[genre.name] || genre.name;
          const IconComp = genreIconMap[genre.name] || FaBook;

          return (
            <Box as="li" key={genre.id}>
              <HStack>
                <Icon
                  as={IconComp}
                  color={isSelected ? "blue.400" : "gray.500"}
                  boxSize="32px"
                  borderRadius={8}
                  transition="color 0.2s ease"
                />
                <Button
                  whiteSpace="normal"
                  fontWeight={isSelected ? "bold" : "normal"}
                  color={isSelected ? "blue.400" : "gray.500"}
                  onClick={() => onSelectGenre(genre)}
                  fontSize={{ base: "md", lg: "xl" }}
                  variant="ghost"
                  _hover={{ textDecoration: "underline" }}
                >
                  {displayName}
                </Button>
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default GenreList;
