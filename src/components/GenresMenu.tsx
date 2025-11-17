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
  FaGhost,
  FaFeatherAlt,
  FaChild,
  FaCrosshairs,
  FaGlobe,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";

import type { Genre } from "@/hooks/useGenres";
import { useColorMode } from "./ui/color-mode";

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
  Horror: FaGhost,
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
  Horror: "Horror",
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
  const { colorMode } = useColorMode();

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
    "Horror",
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

  return (
    <Menu.Root onSelect={(e: any) => e.preventDefault()}>
      <MenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          height={{ base: "36px", md: "40px" }}
        >
          <FaBars style={{ marginRight: 6 }} />
          {selectedGenre
            ? translations[selectedGenre.name] || selectedGenre.name
            : "Të gjithë"}
        </Button>
      </MenuTrigger>

      <Portal>
        <Menu.Positioner>
          <MenuContent
            bg={
              colorMode === "dark"
                ? "rgba(26,32,44,0.50)"
                : "rgba(255,255,255,0.50)"
            } // transparencë 50%
            borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
            minW={{ base: "170px", md: "200px" }} // gjeresia e listes mob & desk
            p={2}
            borderRadius="md"
            style={{
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            {sortedGenres.map((genre) => {
              const isSelected = genre.id === selectedGenre?.id;
              const IconComp = genreIconMap[genre.name] || FaBook;

              return (
                <MenuItem
                  key={genre.id}
                  value={genre.name}
                  onSelect={() => onSelectGenre(genre)}
                  fontWeight={isSelected ? "bold" : "normal"}
                  fontSize={{ base: "md", md: "md" }} // font per mob & desk
                  color={
                    isSelected
                      ? colorMode === "dark"
                        ? "blue.300"
                        : "blue.600"
                      : colorMode === "dark"
                      ? "whiteAlpha.900"
                      : "gray.800"
                  }
                  _hover={{
                    bg: colorMode === "dark" ? "gray.700" : "gray.100",
                  }}
                  px={3}
                  py={2}
                >
                  <HStack gap={3}>
                    <Icon
                      as={IconComp}
                      boxSize="18px"
                      color={
                        isSelected
                          ? colorMode === "dark"
                            ? "blue.300"
                            : "blue.600"
                          : colorMode === "dark"
                          ? "whiteAlpha.900"
                          : "gray.700"
                      }
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
