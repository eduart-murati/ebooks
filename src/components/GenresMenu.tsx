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
          variant="solid"
          height={{ base: "36px", md: "40px" }}
          border="1px solid"
          // --- STILIZIMI LIGHT MODE (Solid) ---
          bg="white"
          color="gray.800"
          borderColor="gray.300"
          // --- STILIZIMI DARK MODE (Solid) ---
          _dark={{
            bg: "gray.800",
            color: "white",
            borderColor: "gray.600",
            _active: { bg: "gray.700" },
          }}
          // --- HOVER STATES ---
          _hover={{
            bg: "gray.50",
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
        {/* Z-Index shumë i lartë (9999)  */}
        <Menu.Positioner zIndex={9999}>
          <MenuContent
            minW={{ base: "180px", md: "200px" }}
            maxH="60vh"
            overflowY="auto"
            p={1}
            borderRadius="md"
            shadow="xl"
            // --- SFONDI I MENUSË
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            _dark={{
              bg: "gray.800",
              borderColor: "gray.600",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
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
                  py={3} //
                  cursor="pointer"
                  // Ngjyrat Light
                  color={isSelected ? "blue.700" : "gray.800"}
                  _hover={{ bg: "gray.100" }}
                  // Ngjyrat Dark
                  _dark={{
                    color: isSelected ? "blue.300" : "white",
                    bg: "transparent", // Reset bg
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
