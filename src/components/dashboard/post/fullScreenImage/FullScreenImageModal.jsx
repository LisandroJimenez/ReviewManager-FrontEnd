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
import { motion } from "framer-motion";

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
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.9)"
      zIndex="9999"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backdropFilter="blur(15px)"
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
        as={motion.div}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        w="95vw" 
        maxW="1400px"
        h="90vh"
        direction={{ base: "column", md: "row" }}
        borderRadius="2xl"
        overflow="hidden"
        bg="rgba(30, 30, 30, 0.4)"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.8)"
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        {/* Imagen */}
        <Box 
          flex={{ base: "2", md: "3" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="black"
          position="relative"
          overflow="hidden"
        >
          <Image
            src={imageUrl}
            alt={title}
            maxW="100%"
            maxH="100%"
            objectFit="contain"
            as={motion.img}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </Box>

        {/* Panel lateral */}
        <Flex 
          flex="1"
          direction="column"
          bg="rgba(15, 15, 15, 0.95)"
          color="white"
          borderLeft={{ md: "1px solid rgba(255, 255, 255, 0.1)" }}
          borderTop={{ base: "1px solid rgba(255, 255, 255, 0.1)", md: "none" }}
        >
          {/* Header del Autor */}
          <Flex p={6} borderBottom="1px solid rgba(255, 255, 255, 0.1)" align="center" gap={4}>
            <Avatar size="md" name={author.name} src={author.avatar} border="2px solid" borderColor="brand.500" />
            <Text fontWeight="bold" fontSize="lg" letterSpacing="wide">{author.name}</Text>
          </Flex>

          {/* Contenido (Título y Descripción) */}
          <Box flex="1" overflowY="auto" p={6}>
            <Heading size="md" mb={4} lineHeight="tall" bgGradient="linear(to-r, white, gray.300)" bgClip="text">
              {title}
            </Heading>
            <Text fontSize="md" color="gray.300" lineHeight="relaxed">
              {description}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
    </Portal>
  );
};

export default FullScreenImageModal;