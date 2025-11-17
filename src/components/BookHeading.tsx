import type { BookQuery } from "../hooks/useBooks";
import { Heading } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

// Perkthimet ne shqip (shtuar 'All')
const genreTranslations: Record<string, string> = {
  All: "Të Gjithë",
  "Science Fiction": "Shkencorë",
  Fantasy: "Fantazi",
  Romance: "Romancë",
  Mystery: "Mister",
  History: "Histori",
  Biography: "Biografi",
  Horror: "Horror",
  Thriller: "Thriller",
  Children: " Për fëmijë",
  Poetry: "Poezi",
};

interface Props {
  bookQuery: BookQuery;
}

const BookHeading = ({ bookQuery }: Props) => {
  const textColor = useColorModeValue("gray.700", "white");

  // Percakto Bazen (zhanri i zgjedhur ose 'All')
  const baseGenreName = bookQuery.genre?.name || "All";
  const translatedGenre = genreTranslations[baseGenreName] || baseGenreName;

  // Krijimi i titullit (Heading)
  let headingText = "";

  if (bookQuery.searchText) {
    // Nese ka kerkim (Search Text)
    headingText = `Rezultatet për: "${bookQuery.searchText}"`;
  } else {
    // Nese s'ka kerkim, shfaqim zhanrin (ose 'Të Gjithe librat')
    headingText = `Librat: ${translatedGenre}`;
  }

  return (
    <Heading
      as="h1"
      marginY={5}
      fontSize={{ base: "3xl", md: "4xl" }}
      color={textColor}
      textTransform="capitalize"
    >
      {headingText}
    </Heading>
  );
};

export default BookHeading;
