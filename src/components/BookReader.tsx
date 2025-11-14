import { Box, CloseButton } from "@chakra-ui/react";

interface BookReaderProps {
  url: string;
  onClose: () => void;
}

const BookReader = ({ url, onClose }: BookReaderProps) => {
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
        <CloseButton
          position="absolute"
          top={2}
          right={2}
          zIndex={10}
          onClick={onClose}
          color="white"
          size="lg"
        />
        <iframe
          src={url}
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
