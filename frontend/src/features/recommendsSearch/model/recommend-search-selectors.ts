import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store/store";

const selectStatus = (state: RootState) => state.recommendSearch
const selectError = (state: RootState) => state.recommendSearch.error
const selectQty = (state: RootState) => state.recommendSearch.titles.length
const selectAllTitles = (state: RootState) => state.recommendSearch.titles

export const selectRecommendSearch = createSelector([selectStatus, selectError, selectQty, selectAllTitles], (status, error, qty, titles) => {
    return {
        status: status,
        error: error,
        qty: qty,
        titles: titles,
    }
})
