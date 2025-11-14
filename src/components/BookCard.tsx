import {
  AspectRatio,
  Card,
  CardBody,
  Image,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import type { Book } from "@/hooks/useBooks";

interface Props {
  book: Book;
  onClickDetails: () => void;
  onClickRead?: () => void;
}

const BookCard = ({ book, onClickDetails, onClickRead }: Props) => {
  const isCoverAvailable = !!book.cover_url;
  const NO_IMAGE_URL =
    "https://dummyimage.com/200x300/cccccc/000000&text=No+Cover";
  const imageUrl = isCoverAvailable ? book.cover_url : NO_IMAGE_URL;

  return (
    <Card.Root
      _hover={{
        transform: "scale(1.03)",
        transition: "0.2s",
        cursor: "pointer",
      }}
    >
      <AspectRatio ratio={2 / 3}>
        <Image
          src={imageUrl}
          alt={book.title}
          objectFit={isCoverAvailable ? "cover" : "contain"}
          boxSize={isCoverAvailable ? "auto" : "50%"}
          p={isCoverAvailable ? 0 : 4}
        />
      </AspectRatio>

      <CardBody p={3}>
        {" "}
        {/* Zvogëlimi i padding-ut të CardBody */}
        <VStack align="flex-start" gap={0}>
          {" "}
          {/* Zvogëlimi i ndarjes (gap) */}
          <Text lineClamp={2} fontSize="lg" fontWeight="bold">
            {" "}
            {/* Zvogëlimi i titullit */}
            {book.title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {book.author || "Autor i panjohur"}
          </Text>
          <HStack gap={1} pt={2}>
            {/* Zvogëlimi i butonit në size="xs" */}
            <Button colorScheme="blue" size="xs" onClick={onClickDetails}>
              Detaje
            </Button>
            {/* Zvogëlimi i butonit në size="xs" */}
            <Button
              colorScheme={book.hasOnlineRead ? "purple" : "gray"}
              size="xs"
              onClick={onClickRead}
              disabled={!book.hasOnlineRead}
            >
              {book.hasOnlineRead ? "Lexo / Audio" : "Nuk gjendet"}
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card.Root>
  );
};

export default BookCard;
