import { RootState } from "app/store/store";

export const selectSearch = (state: RootState) => state.searchRecommend.search
export const selectDebounceSearch = (state: RootState) => state.searchRecommend.debounceSearch
