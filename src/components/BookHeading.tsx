import type { BookQuery } from "../hooks/useBooks";
import { Heading } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
// Importi i useColorModeValue u rregullua, duke e marrë nga @chakra-ui/react

// Përkthimet në shqip (Shtuar 'All')
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

  // 1. Përcakto Baza (Zhanri i zgjedhur ose 'All')
  // Nëse s'ka zhanër, nënkuptohet që jemi te 'All'
  const baseGenreName = bookQuery.genre?.name || "All";
  const translatedGenre = genreTranslations[baseGenreName] || baseGenreName;

  // 2. Krijimi i titullit (Heading)
  let headingText = "";

  if (bookQuery.searchText) {
    // Nëse ka kërkim (Search Text)
    headingText = `Rezultatet për: "${bookQuery.searchText}"`;
  } else {
    // Nëse s'ka kërkim, shfaqim zhanrin (ose 'Të Gjitha')
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
