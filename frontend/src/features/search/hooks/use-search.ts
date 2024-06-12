import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchUser } from "../types/search";
import { api } from "../../../libs/api";

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [debounceSearchInput] = useDebounce(searchInput, 400);
  const [searchData, setSearchData] = useState<SearchUser[]>([]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function getUsers() {
    try {
      const response = await api.get(`/users?search=${debounceSearchInput}`);

      setSearchData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [debounceSearchInput]);

  return { handleChange, searchData };
};
