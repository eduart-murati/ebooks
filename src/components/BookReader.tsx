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
        {/* Close */}
        <CloseButton
          position="absolute"
          top={2}
          right={2}
          zIndex={50}
          onClick={onClose}
          color="white"
          size="lg"
        />

        {/* TOP BAR */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="50px"
          bg="gray.900"
          zIndex={40}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={4}
        >
          <Text color="white" fontWeight="bold" fontSize="lg" truncate>
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

        {/*
          OVERLAY që mbyll titullin e reader-it brenda iframe
          -> është shumë i rëndësishëm
        */}
        <Box
          position="absolute"
          top="50px"
          left={0}
          w="100%"
          h="40px"
          bg="gray.900"
          zIndex={30}
        />

        {/* IFRAME */}
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title=" "
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default BookReader;
