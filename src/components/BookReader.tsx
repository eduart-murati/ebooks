import { Box, CloseButton, Icon, Text } from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";

interface BookReaderProps {
  url: string;
  onClose: () => void;
  audioUrl?: string;
  bookTitle?: string;
}

const BookReader = ({ url, onClose, audioUrl, bookTitle }: BookReaderProps) => {
  // Lartesia e Header-it tone
  const HEADER_HEIGHT = "50px";
  // Modifikimi i URL-se mbetet, perdoret per te siguruar mode/2
  const modifiedUrl = url.includes("#mode/2") ? url : `${url}#mode/2`;

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
        {/* Header-i yne  */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h={HEADER_HEIGHT}
          bg="gray.900" // Ngjyra per te mbuluar toolbar-in
          zIndex={40} // Mbulon zone e OpenLibrary
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Titulli yne */}
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            maxW="70%"
            whiteSpace="nowrap" // Mban gjithçka ne nje rresht
            overflow="hidden"
            textOverflow="ellipsis" // Shton '...'
            textAlign="center"
          >
            {bookTitle || "Libri i zgjedhur"}
          </Text>
        </Box>

        {/* Butonat (Close dhe Audio) mbi Header */}
        <CloseButton
          position="absolute"
          top={2}
          right={2}
          zIndex={50} // Me i larte se mbulesa (40)
          onClick={onClose}
          color="white"
          size="lg"
        />

        {audioUrl && (
          <Box
            aria-label="Play audio"
            onClick={() => {
              const audio = new Audio(audioUrl);
              audio.play();
            }}
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
            transition="all 0.2s"
            _hover={{
              bg: "blue.500",
              color: "white",
            }}
            position="absolute"
            top="8px"
            right="50px"
            zIndex={50} // Me i lartë se mbulesa (40)
          >
            <Icon as={FaVolumeUp} color="inherit" boxSize="1em" />
          </Box>
        )}

        {/* Iframe e OpenLibrary */}
        <iframe
          src={modifiedUrl}
          width="100%"
          height="100%" // Iframe merr lartesine 100%
          style={{
            border: "none",
            // Heqim te gjitha stilet e pozicionimit
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
