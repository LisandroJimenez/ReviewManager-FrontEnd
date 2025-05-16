import { VStack, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <VStack
      height="100vh"
      justify="center"
      align="center"
      spacing={4}
      bg="gray.50"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
      <Text fontSize="lg" color="gray.600">
        Cargando...
      </Text>
    </VStack>
  );
};

export default Loading;
