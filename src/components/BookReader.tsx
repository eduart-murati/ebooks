import { Box, CloseButton, Text } from "@chakra-ui/react";
import { useRef } from "react";

interface BookReaderProps {
  url: string;
  onClose: () => void;
  audioUrl?: string;
  bookTitle?: string;
}

const BookReader = ({ url, onClose, bookTitle }: BookReaderProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const HEADER_HEIGHT = "50px";
  const modifiedUrl = url.includes("#mode/2") ? url : `${url}#mode/2`;

  const handleClose = () => {
    // Mbyll reader-in (audio në iframe vazhdon për shkak të CORS)
    if (iframeRef.current) {
      iframeRef.current.src = "about:blank";
    }
    onClose();
  };

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
        {/* Header */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h={HEADER_HEIGHT}
          bg="gray.900"
          zIndex={40}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            maxW="70%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            textAlign="center"
          >
            {bookTitle || "Libri i zgjedhur"}
          </Text>
        </Box>

        {/* Close */}
        <CloseButton
          position="absolute"
          top={2}
          right={2}
          zIndex={50}
          onClick={handleClose}
          color="white"
          size="lg"
        />

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={modifiedUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Book Reader"
          allow="autoplay; fullscreen"
        />
      </Box>
    </Box>
  );
};

export default BookReader;
