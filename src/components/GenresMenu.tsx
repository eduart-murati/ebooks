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
          variant="outline" // Kthehemi te varianti Outline
          height={{ base: "36px", md: "40px" }}
          // --- STILIZIMI LIGHT MODE (Transparent) ---
          bg="transparent"
          borderColor="gray.200"
          color="gray.800"
          // --- STILIZIMI DARK MODE (Transparent) ---
          _dark={{
            bg: "transparent", //
            borderColor: "gray.700",
            color: "whiteAlpha.900",
            _active: { bg: "whiteAlpha.200" },
          }}
          // --- HOVER STATES ---
          _hover={{
            bg: "gray.100",
            _dark: { bg: "gray.700" },
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
        <Menu.Positioner zIndex={2000}>
          <MenuContent
            minW={{ base: "170px", md: "200px" }}
            maxH="60vh"
            overflowY="auto"
            p={1}
            borderRadius="md"
            // Light Mode
            bg="rgba(255,255,255,0.8)"
            borderColor="gray.200"
            // Dark Mode
            _dark={{
              bg: "rgba(26,32,44,0.7)",
              borderColor: "gray.700",
              boxShadow: "dark-lg",
            }}
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
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
                  fontWeight={isSelected ? "bold" : "normal"}
                  fontSize="md"
                  px={3}
                  py={2.5}
                  cursor="pointer"
                  // Light Mode Items
                  color={isSelected ? "blue.600" : "gray.800"}
                  _hover={{ bg: "gray.100" }}
                  // Dark Mode Items
                  _dark={{
                    color: isSelected ? "blue.300" : "whiteAlpha.900",
                    bg: "transparent",
                    _hover: { bg: "gray.700" },
                    _focus: { bg: "gray.700" },
                  }}
                >
                  <HStack gap={3}>
                    <Icon
                      as={IconComp}
                      boxSize="18px"
                      color={isSelected ? "inherit" : "currentColor"}
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
