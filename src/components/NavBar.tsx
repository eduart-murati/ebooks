// components/NavBar.tsx
import {
  HStack,
  Image,
  Button,
  Box,
  Text,
  useBreakpointValue,
  // Zgjidhim problemin e useTheme duke e importuar ketu nese ju vjen nga Chakra UI,
  // por e lëmë si next-themes per kontekstin tuaj
} from "@chakra-ui/react";
import { useTheme } from "next-themes"; // Mbetet per theme
import logo_light from "../assets/logo_light.svg";
import logo_dark from "../assets/logo_dark.svg";
import { FaMoon, FaSun } from "react-icons/fa";
import type { Genre } from "@/hooks/useGenres";
import GenresMenu from "./GenresMenu"; // Mbetet per menu
import SearchInput from "./SearchInput"; // E importojme komponentin tone te ndare

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

  // Varianti i ekranit te vogel (per te vendosur se ku te shfaqet shiriti i kërkimit)
  // const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      w="100%" // Wideness e rregulluar
      py={2}
      px={{ base: 4, md: 8 }} // Padding responsiv
      bg={theme === "dark" ? "gray.800" : "white"}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={100}
    >
      {/* Rreshti i Parë (Logo, Search/Desktop, Buttons) */}
      <HStack
        w="100%"
        align="center"
        gap={{ base: 2, md: 4 }}
        justify="space-between"
      >
        {/* Grupi i Majtë: Kthehu + Logo */}
        <HStack flexShrink={0} gap={2}>
          {isDetailsView && onBack && (
            <Button
              onClick={onBack}
              colorScheme="blue"
              size={{ base: "sm", md: "md" }}
            >
              <HStack gap={1}>
                <ArrowBackSvg style={{ width: "16px", height: "16px" }} />
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
          />
        </HStack>

        {/* Search - Desktop (shfaqet vetëm në ekrane të mëdha, zë hapësirën e mbetur) */}
        <Box
          flex="1"
          maxW="600px"
          mx={{ base: 0, md: 4 }}
          display={{ base: "none", md: "block" }} // Fshihet në mobile
        >
          <SearchInput
            searchText={searchText}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
          />
        </Box>

        {/* Grupi i Djathtë: Genres + Theme Toggle */}
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

      {/* Rreshti i Dytë (Search/Mobile) */}
      {/* Shiriti i kërkimit për Mobile shfaqet në një rresht tjetër, poshtë HStack-ut kryesor */}
      <Box
        display={{ base: "block", md: "none" }} // Shfaqet vetëm në mobile
        mt={2} // Hapësirë lart
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
