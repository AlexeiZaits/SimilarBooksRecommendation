import { RootState } from "app/store/store";

export const selectAllLikeBooks = (state:RootState) => state.likeList.books
export const selectQtyLikeBooks = (state:RootState) => state.likeList.books.length
