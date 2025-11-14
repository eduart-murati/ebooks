// components/GenresMenu.tsx
import { useState } from "react";
import { VStack, Button, Box } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import type { Genre } from "@/hooks/useGenres";

interface Props {
  genres: Genre[];
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const GenresMenu = ({ genres, selectedGenre, onSelectGenre }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box position="relative">
      <Button onClick={() => setIsOpen(!isOpen)} size="sm" variant="outline">
        <FaBars />
      </Button>

      {isOpen && (
        <VStack
          position="absolute"
          top="100%"
          right={0} // e pozicionon nga cepi i djathtë
          gap={1}
          py={2}
          px={2}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          shadow="md"
          align="stretch"
          zIndex={1000}
          width="190px" // ose mund ta bësh 30% më të gjerë se butoni
        >
          {genres.map((genre) => (
            <Button
              key={genre.id}
              variant={selectedGenre?.id === genre.id ? "solid" : "ghost"}
              colorScheme={selectedGenre?.id === genre.id ? "blue" : "gray"}
              width="100%"
              justifyContent="flex-start"
              onClick={() => {
                onSelectGenre(genre);
                setIsOpen(false);
              }}
            >
              {genre.name}
            </Button>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default GenresMenu;
