import { HStack, Image, Button, Box, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import logo_light from "../assets/logo_light.svg";
import logo_dark from "../assets/logo_dark.svg";
import { FaMoon, FaSun } from "react-icons/fa";
import type { Genre } from "@/hooks/useGenres";
import GenresMenu from "./GenresMenu";
import SearchInput from "./SearchInput";
import { ArrowBackIcon } from "./icons/ArrowBackIcon";

interface Props {
  searchText: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  genres: Genre[];
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
  isDetailsView?: boolean;
  onBack?: () => void;
}

const NavBar = ({
  searchText,
  onSearchChange,
  onSearchSubmit,
  genres,
  selectedGenre,
  onSelectGenre,
  isDetailsView,
  onBack,
}: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <Box
      w="100%" // gjeresia 100%
      py={2}
      px={{ base: 4, md: 8 }} // Padding responsiv
      bg={theme === "dark" ? "gray.800" : "white"}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={100}
    >
      {/* Rreshti i pare i menuve */}
      <HStack
        w="100%"
        align="center"
        gap={{ base: 2, md: 4 }}
        justify="space-between"
      >
        {/* Grupi i majte: Kthehu + Logo */}
        <HStack flexShrink={0} gap={2}>
          {isDetailsView && onBack && (
            <Button
              onClick={onBack}
              colorScheme="blue"
              size={{ base: "sm", md: "md" }}
            >
              <HStack gap={1}>
                <ArrowBackIcon size="16px" />
                <Text display={{ base: "none", md: "block" }}>Kthehu</Text>
              </HStack>
            </Button>
          )}

          {/* Logo */}
          <Image
            src={theme === "dark" ? logo_dark : logo_light}
            width={{ base: "120px", md: "189px" }}
            height={{ base: "30px", md: "47px" }}
            alt="Logo"
            flexShrink={0}
          />
        </HStack>

        {/* Search - Desktop */}
        <Box
          flex="1"
          minW={0} // Lejon që të tkurret nëse është e nevojshme
          maxW="none" // Heqim limitin maksimal për të shtrirë më shumë
          mx={{ base: 0, md: 4 }}
          display={{ base: "none", md: "block" }} // jo per mob
        >
          <SearchInput
            searchText={searchText}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
          />
        </Box>

        {/* Grupi i djathte: Genres + Theme Toggle */}
        <HStack gap={2} flexShrink={0}>
          <GenresMenu
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={onSelectGenre}
          />

          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            size={{ base: "sm", md: "md" }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </Button>
        </HStack>
      </HStack>

      {/* Rreshti i dyte (Search/Mobile) */}
      {/* Shiriti i kerkimit per mobile shfaqet ne nje rresht tjeter */}
      <Box
        display={{ base: "block", md: "none" }} // Shfaqet vetëm në mobile
        mt={2} // Hapësire lart
      >
        <SearchInput
          searchText={searchText}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />
      </Box>
    </Box>
  );
};

export default NavBar;
