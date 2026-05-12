import React, { useEffect, useCallback } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  IconButton,
  Flex,
  Avatar,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const FullScreenImageModal = ({
  imageUrl,
  title,
  description,
  onClose,
  author = { name: "Usuario", avatar: "" },
}) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Portal>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="black"
        zIndex="9999"
        display="flex"
        flexDirection="column"
        onClick={handleBackdropClick}
      >
        {/* ── Close Button ── */}
        <IconButton
          icon={<CloseIcon boxSize={{ base: 2.5, md: 3 }} />}
          onClick={onClose}
          position="absolute"
          top={{ base: 3, md: 5 }}
          right={{ base: 3, md: 5 }}
          zIndex="2"
          aria-label="Cerrar imagen"
          size={{ base: "sm", md: "md" }}
          isRound
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="whiteAlpha.800"
          bg="blackAlpha.500"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          _hover={{
            bg: "blackAlpha.700",
            color: "white",
            borderColor: "whiteAlpha.400",
            transform: "scale(1.08)",
          }}
          _active={{ transform: "scale(0.94)" }}
          transition="all 0.2s"
        />

        {/* ── Image Area (fills the screen) ── */}
        <Box
          flex="1"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          onClick={handleBackdropClick}
        >
          {/* Soft vignette edges */}
          <Box
            position="absolute"
            inset="0"
            pointerEvents="none"
            zIndex="1"
            boxShadow="inset 0 0 120px 40px rgba(0,0,0,0.35)"
          />

          <Image
            as={motion.img}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            src={imageUrl}
            alt={title}
            maxW={{ base: "100%", md: "92%" }}
            maxH={{ base: "60vh", md: "78vh" }}
            objectFit="contain"
            userSelect="none"
            draggable="false"
            onClick={(e) => e.stopPropagation()}
          />
        </Box>

        {/* ── Bottom Info Overlay ── */}
        <Box
          as={motion.div}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          position="relative"
          w="100%"
          flexShrink="0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient fade into the panel */}
          <Box
            position="absolute"
            top="-80px"
            left="0"
            right="0"
            h="80px"
            bgGradient="linear(to-t, rgba(0,0,0,0.9), transparent)"
            pointerEvents="none"
          />

          <Box
            bg="rgba(10, 10, 14, 0.95)"
            backdropFilter="blur(24px)"
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            px={{ base: 4, sm: 5, md: 10 }}
            py={{ base: 5, md: 5 }}
            maxH={{ base: "45vh", md: "auto" }}
            overflowY={{ base: "auto", md: "visible" }}
            sx={{
              "&::-webkit-scrollbar": { width: "3px" },
              "&::-webkit-scrollbar-thumb": {
                bg: "whiteAlpha.200",
                borderRadius: "full",
              },
            }}
          >
            <Flex
              maxW="1100px"
              mx="auto"
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              gap={{ base: 4, md: 6 }}
            >
              {/* Author */}
              <Flex
                align="center"
                gap={3}
                flexShrink="0"
              >
                <Avatar
                  size={{ base: "md", md: "sm" }}
                  name={author.name}
                  src={author.avatar}
                  border="2px solid"
                  borderColor="teal.400"
                />
                <Box>
                  <Text
                    color="white"
                    fontWeight="600"
                    fontSize="sm"
                    lineHeight="1.2"
                  >
                    {author.name}
                  </Text>
                  <Text color="whiteAlpha.500" fontSize="xs">
                    Autor
                  </Text>
                </Box>
              </Flex>

              {/* Vertical divider (desktop) */}
              <Box
                display={{ base: "none", md: "block" }}
                w="1px"
                alignSelf="stretch"
                bg="whiteAlpha.200"
                flexShrink="0"
              />

              {/* Horizontal divider (mobile) */}
              <Box
                display={{ base: "block", md: "none" }}
                h="1px"
                w="100%"
                bg="whiteAlpha.100"
              />

              {/* Title + Description */}
              <VStack align="flex-start" spacing={{ base: 2, md: 1 }} flex="1" minW="0" w="100%">
                <Heading
                  size={{ base: "sm", md: "sm" }}
                  color="white"
                  fontWeight="700"
                  lineHeight="1.4"
                  noOfLines={{ md: 1 }}
                >
                  {title}
                </Heading>
                {description && (
                  <Text
                    fontSize={{ base: "sm", md: "sm" }}
                    color="whiteAlpha.700"
                    lineHeight="1.6"
                    noOfLines={{ md: 2 }}
                  >
                    {description}
                  </Text>
                )}
              </VStack>
            </Flex>
          </Box>
        </Box>
      </MotionBox>
    </Portal>
  );
};

export default FullScreenImageModal;