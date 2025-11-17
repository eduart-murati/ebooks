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

  return (
    <Menu.Root onSelect={(e: any) => e.preventDefault()}>
      <MenuTrigger asChild>
        <Button size="sm" variant="outline">
          <FaBars style={{ marginRight: 6 }} />
          {selectedGenre
            ? translations[selectedGenre.name] || selectedGenre.name
            : "Të gjithë"}
        </Button>
      </MenuTrigger>

      <Portal>
        <Menu.Positioner>
          <MenuContent
            bg={colorMode === "dark" ? "gray.800" : "white"}
            borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
            minW="220px"
            p={1}
            borderRadius="md"
          >
            {genres.map((genre) => {
              const isSelected = genre.id === selectedGenre?.id;
              const IconComp = genreIconMap[genre.name] || FaBook;

              return (
                <MenuItem
                  key={genre.id}
                  value={genre.name}
                  onSelect={() => onSelectGenre(genre)}
                  fontWeight={isSelected ? "bold" : "normal"}
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
