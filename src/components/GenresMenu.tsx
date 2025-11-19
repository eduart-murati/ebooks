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

// Perkthimet
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
  ];

  const allGenre: Genre = { id: "all" as any, name: "All" } as Genre;
  const filteredGenres = genres.filter((g) => genreOrder.includes(g.name));
  const combinedGenres: Genre[] = [allGenre, ...filteredGenres];
  const sortedGenres = combinedGenres.sort(
    (a, b) => genreOrder.indexOf(a.name) - genreOrder.indexOf(b.name)
  );

  return (
    <Menu.Root>
      <MenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          height={{ base: "36px", md: "40px" }}
          // --- STILIZIMI PËR LIGHT MODE ---
          color="gray.800"
          borderColor="gray.300"
          bg="transparent"
          // --- STILIZIMI PËR DARK MODE (_dark) ---

          _dark={{
            color: "whiteAlpha.900",
            borderColor: "gray.600",
            bg: "transparent",
            _active: { bg: "gray.700" },
          }}
          _hover={{
            bg: "gray.100",
            _dark: { bg: "gray.700" },
          }}
          _active={{
            bg: "gray.200",
            transform: "scale(0.98)",
          }}
          css={{
            "& svg": { color: "currentColor" },
          }}
        >
          <FaBars style={{ marginRight: 6 }} />
          <Box as="span" display="inline-block">
            {selectedGenre
              ? translations[selectedGenre.name] || selectedGenre.name
              : "Të gjithë"}
          </Box>
        </Button>
      </MenuTrigger>

      <Portal>
        <Menu.Positioner zIndex={1500}>
          <MenuContent
            minW={{ base: "160px", md: "200px" }}
            maxH="60vh"
            overflowY="auto"
            p={1}
            borderRadius="md"
            shadow="lg"
            // Sfondi Light
            bg="rgba(255,255,255,0.85)"
            borderColor="gray.200"
            // Sfondi Dark
            _dark={{
              bg: "rgba(26,32,44,0.90)",
              borderColor: "gray.700",
            }}
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {sortedGenres.map((genre) => {
              const isSelected = genre.id === selectedGenre?.id;
              const IconComp = genreIconMap[genre.name] || FaBook;

              return (
                <MenuItem
                  key={genre.id}
                  value={genre.name}
                  onClick={() => onSelectGenre(genre)}
                  fontWeight={isSelected ? "bold" : "medium"}
                  fontSize="md"
                  px={3}
                  py={2.5}
                  cursor="pointer"
                  // Ngjyrat Light
                  color={isSelected ? "blue.600" : "gray.700"}
                  _hover={{ bg: "gray.100" }}
                  // Ngjyrat Dark
                  _dark={{
                    color: isSelected ? "blue.300" : "gray.100",
                    _hover: { bg: "gray.700" },
                    _focus: { bg: "gray.700" },
                  }}
                >
                  <HStack gap={3}>
                    <Icon
                      as={IconComp}
                      boxSize="18px"
                      color={isSelected ? "inherit" : "currentColor"}
                      opacity={isSelected ? 1 : 0.8}
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
