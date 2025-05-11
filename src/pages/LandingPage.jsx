import BlogNavbar from "../components/dashboard/common/Navbar/Navbar"; 
import { BlogPostCard } from "../components/dashboard/post/BlogPostCard";

const LandingPage = () => {
  return (
    <>
      <BlogNavbar />
      <BlogPostCard/>
    </>
  );
};

export default LandingPage;
