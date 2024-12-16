// stores/usePaginationStore.js
import { create } from 'zustand';
import BigNumber from "bignumber.js";

const usePaginationStore = create((set) => ({
  page: null,
  totalPages: null,
  hasError: false,
  loading: false,

  setPage: (page) => set({ page }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setHasError: (hasError) => set({ hasError }),
  setLoading: (loading) => set({ loading }),

  initializePagination: async (contract) => {
    try {
      if (!contract) {
        set({ totalPages: 0, page: 0 });
        return;
      }

      const totalPosts = await contract.get_total_posts();
      if (!totalPosts) {
        set({ totalPages: 0, page: 0 });
        return;
      }

      const readablePosts = BigNumber(totalPosts).toNumber();
      const calculatedTotalPages = Math.max(1, Math.ceil(readablePosts / 10));
      
      set({ 
        totalPages: calculatedTotalPages,
        page: calculatedTotalPages, // Start from latest page
        hasError: false
      });
    } catch (error) {
      console.error("Error initializing pagination:", error);
    //   set({ 
    //     hasError: true,
    //     totalPages: 0,
    //     page: 0 
    //   });
    }
  },

  decrementPage: () => set((state) => ({ page: state.page - 1 })),
}));

export default usePaginationStore;