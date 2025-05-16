import React from "react";
import { 
  Box, 
  Image, 
  Text, 
  Heading, 
  IconButton, 
  Flex, 
  Button,
  HStack,
  Avatar,
  useDisclosure,
  Icon,
  Portal
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaShare } from "react-icons/fa";

const FullScreenImageModal = ({ 
  imageUrl, 
  title, 
  description, 
  onClose,
  author = { name: "Usuario", avatar: "" },

}) => {


  return (
    <Portal>

    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.85)"
      zIndex="9999"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backdropFilter="blur(5px)"
    >
      <IconButton
        icon={<CloseIcon />}
        onClick={onClose}
        position="absolute"
        top="4"
        right="4"
        color="white"
        aria-label="Cerrar imagen"
        size="lg"
        variant="ghost"
        isRound
        _hover={{ bg: "whiteAlpha.200" }}
      />

      {/* Contenedor principal */}
      <Flex 
        maxW="90vw" 
        maxH="90vh"
        direction={{ base: "column", md: "row" }}
        borderRadius="xl"
        overflow="hidden"
        bg="gray.900"
      >
        {/* Imagen */}
        <Box 
          flex={{ base: "1", md: "3" }}
          maxH={{ base: "60vh", md: "90vh" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="black"
        >
          <Image
            src={imageUrl}
            alt={title}
            maxW="100%"
            maxH="100%"
            objectFit="contain"
          />
        </Box>

        {/* Panel lateral */}
        <Flex 
          flex="1"
          direction="column"
          p={6}
          bg="gray.800"
          color="white"
          overflow="auto"
          maxH={{ base: "40vh", md: "90vh" }}
        >


          <Heading size="lg" mb={4}>{title}</Heading>
          <Text fontSize="md" mb={6} color="gray.300">{description}</Text>


        </Flex>
      </Flex>
    </Box>
    </Portal>
  );
};

export default FullScreenImageModal;