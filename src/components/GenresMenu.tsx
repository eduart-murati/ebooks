import {
  Button,
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Portal,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react";
import {
  FaBars,
  FaBook,
  FaRocket,
  FaMagic,
  FaHeart,
  FaQuestion,
  FaHistory,
  FaFeatherAlt,
  FaChild,
  FaCrosshairs,
  FaGlobe,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";

import type { Genre } from "@/hooks/useGenres";

// Ikonat
const genreIconMap: Record<string, IconType> = {
  All: FaGlobe,
  "Science Fiction": FaRocket,
  Fantasy: FaMagic,
  Children: FaChild,
  Poetry: FaBook,
  Romance: FaHeart,
  Mystery: FaQuestion,
  History: FaHistory,
  Biography: FaFeatherAlt,
  Thriller: FaCrosshairs,
};

// Përkthimet
const translations: Record<string, string> = {
  All: "Të Gjithë",
  "Science Fiction": "Shkencor",
  Fantasy: "Fantazi",
  Romance: "Romancë",
  Mystery: "Mister",
  History: "Histori",
  Biography: "Biografi",
  Thriller: "Thriller",
  Children: "Fëmijë",
  Poetry: "Poezi",
};

interface Props {
  genres: Genre[];
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

export default function GenresMenu({
  genres,
  selectedGenre,
  onSelectGenre,
}: Props) {
  // Renditja sipas GenreList
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
  ];

  // Krijimi i objektit "All"
  const allGenre: Genre = { id: "all" as any, name: "All" } as Genre;

  // Filtrimi i kategorive
  const filteredGenres = genres.filter((g) => genreOrder.includes(g.name));

  // Kombinimi me "All"
  const combinedGenres: Genre[] = [allGenre, ...filteredGenres];

  // Sortimi sipas genreOrder
  const sortedGenres = combinedGenres.sort(
    (a, b) => genreOrder.indexOf(a.name) - genreOrder.indexOf(b.name)
  );

  // Siguro që initial genre nuk jetë null
  const currentGenre = selectedGenre || allGenre;

  return (
    <Menu.Root>
      <MenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          height={{ base: "36px", md: "40px" }}
          borderColor="gray.200"
          bg="transparent"
          color="gray.800"
          _hover={{ bg: "gray.100" }}
          _dark={{
            color: "whiteAlpha.900",
            borderColor: "gray.700",
            _hover: { bg: "gray.700" },
          }}
        >
          <FaBars
            style={{
              marginRight: 6,
              color: currentGenre ? undefined : undefined,
            }}
          />
          <Box
            color="inherit"
            fontWeight="medium"
            textAlign="left"
            flex="1"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {translations[currentGenre.name] || currentGenre.name}
          </Box>
        </Button>
      </MenuTrigger>

      <Portal>
        <Menu.Positioner>
          <MenuContent
            bg="rgba(255,255,255,0.50)"
            borderColor="gray.200"
            _dark={{ bg: "rgba(26,32,44,0.50)", borderColor: "gray.700" }}
            minW={{ base: "170px", md: "200px" }}
            p={2}
            borderRadius="md"
            style={{
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            {sortedGenres.map((genre) => {
              const isSelected = genre.id === currentGenre.id;
              const IconComp = genreIconMap[genre.name] || FaBook;

              return (
                <MenuItem
                  key={genre.id}
                  value={genre.name}
                  onClick={() => onSelectGenre(genre)}
                  fontWeight={isSelected ? "bold" : "normal"}
                  fontSize={{ base: "md", md: "md" }}
                  px={3}
                  py={2}
                  cursor="pointer"
                  color={isSelected ? "blue.600" : "gray.800"}
                  _hover={{ bg: "gray.100" }}
                  _dark={{
                    color: isSelected ? "blue.300" : "whiteAlpha.900",
                    _hover: { bg: "gray.700" },
                  }}
                >
                  <HStack gap={3}>
                    <Icon
                      as={IconComp}
                      boxSize="18px"
                      color={isSelected ? "inherit" : undefined}
                    />
                    <Box>{translations[genre.name] || genre.name}</Box>
                  </HStack>
                </MenuItem>
              );
            })}
          </MenuContent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
