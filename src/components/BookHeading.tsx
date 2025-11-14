import type { BookQuery } from "../hooks/useBooks";
import { Heading } from "@chakra-ui/react";

// Përkthimet në shqip
const genreTranslations: Record<string, string> = {
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
  bookQuery: BookQuery;
}

const BookHeading = ({ bookQuery }: Props) => {
  const genreName = bookQuery.genre?.name || "";
  const translatedGenre = genreTranslations[genreName] || genreName;

  const heading = `Të gjithë librat: ${translatedGenre}`;

  return (
    <Heading as="h1" marginY={5} fontSize="4xl">
      {heading}
    </Heading>
  );
};

export default BookHeading;
