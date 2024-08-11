import { createSlice } from "@reduxjs/toolkit";
import { actionGetTitles } from "./recommend-search-actions";
import { ErrorType, Status } from "shared/types";

export interface IRecommendSearch{
    status: Status,
    error: ErrorType,
    titles: string[],
    focusElement: number|null,
    view: boolean,
}

const initialState: IRecommendSearch = {
    titles: [],
    error: null,
    status: "idle",
    focusElement: null,
    view: false,
}

export const recommendSearchSlice = createSlice({
    name: "@recommendSearchSlice",
    initialState: initialState,
    reducers: {
        incrementFocusElement: (state) => {
            if (state.focusElement === null || state.focusElement + 1 === state.titles.length){
                state.focusElement = 0
            }
            else{
                state.focusElement = state.focusElement + 1
            }
        },
        decrementFocusElement: (state) => {
            if (state.focusElement !== null && state.focusElement - 1 < 0) {
                state.focusElement = state.titles.length-1
            }
            else if (state.focusElement)
                {
                state.focusElement = state.focusElement - 1
            }
        },
        setTitlesRecommendSearch: (state, action) => {
            state.titles = action.payload
        },
        setViewRecommendSearch: (state, action) => {
            state.view = action.payload
        },
        clearFocusElementRecommendSearch: (state) => {
            state.focusElement = null
        },
        clearRecommendSearch: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(actionGetTitles.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(actionGetTitles.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload || "error get titles"
        })
        builder.addCase(actionGetTitles.fulfilled, (state, action) => {
            state.titles = action.payload.data.titles
        })
    },
})

export const {clearRecommendSearch, incrementFocusElement, decrementFocusElement, setViewRecommendSearch, clearFocusElementRecommendSearch, setTitlesRecommendSearch} = recommendSearchSlice.actions
