import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store/store";

const selectStatus = (state: RootState) => state.recommendSearch
const selectError = (state: RootState) => state.recommendSearch.error
const selectQty = (state: RootState) => state.recommendSearch.titles.length
const selectFocus = (state: RootState) => state.recommendSearch.isFocus
const selectAllTitles = (state: RootState) => state.recommendSearch.titles

export const selectRecommendSearch = createSelector([selectStatus, selectError, selectQty, selectFocus, selectAllTitles], (status, error, qty, isFocus, titles) => {
    return {
        status: status,
        error: error,
        qty: qty,
        isFocus: isFocus,
        titles: titles,
    }
})
