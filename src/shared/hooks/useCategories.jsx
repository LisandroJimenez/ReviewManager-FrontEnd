// hooks/useCategories.js
import { useState, useEffect } from "react";
import { getCategories as getCategoriesRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const result = await getCategoriesRequest();
    if (result.error) {
      toast.error(result.msg);
    } else {
      setCategories(result.categories || []);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    reloadCategories: fetchCategories
  };
};
