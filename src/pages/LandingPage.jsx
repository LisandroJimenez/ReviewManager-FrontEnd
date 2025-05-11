import BlogNavbar from "../components/dashboard/common/Navbar/Navbar"; 
import { BlogPostCard } from "../components/dashboard/post/BlogPostCard";
import { Box } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <>
      <BlogNavbar />
      <Box 
      display="flex"
              flexDirection="column" // Si quieres las cards una encima de la otra
        alignItems="center" // Centra horizontalmente el contenido
        // justifyContent="center"
      p={10}>
        <BlogPostCard/>

      </Box>
    </>
  );
};

export default LandingPage;
