import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store/store";

export const selectStatus = (state: RootState) => state.recommendSearch
export const selectError = (state: RootState) => state.recommendSearch.error
export const selectQty = (state: RootState) => state.recommendSearch.titles.length
export const selectFocusElement = (state: RootState) => state.recommendSearch.focusElement
export const selectView = (state: RootState) => state.recommendSearch.view
export const selectAllTitles = (state: RootState) => state.recommendSearch.titles

export const selectRecommendSearch = createSelector([selectStatus, selectError, selectQty,selectFocusElement,  selectAllTitles, selectView],
(status, error, qty, focusElement, titles, view) =>
{
    return {
        status: status,
        error: error,
        qty: qty,
        focusElement: focusElement,
        titles: titles,
        view: view
    }
})
