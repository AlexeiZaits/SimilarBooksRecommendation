import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store/store";
import { selectDebounceSearch } from "features/search/model/searct-selectors";
import { titlesRecommend } from "./recommend-search-slice";

export const selectStatus = (state: RootState) => state.recommendSearch
export const selectError = (state: RootState) => state.recommendSearch.error
export const selectQty = (state: RootState) => state.recommendSearch.titles.length
export const selectFocusElement = (state: RootState) => state.recommendSearch.focusElement
export const selectView = (state: RootState) => state.recommendSearch.view
export const selectAllTitles = (state: RootState) => state.recommendSearch.titles


export const selectRecommendSearch = createSelector([selectStatus, selectError,selectFocusElement,  selectAllTitles, selectView, selectDebounceSearch],
(status, error, focusElement, titles, view, search) =>
{
    let titlesFilter:titlesRecommend[] = [];

    if (search && search.length > 0) {
        titlesFilter = titles.filter((item) => {
            if (item.type === "search"){
                return true
            } else {
                return item.text.toLowerCase().includes(search.toLowerCase())
            }
        })
    } else {
        titlesFilter = [...titles]
    }

    return {
        status: status,
        error: error,
        qty: titlesFilter.length,
        focusElement: focusElement,
        titles: titlesFilter,
        view: view
    }
})
