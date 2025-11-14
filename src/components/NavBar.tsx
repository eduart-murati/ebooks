// components/NavBar.tsx
// NavBar component
import { HStack, Image, Button, Box } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import logo from "../assets/openlibrary.svg";
import { FaMoon, FaSun } from "react-icons/fa";
import type { Genre } from "@/hooks/useGenres";
import GenresMenu from "./GenresMenu";

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
}: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <Box py={2} px={4}>
      <HStack align="center" wrap="wrap">
        {/* Logo */}
        <Box flexShrink={0}>
          <Image src={logo} width="160px" height="40px" alt="Logo" />
        </Box>

        {/* Search */}
        <Box flex="1" minW="0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit(searchText);
            }}
          >
            <input
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Kerko..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: "999px",
                padding: "8px 16px",
                border: "1px solid gray",
              }}
            />
          </form>
        </Box>

        {/* Buttons */}
        <HStack flexShrink={0} gap={2}>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            size="sm"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </Button>

          <GenresMenu
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={onSelectGenre}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
