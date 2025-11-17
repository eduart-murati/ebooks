import { Box, CloseButton, Text, Button } from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";

interface BookReaderProps {
  url: string;
  onClose: () => void;
  bookTitle?: string;
  audioUrl?: string;
}

const BookReader = ({ url, onClose, bookTitle, audioUrl }: BookReaderProps) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="rgba(0,0,0,0.85)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        position="relative"
        w={{ base: "95%", md: "90%", lg: "80%" }}
        h={{ base: "90%", md: "90%", lg: "85%" }}
        borderRadius="md"
        overflow="hidden"
        shadow="lg"
        bg="gray.900"
      >
        {/* Butoni Close */}
        <CloseButton
          position="absolute"
          top={2}
          right={2}
          zIndex={10}
          onClick={onClose}
          color="white"
          size="lg"
        />

        {/* Bar me titullin dhe audio button */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h={{ base: "60px", md: "50px" }} // me i dukshem ne mobile
          bg="gray.900"
          zIndex={20} // mbi iframe
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={4}
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            truncate
          >
            {bookTitle || "Libri i zgjedhur"}
          </Text>

          {audioUrl && (
            <Button
              aria-label="Play audio"
              colorScheme="blue"
              variant="outline"
              size="sm"
              onClick={() => {
                const audio = new Audio(audioUrl);
                audio.play();
              }}
            >
              <FaVolumeUp />
            </Button>
          )}
        </Box>

        {/* Iframe me padding-top per te mos mbuluar bar-in */}
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{
            border: "none",
            zIndex: 1,
            paddingTop: "60px", // ose margin-top
          }}
          title="Book Reader"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default BookReader;
