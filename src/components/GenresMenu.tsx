"use client";

import {
  Button,
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Portal,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import type { Genre } from "@/hooks/useGenres";
import { useColorMode } from "./ui/color-mode";

const translations: Record<string, string> = {
  All: "Të Gjitha",
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
            : "Kategori"}
        </Button>
      </MenuTrigger>

      <Portal>
        <Menu.Positioner>
          <MenuContent
            bg={colorMode === "dark" ? "gray.800" : "white"}
            borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
            minW="200px"
            p={1}
            borderRadius="md"
          >
            {genres.map((genre) => {
              const isSelected = genre.id === selectedGenre?.id;
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
                  {translations[genre.name] || genre.name}
                </MenuItem>
              );
            })}
          </MenuContent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
