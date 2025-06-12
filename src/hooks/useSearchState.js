import { useState, useEffect } from "react";

export const useSearchState = () => {
  const [searchInput, setSearchInput] = useState(() => {
    return localStorage.getItem("lastSearchInput") || "";
  });
  const [page, setPage] = useState(() => {
    return parseInt(localStorage.getItem("lastSearchPage") || "1", 10);
  });

  useEffect(() => {
    localStorage.setItem("lastSearchInput", searchInput);
  }, [searchInput]);

  useEffect(() => {
    localStorage.setItem("lastSearchPage", page.toString());
  }, [page]);

  return { searchInput, setSearchInput, page, setPage };
};
