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
    <Card.Root>
      <AspectRatio ratio={2 / 3}>
        <Image
          src={imageUrl}
          alt={book.title}
          objectFit={isCoverAvailable ? "cover" : "contain"}
          boxSize={isCoverAvailable ? "auto" : "50%"}
          p={isCoverAvailable ? 0 : 4}
          // 🔥 KLIKU E IMAZHIT HAP DETAJET
          cursor="pointer"
          _hover={{ transform: "scale(1.03)", transition: "0.2s" }}
          onClick={onClickDetails}
        />
      </AspectRatio>

      <CardBody p={3}>
        <VStack align="flex-start" gap={0}>
          <Text
            lineClamp={2}
            fontSize="lg"
            fontWeight="bold"
            cursor="pointer"
            onClick={onClickDetails}
          >
            {book.title}
          </Text>

          <Text fontSize="sm" color="gray.500">
            {book.author || "Autor i panjohur"}
          </Text>

          <HStack gap={1} pt={2}>
            <Button colorScheme="blue" size="xs" onClick={onClickDetails}>
              Detaje
            </Button>

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
