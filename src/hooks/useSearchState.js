// hooks/useSearchState.js
import { useSearchStore } from "../stores/useSearchStore";

export const useSearchState = () => {
  const searchInput = useSearchStore((s) => s.searchInput);
  const page = useSearchStore((s) => s.page);
  const setSearchInput = useSearchStore((s) => s.setSearchInput);
  const setPage = useSearchStore((s) => s.setPage);

  return { searchInput, page, setSearchInput, setPage };
};
