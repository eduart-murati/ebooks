import { Box, CloseButton, Text, IconButton, Button } from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";

interface BookReaderProps {
  url: string;
  onClose: () => void;
  bookTitle?: string; // opsionale
  audioUrl?: string; // opsionale për audio
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

        {/* Bar me titullin e librit dhe audio button */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="50px"
          bg="gray.900"
          zIndex={5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={4}
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
          >
            {bookTitle || "Libri juaj"}
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

        {/* Iframe */}
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{ border: "none", zIndex: 1 }}
          title="Book Reader"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default BookReader;
