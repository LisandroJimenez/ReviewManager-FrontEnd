import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPost as getPostRequest } from "../../services";

export const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getPosts = async () => {
    setIsFetching(true);
    const result = await getPostRequest();
    setIsFetching(false);

    if (result?.error) {
      console.error("Error al obtener publicaciones:", result);
      return toast.error(result.msg || "Error al obtener publicaciones", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }

    // 🔧 Esta línea es clave
    setPosts(result.data.publications || []);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return {
    posts,
    isFetching,
    getPosts,
  };
};
