// components/GenresMenu.tsx
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

interface Props {
  genres: Genre[];
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const GenresMenu = ({ genres, selectedGenre, onSelectGenre }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Menu.Root>
      <MenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          color={colorMode === "dark" ? "whiteAlpha.900" : "gray.800"}
          borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
        >
          {/* Vendos ikonën brenda përmbajtjes së butonit */}
          <FaBars style={{ marginRight: 6 }} />
          {selectedGenre ? selectedGenre.name : "Zgjidh Kategori"}
        </Button>
      </MenuTrigger>

      <Portal>
        <Menu.Positioner>
          <MenuContent
            bg={colorMode === "dark" ? "gray.800" : "white"}
            borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
            minW="200px"
            boxShadow="md"
            p={1}
            borderRadius="md"
          >
            {genres.map((genre) => (
              <MenuItem
                key={genre.id}
                onSelect={() => onSelectGenre(genre)}
                color={
                  genre.id === selectedGenre?.id
                    ? colorMode === "dark"
                      ? "blue.300"
                      : "blue.500"
                    : colorMode === "dark"
                    ? "whiteAlpha.900"
                    : "gray.800"
                }
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                _hover={{
                  bg: colorMode === "dark" ? "gray.700" : "gray.100",
                }}
                px={3}
                py={2}
                value={""}
              >
                {genre.name}
              </MenuItem>
            ))}
          </MenuContent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default GenresMenu;
