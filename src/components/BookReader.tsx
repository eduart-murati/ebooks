import { Box, CloseButton, Text, IconButton } from "@chakra-ui/react";
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
        {/* Header bar */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="50px"
          bg="gray.900"
          zIndex={20}
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={12}
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            truncate
            textAlign="center"
            w="100%"
          >
            {bookTitle || "Libri juaj"}
          </Text>
        </Box>

        {/* Close button */}
        <CloseButton
          position="absolute"
          top={2}
          right={2}
          zIndex={30}
          onClick={onClose}
          color="white"
          size="lg"
        />

        {/* Audio button pranë X */}
        {audioUrl && (
          <IconButton
            aria-label="Play audio"
            {...(<FaVolumeUp />)}
            colorScheme="blue"
            variant="outline"
            size="sm"
            position="absolute"
            top={2}
            right="50px"
            zIndex={30}
            onClick={() => {
              const audio = new Audio(audioUrl);
              audio.play();
            }}
          />
        )}

        {/* Iframe me offset për header */}
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{
            border: "none",
            paddingTop: "50px",
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
