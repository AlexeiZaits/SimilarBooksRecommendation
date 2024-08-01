import { createSlice } from "@reduxjs/toolkit";
import { actionGetTitles } from "./recommend-search-actions";
import { ErrorType, Status } from "shared/types";

export interface IRecommendSearch{
    status: Status,
    error: ErrorType,
    titles: string[],
}

const initialState: IRecommendSearch = {
    titles: [],
    error: null,
    status: "idle",
}

export const recommendSearchSlice = createSlice({
    name: "@recommendSearchSlice",
    initialState: initialState,
    reducers: {
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

export const {clearRecommendSearch } = recommendSearchSlice.actions
