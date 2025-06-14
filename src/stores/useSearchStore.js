// stores/useSearchStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      searchInput: "",
      page: 1,
      setSearchInput: (val) => set({ searchInput: val }),
      setPage: (valOrUpdater) =>
        set((state) => ({
          page:
            typeof valOrUpdater === "function"
              ? valOrUpdater(state.page)
              : valOrUpdater,
        })),
    }),
    {
      name: "search-storage",
    }
  )
);
