import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPost as getPostRequest, addPost as addPostRequest } from "../../services";

export const usePost = (categoryId = null, title = null) => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getPosts = async () => {
    setIsFetching(true);
    const result = await getPostRequest(categoryId, title);
    setIsFetching(false);

    if (result?.error) {
      toast.error(result.msg || "Error al obtener publicaciones");
      return;
    }

    setPosts(result.publications || []);
  };

  const savePost = async (data) => {
    setIsFetching(true);
    const result = await addPostRequest(data);
    setIsFetching(false);

    if (result?.error) {
      toast.error(result.msg || "Error al crear la publicación");
      return { success: false };
    }

    toast.success("¡Publicación creada con éxito!");
    
    await getPosts(); 
    
    return { success: true };
  };

  useEffect(() => {
    getPosts();
  }, [categoryId, title]);

  return {
    posts,
    isFetching,
    getPosts,
    savePost, 
  };
};