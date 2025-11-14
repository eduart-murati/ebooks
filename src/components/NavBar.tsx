import { HStack, Image, Button, Box, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import logo_light from "../assets/logo_light.svg";
import logo_dark from "../assets/logo_dark.svg";
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

// SVG për shigjetën e kthimit
const ArrowBackSvg = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

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
      w="100vw" // full viewport width
      py={2}
      px={4} // minimal padding, mund të hiqet për edge-to-edge absolute
      bg={theme === "dark" ? "gray.800" : "white"}
      boxShadow="sm"
    >
      <HStack w="100%" align="center" gap={2} justify="space-between">
        {/* Back button për detajet */}
        {isDetailsView && onBack && (
          <Button onClick={onBack} colorScheme="blue">
            <HStack gap={2}>
              <ArrowBackSvg />
              <Text>Kthehu</Text>
            </HStack>
          </Button>
        )}

        {/* Logo */}
        <Image
          src={theme === "dark" ? logo_dark : logo_light}
          width="189px"
          height="47px"
          alt="Logo"
        />

        {/* Search */}
        <Box flex="1" minW={{ base: "100%", md: "250px" }} maxW="600px" mx={4}>
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
                borderRadius: "999px",
                padding: "8px 16px",
                border: "1px solid gray",
              }}
            />
          </form>
        </Box>

        {/* Buttons + Genres */}
        <HStack gap={2} flexShrink={0}>
          <GenresMenu
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={onSelectGenre}
          />

          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            size="sm"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
