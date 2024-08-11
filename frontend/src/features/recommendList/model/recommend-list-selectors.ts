import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store/store";

const selectStatus = (state: RootState) => state.recommendList.status
const selectError = (state: RootState) => state.recommendList.error
const selectQty = (state: RootState) => state.recommendList ? state.recommendList.books.length : null;
const selectAllRecommendList = (state: RootState) => state.recommendList.books

export const selectRecommendList = createSelector([selectStatus, selectError, selectQty, selectAllRecommendList], (status, error, qty, books) => {
    return {
        status: status,
        error: error,
        qty: qty,
        books: books
    }
})
