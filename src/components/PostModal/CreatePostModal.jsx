import React, { useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
  Flex, Text, Input, Textarea, Select, Button, VStack, HStack,
  FormControl, FormLabel, FormErrorMessage, Divider, useColorModeValue
} from "@chakra-ui/react";
import { usePost } from "../../shared/hooks/usePost";
import { uploadImageToCloudinary } from "../../services";

const CreatePostModal = ({ isOpen, onClose, categories = [], onPostCreated }) => {
  const { savePost, isSubmitting } = usePost();
  
  const [form, setForm] = useState({ title: "", description: "", categoryId: "", img: "" });
  const [imageFile, setImageFile] = useState(null); 
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("gray.50", "gray.800");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim() || form.title.length < 5) e.title = "Mínimo 5 caracteres.";
    if (!form.description.trim() || form.description.length < 20) e.description = "Mínimo 20 caracteres.";
    if (!form.categoryId) e.categoryId = "Selecciona una categoría.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsUploading(true);
    
    let finalImgUrl = form.img;

    if (imageFile) {
      const uploadedUrl = await uploadImageToCloudinary(imageFile);
      if (uploadedUrl) finalImgUrl = uploadedUrl;
    }

    const result = await savePost({
      ...form,
      img: finalImgUrl
    });
    
    setIsUploading(false);
    if (result.success) {
      onPostCreated?.(result.data);
      handleClose();
    }
  };

  const handleClose = () => {
    setForm({ title: "", description: "", categoryId: "", img: "" });
    setImageFile(null);
    setErrors({});
    onClose();
  };

  const inputStyle = {
    bg: inputBg,
    border: "1px solid",
    borderColor: border,
    _focus: { borderColor: "gray.500", boxShadow: "none" },
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent bg={bg} borderRadius="xl">
        <Flex px={6} py={4} justify="space-between" align="center" borderBottom="1px solid" borderColor={border}>
          <Text fontWeight="600">Nueva publicación</Text>
          <ModalCloseButton position="static" />
        </Flex>

        <ModalBody px={6} py={5}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize="xs" fontWeight="600">Título</FormLabel>
              <Input name="title" value={form.title} onChange={handleChange} {...inputStyle} />
              <FormErrorMessage fontSize="xs">{errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel fontSize="xs" fontWeight="600">Descripción</FormLabel>
              <Textarea name="description" value={form.description} onChange={handleChange} rows={4} {...inputStyle} />
              <FormErrorMessage fontSize="xs">{errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.categoryId}>
              <FormLabel fontSize="xs" fontWeight="600">Categoría</FormLabel>
              <Select name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Selecciona categoría" {...inputStyle}>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </Select>
              <FormErrorMessage fontSize="xs">{errors.categoryId}</FormErrorMessage>
            </FormControl>

            <Divider borderColor={border} />

            <FormControl>
              <FormLabel fontSize="xs" fontWeight="600">Subir imagen</FormLabel>
              <Input type="file" accept="image/*" onChange={handleFileChange} p={1} size="sm" border="none" />
              <Text fontSize="xs" color="gray.500" mt={1}>O pega una URL abajo:</Text>
              <Input name="img" value={form.img} onChange={handleChange} placeholder="https://..." mt={2} {...inputStyle} />
            </FormControl>
          </VStack>

          <HStack mt={6} justify="flex-end">
            <Button variant="ghost" onClick={handleClose}>Cancelar</Button>
            <Button 
              colorScheme="blue" 
              isLoading={isSubmitting || isUploading} 
              loadingText={isUploading ? "Subiendo..." : "Publicando..."}
              onClick={handleSubmit}
            >
              Publicar
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;