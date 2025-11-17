import { Box, CloseButton, Text, Button } from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";
import { useRef, useEffect } from "react";

interface BookReaderProps {
  url: string;
  onClose: () => void;
  bookTitle?: string; // opsionale
  audioUrl?: string; // opsionale për audio
}

const BookReader = ({ url, onClose, bookTitle, audioUrl }: BookReaderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Stop audio dhe iframe kur komponenti mbyllet
  useEffect(() => {
    return () => {
      // Stop audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Stop iframe
      if (iframeRef.current) {
        iframeRef.current.src = "";
      }
    };
  }, []);

  const handlePlayAudio = () => {
    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      }
      audioRef.current.play();
    }
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
              onClick={handlePlayAudio}
            >
              <FaVolumeUp />
            </Button>
          )}
        </Box>

        {/* Iframe */}
        <iframe
          ref={iframeRef}
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
