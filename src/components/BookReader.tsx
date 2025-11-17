import { Box, CloseButton, Text, Button } from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";
import { useRef } from "react";

interface BookReaderProps {
  url: string;
  onClose: () => void;
  bookTitle?: string;
  audioUrl?: string;
}

const BookReader = ({ url, onClose, bookTitle, audioUrl }: BookReaderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (!audioUrl) return;

    // ndalojmë audio ekzistuese nëse ekziston
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.play();
  };

  const handleClose = () => {
    // ndalimi i audios kur mbyllet reader
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
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
        {/* Close button */}
        <CloseButton
          position="absolute"
          top={2}
          right={2}
          zIndex={10}
          onClick={handleClose}
          color="white"
          size="lg"
        />

        {/* Top Bar */}
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
            truncate
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
          src={url}
          width="100%"
          height="100%"
          style={{ border: "none", zIndex: 1 }}
          title=" " // fshihet titulli i iframe që e sillte reader-i
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default BookReader;
