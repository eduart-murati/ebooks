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
  const NO_IMAGE_URL = "https://via.placeholder.com/200x300?text=No+Cover";
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

      <CardBody>
        <VStack align="flex-start" gap={1}>
          <Text lineClamp={2} fontSize="xl" fontWeight="bold">
            {book.title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {book.author || "Autor i panjohur"}
          </Text>
          <HStack gap={2} pt={2}>
            <Button colorScheme="blue" size="sm" onClick={onClickDetails}>
              Detaje
            </Button>
            <Button
              colorScheme={book.hasOnlineRead ? "purple" : "gray"}
              size="sm"
              onClick={onClickRead}
              disabled={!book.hasOnlineRead}
            >
              {book.hasOnlineRead ? "Lexo / Audio" : "Nuk disponohet"}
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card.Root>
  );
};

export default BookCard;
