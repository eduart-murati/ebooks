import { Box, CloseButton, Icon, Text } from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";
import { useRef } from "react";

interface BookReaderProps {
  url: string;
  onClose: () => void;
  audioUrl?: string;
  bookTitle?: string;
}

const BookReader = ({ url, onClose, audioUrl, bookTitle }: BookReaderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const HEADER_HEIGHT = "50px";
  const modifiedUrl = url.includes("#mode/2") ? url : `${url}#mode/2`;

  const handlePlayAudio = () => {
    if (!audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    audioRef.current.play().catch((e) => console.error(e));
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (iframeRef.current) {
      iframeRef.current.src = ""; // ndalon media brenda iframe
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

        {/* Audio */}
        {audioUrl && (
          <Box
            aria-label="Play audio"
            onClick={handlePlayAudio}
            as="button"
            border="1px solid"
            borderColor="blue.500"
            color="blue.500"
            borderRadius="md"
            p={1}
            w="32px"
            h="32px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="transparent"
            cursor="pointer"
            _hover={{ bg: "blue.500", color: "white" }}
            position="absolute"
            top="8px"
            right="50px"
            zIndex={50}
          >
            <Icon as={FaVolumeUp} color="inherit" boxSize="1em" />
          </Box>
        )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={modifiedUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Book Reader"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default BookReader;
